import { Metadata } from "next";
import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import type { Params } from "@/type";
import NotFound from "@/app/not-found";
import { totalPost } from "@/db/Data";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "포트폴리오 목록",
};

export default function Page({ params }: Params) {
  // [slug] 값을 받아옴
  const decodedSlug = decodeURIComponent(params.slug);

  // '-'로 연결된 문장이면 배열로 나누고 반환
  const slug = decodedSlug.split("-");

  // 컴포넌트 명에 맞도록 각 첫 문자를 대문자로 변경해 로드함
  let result: string;
  result = `${slug[0].charAt(0).toUpperCase()}${slug[0].slice(1)}`;
  // '-' 가 있어 1번째 string이 있을 경우 추가
  if (slug[1])
    result = `${result}${slug[1].charAt(0).toUpperCase()}${slug[1].slice(1)}`;

  try {
    // 해당 라우터가 존재하는지 체크 후
    const exist = totalPost.find((obj) => decodedSlug in obj);
    if (!exist) {
      return <NotFound />;
    }

    // 컴포넌트 로드
    const DynamicComponent = dynamic(async () => import(`./${result}.tsx`), {
      loading: () => <Loading />,
    });
    return <DynamicComponent />;
  } catch (err) {
    console.error("포트폴리오 페이지 로딩 중 오류 발생:", err);
    return <NotFound />;
  }
}

export async function generateStaticParams() {
  const paths = totalPost.map(item => {
    const [path] = Object.keys(item);
    const [upperCase, word] = path.split('-');
    const result = `${upperCase.charAt(0).toUpperCase()}${upperCase.slice(1)}${word ? `${word.charAt(0).toUpperCase()}${word.slice(1)}` : ''}`;
    return {
      slug: result
    }
  })
  return paths;
}