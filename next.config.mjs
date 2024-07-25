/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/:path*",
      has: [{ type: "header", key: "host", value: "www.localhost:3000" }],
      destination: "http://localhost:3000/:path*",
      permanent: true,
    },
  ],
};

export default nextConfig;
