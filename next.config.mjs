/** @type {import('next').NextConfig} */

const standarloneRun = process.env.STANDARALONE_BUILD?"standalone":undefined

const nextConfig = {
  output: standarloneRun,
  images: {
    qualities: [70, 75],
    minimumCacheTTL: 5,
  },
  compress: true,
  devIndicators: false
};

export default nextConfig;
