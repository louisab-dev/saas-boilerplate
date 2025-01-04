/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ["@my/api", "@my/db"],
};

export default nextConfig;
