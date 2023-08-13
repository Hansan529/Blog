import Northface클론 from './Northface클론.mdx';
import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Northface클론 />
      <Link
        target="_blank"
        href="https://github.com/Hansan529/tutorial/tree/main/HRD-step02_CSS/CSS_markup/northface"
      >
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/northface.png"
          alt="노스페이스 클론"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
