/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.esportsclubs.gg",
        port: "",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "media.valorant-api.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
