import Wetube from './Wetube.mdx';
import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <article className="container mx-auto prose dark:prose-invert">
      <Wetube />
      <Link target="_blank" href='https://github.com/Hansan529/wetube-reloaded'>
      <Image
        className="object-contain hover:opacity-75"
        src="/portfolio-img/wetube.png"
        alt="Wetube"
        width={1200}
        height={800}
        priority={true}
      />
      </Link>
    </article>
  );
}
