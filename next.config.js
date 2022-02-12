/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["mediasaleor.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
