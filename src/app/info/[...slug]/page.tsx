import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { info } from "@/db/Data";
import dynamic from "next/dynamic";
import type { Params } from "@/type";

export default function Page({ params }: Params) {
  const url = decodeURIComponent(params.slug);

  try {
    const exist = info.find((obj) => url in obj);
    if (!exist) {
      return <NotFound />;
    }
    const DynamicComponent = dynamic(() => import(`./${url}.tsx`), {
      loading: () => <Loading />,
    });
    return <DynamicComponent />;
  } catch (err) {
    console.log(err);
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const paths = info.map(item => {
    const key = Object.keys(item)[0];
    return {
      slug: key.split('/')
    };
  });

  return paths;
}
