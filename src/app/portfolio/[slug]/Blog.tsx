import Link from "next/link";
import Blog from "./Blog.mdx";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <Blog />
      <Link target="_blank" href="https://github.com/Hansan529/Blog">
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/Blog.png"
          alt="Blog"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
