/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: [
      "cda-sa.spider.ws",
      "dashboard.cdaaudit.in",
    ],
  },
};

export default nextConfig;