/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NAVER_MAP_CLIENT_ID: process.env.NAVER_MAP_CLIENT_ID,
    SERVER_URL: process.env.SERVER_URL,
  },
}

module.exports = nextConfig
