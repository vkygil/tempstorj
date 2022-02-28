/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  cssLoaderOptions: {
    url: false
  },
  async redirects() {
    return [
      {
        source: '/:id',
        destination: '/api/download-file/:id',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
