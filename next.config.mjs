/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static exports of error pages to avoid Html import issue
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
