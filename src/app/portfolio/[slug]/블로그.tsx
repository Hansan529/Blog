import Link from "next/link";
import 블로그 from "./블로그.mdx";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <블로그 />
      <Link target="_blank" href="https://github.com/Hansan529/Blog">
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/블로그.png"
          alt="블로그"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
