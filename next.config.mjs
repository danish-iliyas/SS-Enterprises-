/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  serverExternalPackages: ['mongoose', 'sharp'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;
