import './Loading.modules.scss';

export default function Loading() {
  return (
    <>
      <div className="background">
        <p className="Loading">로딩 중입니다...</p>
        <img src="/loading.svg" alt="로딩중" />
      </div>
    </>
  );
}
