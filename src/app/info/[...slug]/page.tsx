import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import type { Params } from "@/type";
import { existsSync } from "fs";
import dynamic from "next/dynamic";
import { join } from "path";

export default async function Page({ params }: Params) {
  const url = await decodeURIComponent(params.slug);

  // 해당 컴포넌트가 존재하는지 체크
  const exist = existsSync(
    join(process.cwd(), "src", "app", "info", "[...slug]", `${url}.tsx`),
  );

  if (!exist) {
    return <NotFound />;
  }

  const DynamicComponent = dynamic(
    () =>
      import(`./${url}.tsx`).catch((err) => {
        return () => <NotFound />;
      }),
    {
      loading: () => <Loading />,
      ssr: true,
    },
  );

  return <DynamicComponent />;
}
