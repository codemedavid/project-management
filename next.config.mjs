/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://project.programmingcourses.vip/api/:path*",
      },
    ];
  },
};

export default nextConfig;
