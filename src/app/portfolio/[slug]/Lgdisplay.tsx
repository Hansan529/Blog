import Lgdisplay from "./Lgdisplay.mdx";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Lgdisplay />
      <Link
        target="_blank"
        href="https://github.com/Hansan529/LGdisplay-rework"
      >
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/Lgdisplay.png"
          alt="노스페이스 클론"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
