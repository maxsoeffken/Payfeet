/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Falls du später <Image/> nutzt; aktuell verwenden wir <img/>
      { protocol: 'https', hostname: '**.supabase.co' }
    ]
  }
};
module.exports = nextConfig;
