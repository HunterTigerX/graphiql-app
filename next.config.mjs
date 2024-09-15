/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'pokeapi.co',
        pathname: '**',
      },
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
