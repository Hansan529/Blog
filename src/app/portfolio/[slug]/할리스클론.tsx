import 할리스클론 from './할리스클론.mdx';
import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <article className="container mx-auto prose dark:prose-invert">
      <할리스클론 />
      <Link target="_blank" href='https://github.com/Hansan529/tutorial/tree/main/HRD-step02_CSS/CSS_markup/hollys'>
      <Image
        className="object-contain hover:opacity-75"
        src="/portfolio-img/hollys.png"
        alt="할리스 클론"
        width={1200}
        height={800}
        priority={true}
      />
      </Link>
    </article>
  );
}
