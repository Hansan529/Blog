import remarkGfm from "remark-gfm";
import createMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
  // mdx 설정
  experimental: {
    mdxRs: true,
  },
};

// const withMDX = require("@next/mdx")();
const withMDX = createMdx({
  options: {
    extension: /\.mdx?$/,
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});
export default withMDX(nextConfig);
