import 카카오톡클론 from './카카오톡클론.mdx';
import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <article className="container prose mx-auto dark:prose-invert">
      <카카오톡클론 />
      <Link target="_blank" href="https://github.com/Hansan529/kokoa-clone">
        <Image
          className="object-contain hover:opacity-75"
          src="/portfolio-img/카카오톡클론.png"
          alt="카카오톡 클론"
          width={1200}
          height={800}
          priority={true}
        />
      </Link>
    </article>
  );
}
