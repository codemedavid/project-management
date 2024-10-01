/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
  },
  env: {
    URL: process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.URL || "http://localhost:3000",
  },
};

export default nextConfig;
