/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize pdf-parse to avoid bundling native dependencies
      config.externals = config.externals || [];
      config.externals.push({
        'pdf-parse': 'commonjs pdf-parse',
        '@napi-rs/canvas': 'commonjs @napi-rs/canvas',
      });
    }
    return config;
  },
};

module.exports = nextConfig;

