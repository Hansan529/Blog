
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 'use server'
  // serverActions: true,
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  // mdx 설정
  experimental: {
    mdxRs: true,
  },
  // SASS 사용
  // sassOptions: {
  //   includePaths: [path.join(__dirname, 'styles')],
  // },
};

const withMDX = require('@next/mdx')();
module.exports = withMDX(nextConfig);
