import Link from "next/link";

export default async function NotFound(/* props: any */) {
  return (
    <div className="posCenter space-y-[20px] text-center">
      <h2 className="text-3xl">찾을 수 없는 페이지입니다.</h2>
      <p>요청한 리소스를 찾을 수 없습니다.</p>
      <Link href="/" className="text-[skyblue] hover:underline">
        메인 페이지로 이동
      </Link>
      {/* {props ? (
        <>
          <h3>디버깅중</h3>
          <pre>{JSON.stringify(props)}</pre>
        </>
      ) : null} */}
    </div>
  );
}
