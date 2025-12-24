/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pinimg.com" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "toppng.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
