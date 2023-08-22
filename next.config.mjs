import remarkGfm from "remark-gfm";
import createMdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: ["localhost", "hxan.net"],
  },
  compiler: {
    styledComponents: true,
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
