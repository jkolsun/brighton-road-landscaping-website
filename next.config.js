const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Property Maintenance was replaced by Commercial Snow Removal (2026-07).
  // 301 the old indexed URL so its ranking equity transfers (never 404 a live route).
  async redirects() {
    return [
      {
        source: "/services/lawn-mowing",
        destination: "/services/commercial-snow-removal",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    config.resolve.alias["@styles"] = path.resolve(__dirname, "styles");
    return config;
  },
};

module.exports = nextConfig;
