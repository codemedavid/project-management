/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  env: {
    URL: process.env.URL || "https://project.programmingcourses.vip",
  },
};

export default nextConfig;
