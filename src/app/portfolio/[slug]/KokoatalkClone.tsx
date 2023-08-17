import KokoatalkClone from "./KokoatalkClone.mdx";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <KokoatalkClone />
      <Link target="_blank" href="https://github.com/Hansan529/kokoa-clone">
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/Kokoatalk-clone.png"
          alt="카카오톡 클론"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
