import Link from "next/link";

export default async function NotFound() {
  return (
    <div className="flexCenter h-screen flex-col space-y-5">
      <h2 className="text-3xl">찾을 수 없습니다.</h2>
      <p>요청한 리소스를 찾을 수 없습니다.</p>
      <Link href="/" className="text-[skyblue] hover:underline">
        메인 페이지로 이동
      </Link>
    </div>
  );
}
