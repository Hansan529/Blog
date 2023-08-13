import { Metadata } from 'next';
import 카카오톡클론 from './카카오톡클론';
import 서브웨이클론 from "./서브웨이클론";
import NXweb from "./NXweb";
import 할리스클론 from "./할리스클론";
import WWF클론 from "./WWF클론";
import Northface클론 from "./Northface클론";
import LGdisplay from "./LGDisplay";
import 애플월렛 from "./애플월렛";
import Wetube from "./Wetube";
import 날씨 from "./React-Weather";
import 데일리UI from "./Daily-ui";
import NotFound from "@/app/not-found";
import Loading from "@/app/loading";

interface Params {
  params: { slug: string };
}

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "포트폴리오 목록",
};

export default function Page({ params }: Params) {
  switch (params.slug) {
    case encodeURIComponent("카카오톡클론"):
      return <카카오톡클론 />;
    case encodeURIComponent("서브웨이클론"):
      return <서브웨이클론 />;
    case encodeURIComponent("nxweb"):
      return <NXweb />;
    case encodeURIComponent("hollys"):
      return <할리스클론 />;
    case encodeURIComponent("wwf"):
      return <WWF클론 />;
    case encodeURIComponent("northface"):
      return <Northface클론 />;
    case encodeURIComponent("lg-display"):
      return <LGdisplay />;
    case encodeURIComponent("apple-wallet"):
      return <애플월렛 />;
    case encodeURIComponent("wetube"):
      return <Wetube />;
    case encodeURIComponent("react-weather"):
      return <날씨 />;
    case encodeURIComponent("daily-ui"):
      return <데일리UI />;
    case encodeURIComponent("test"):
      return <Loading />;
    default:
      return <NotFound />;
  }
}
