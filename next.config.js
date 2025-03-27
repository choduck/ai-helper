/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  i18n: {
    locales: ['ko'],
    defaultLocale: 'ko',
  },
}

module.exports = nextConfig