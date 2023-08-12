import 애플월렛 from './애플월렛.mdx';
import Image from 'next/image';
import Link from "next/link";

export default function Page() {
  return (
    <article className="container mx-auto prose dark:prose-invert">
      <애플월렛 />
      <Link target="_blank" href='https://github.com/Hansan529/Wallet'>
      <Image
        className="object-contain hover:opacity-75"
        src="/portfolio-img/appleWallet.png"
        alt="노스페이스 클론"
        width={1200}
        height={800}
        priority={true}
      />
      </Link>
    </article>
  );
}
