/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // emits a static site into ./out for shared hosting
  trailingSlash: true, // each route becomes a folder with index.html (Apache-friendly)
  images: { unoptimized: true }, // required for static export if next/image is used later
};

export default nextConfig;
