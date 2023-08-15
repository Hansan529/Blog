import NorthfaceClone from "./NorthfaceClone.mdx";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NorthfaceClone />
      <Link
        target="_blank"
        href="https://github.com/Hansan529/tutorial/tree/main/HRD-step02_CSS/CSS_markup/northface"
      >
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/northface-clone.png"
          alt="노스페이스 클론"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
