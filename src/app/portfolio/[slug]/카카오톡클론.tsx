import 카카오톡클론 from './카카오톡클론.mdx';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Kokoa Clone',
  description: '카카오톡 클론 홈페이지'
}

export default function Page() {
  return (
    <article className="container mx-auto prose dark:prose-invert">
      <카카오톡클론 />
      <Link target="_blank" href='https://github.com/Hansan529/kokoa-clone'>
      <Image
        className="object-contain hover:opacity-75"
        src="/카카오톡클론/kokoaTalk.png"
        alt="카카오톡 클론"
        width={1200}
        height={800}
        priority={true}
      />
      </Link>
      
    </article>
  );
}
