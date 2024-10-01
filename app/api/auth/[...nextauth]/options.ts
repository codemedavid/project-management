import type { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { GithubProfile } from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { compare } from "bcrypt";

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    Github({
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? profile.login,
          email: profile.email,
          image: profile.avatar_url,
          username: profile.login,
          role: profile.role ?? "user",
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username: ",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password: ",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        //  const user = { id: "42", name: "JAD", password: "auth", role: "user" };

        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: { username: credentials.username },
        });

        if (!existingUser) {
          return null;
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );

        if (!passwordMatch) {
          return null;
        }

        return {
          id: existingUser.id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          username: existingUser.username,
          role: existingUser.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.id = token.sub as string;
      }

      return session;
    },
  },
};
