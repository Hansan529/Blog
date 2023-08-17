import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { info } from "@/db/Data";
import type { Params } from "@/type";
import dynamic from "next/dynamic";

export default function Page({ params }: Params) {
  const url = decodeURIComponent(params.slug);

  try {
    // 해당 라우터가 존재하는지 체크 후
    const exist = info.find((obj) => url in obj);
    if (!exist) {
      return <NotFound />;
    }
    // 컴포넌트 로드
    const DynamicComponent = dynamic(async () => import(`./${url}.tsx`), {
      loading: () => <Loading />,
    });
    return <DynamicComponent />;
  } catch (err) {
    console.log(err);
    return (
      <NotFound /* message="app/info/[...slug]/page.tsx:37 확인하기" */
      ></NotFound>
    );
  }
}
