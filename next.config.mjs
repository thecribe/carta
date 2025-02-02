/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push("sequelize");
    }
    return config;
  },
};

export default nextConfig;
