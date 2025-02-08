/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NAVER_MAP_CLIENT_ID: process.env.NAVER_MAP_CLIENT_ID,
    SERVER_URL: process.env.SERVER_URL,
    CKEDITOR_LICENSE_KEY: process.env.CKEDITOR_LICENSE_KEY,
  }
}

module.exports = nextConfig
