import { Metadata } from 'next';
import 카카오톡클론 from './카카오톡클론';
import 서브웨이클론 from "./서브웨이클론";
import NXweb from "./NXweb";
import 할리스클론 from "./할리스클론";
import WWF클론 from "./WWF클론";
import Northface클론 from "./Northface클론";

interface Params {
  params: { slug: string };
}


export const metadata: Metadata = {
  title: '포트폴리오',
  description: '포트폴리오 목록',
}

export default function Page({ params }: Params) {
  switch (params.slug) {
    case encodeURIComponent('카카오톡클론'):
      return <카카오톡클론 />;
      case encodeURIComponent('서브웨이클론'):
      return <서브웨이클론 />;
      case encodeURIComponent('nxweb'):
      return <NXweb />;
      case encodeURIComponent('hollys'):
      return <할리스클론 />;
      case encodeURIComponent('wwf'):
      return <WWF클론 />;
      case encodeURIComponent('northface'):
      return <Northface클론 />;
    default:
      return <div>해당 게시글은 없는 게시글입니다.</div>
  }
}
