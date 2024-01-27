/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    headers: ["Content-Type", "Authorization"],
  },
  // experimental: {
  //   esmExternals: "loose", // <-- add this
  //   serverComponentsExternalPackages: ["mongoose"], // <-- and this
  // },
  // // and the following to enable top-level await support for Webpack
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   };
  //   return config;
  // },

  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8000/:path*", // Proxy to Backend
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
