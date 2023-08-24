export default function Profile() {
  return (
    <article className="container mx-auto flex flex-col items-center space-y-10 rounded-xl bg-gray-100 p-10 dark:bg-gray-800">
      <h2
        className="bg-text-clip flex flex-col bg-gradient-to-b from-[skyblue] from-10% to-[pink] to-90% text-center text-4xl font-extrabold uppercase
      md:text-5xl xl:text-6xl"
      >
        <span>han san</span>
        <span>frontend</span>
      </h2>
      <div className="text-md space-y-10 break-keep">
        <p>저는 학생 시절에 동영상을 만드는 취미가 있었습니다.</p>
        <p>
          해당 영상을 업로드 하다 보니, <b>개인적인 홈페이지</b>에 업로드를
          진행하고 싶다는 생각에
        </p>
        <p>
          코딩을 시작했고, 홈페이지를 제작하면서 흥미가 생겨서 관련 직업을 찾다
          프론트엔드 개발자라는 직업을 찾았습니다.
        </p>
        <p>
          <strong>&quot;배움에는 끝이 없다&quot;</strong> 라는 말이 있듯이 매번
          새로운 기술을 터득하려고 하고 있습니다.
        </p>
        <p>
          <strong>클라이언트와 사용자 모두를 만족시키는 개발자</strong>가 되고
          싶습니다.
        </p>
      </div>
    </article>
  );
}
