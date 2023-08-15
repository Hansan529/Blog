import NxwebClone from './NxwebClone.mdx';
import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <>
      <NxwebClone />
      <Link
        target="_blank"
        href="https://github.com/Hansan529/tutorial/tree/main/HRD-step02_CSS/CSS_markup/nxweb"
      >
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/nxweb-clone.png"
          alt="NXweb 클론"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </>
  );
}
