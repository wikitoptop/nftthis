/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   basePath: "",
// };

// module.exports = nextConfig;

const nextConfig = {
  reactStrictMode: true,
  basePath: "",
};

module.exports = {
  ...nextConfig,
  images: {
    unoptimized: true,
  },
};
