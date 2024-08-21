/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "142.93.112.151",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
