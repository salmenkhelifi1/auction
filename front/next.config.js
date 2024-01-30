/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "autobid.modeltheme.com",
      "carauctionnetwork.com",
      "scontent.ftun8-1.fna.fbcdn.net",
    ],
  },
};

module.exports = nextConfig;
