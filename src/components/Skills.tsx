import Image from "next/image";
import react from "@/../public/ico/language/react-icon.svg";
import nextjs from "@/../public/ico/language/nextjs-icon.svg";
import ts from "@/../public/ico/language/ts-icon.svg";
import redux from "@/../public/ico/language/redux-icon.svg";
import sass from "@/../public/ico/language/sass-icon.svg";
import tailwindcss from "@/../public/ico/language/tailwindcss-icon.svg";
import nodejs from "@/../public/ico/language/nodejs-icon.svg";
import mongodb from "@/../public/ico/language/mongodb-icon.svg";
import mysql from "@/../public/ico/language/mysql-icon.svg";
import github from "@/../public/ico/language/github-icon.svg";

export default function Introduce() {
  const childrenStyle = `[&>dt>span]:capitalize [&>dt]:flex [&>dt]:items-center [&>dt]:gap-5 [&>dt]:rounded-bl-2xl 
  [&>dt]:border-b [&>dt]:border-b-black [&>dt]:p-2.5 dark:[&>dt]:border-b-white [&_ol]:list-decimal [&_ol]:space-y-5`;

  return (
    <article className="container relative mx-auto rounded-3xl p-[30px] dark:bg-[#fff]/5">
      <div id="stack" className="sr-only -top-32">
        기술 스택 바로가기
      </div>
      <h2 className="mb-5 text-xl font-semibold drop-shadow-[3px_3px_2px_skyblue]">
        기술 스택
      </h2>
      <dl className={"space-y-5 break-keep" + childrenStyle}>
        <dt>
          <Image className="w-8" src={react} alt="언어" />
          <span className="">react</span>
        </dt>
        <dd>
          <ol>
            <li>
              React 개발로 인해 CSR 방식으로 SPA 과 같은 컴포넌트 개발을 숙달할
              수 있었습니다. 사용자가 이용하면서 새로고침 현상 없이 부드럽게
              사용할 수 있다는 장점이 있습니다.
            </li>
            <li>
              다만 SEO에 취약할 수 밖에 없는 문제가 있습니다. HTML 상에 작성되어
              있는 것이 아니라, 사용자의 브라우저에서 자바스크립트가 해당 DOM을
              생성하기 때문입니다.
            </li>
            <li>
              JSX, TSX와 같이 React상에서 HTML 문법에서 크게 벗어나지 않아 마치
              HTML 작업과 스크립트를 한번에 할 수 있다는 점이 좋습니다.
            </li>
            <li>
              컴포넌트 별로 파일을 나누면 재사용성도 좋아지고 구분하기가
              용이해지기 때문에 저는 주로 분리해서 사용합니다.
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8 dark:invert" src={nextjs} alt="언어" />
          <span>next.js</span>
        </dt>
        <dd>
          <ol>
            <li>
              React가 CSR 방식만 가능하다면, Next.js는 SSR, CSR 모두 가능한 매우
              놀라운 프레임워크입니다.
            </li>
            <li>
              사용자와 상호작용이 아닌, 정보 전달만을 위한 자료라면 서버
              컴포넌트에서 미리 렌더링하여 사용자에게 즉각적으로 전달해 줄 수
              있습니다.
            </li>
            <li>DX를 매우 높여주는 프레임워크라고 생각합니다</li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={ts} alt="언어" />
          <span>typescript</span>
        </dt>
        <dd>
          <ol>
            <li>
              기존 자바스크립트는 동적 타입으로 변수의 타입을 지정하지 않은채로
              구동이 됩니다.
            </li>
            <li>
              그래서 문제가 생기는데, 문자열과 숫자를 더하는 것은 불가능하지만
              숫자를 문자열로 변경 후, 합쳐버립니다
            </li>
            <li>
              원치않은 결과를 예방하기 위해 타입을 명명해서 일치하는 요소만
              대입이 가능하도록 해주는 역할을 합니다.
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={redux} alt="언어" />
          <span>redux</span>
        </dt>
        <dd>
          <ol>
            <li>
              React 에서 클라이언트 브라우저에서 상태를 관리하기 위해 사용 중에
              있습니다.
            </li>
            <li>
              특정 정보나 상태를 저장하거나 불러오기 위해 사용합니다.
              클라이언트가 아닌 서버는 사용할 수 없어서 Redux-thunk, Redux-saga,
              React-query 와 같은 패키지를 사용합니다.
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={sass} alt="언어" />
          <span>scss</span>
        </dt>
        <dd>
          <ol>
            <li>
              CSS 전처리기로 클래스 속 클래스를 지정하거나, @mixin으로
              재사용성을 높이고 스타일링의 속도를 높여주기 때문에 사용합니다.
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={tailwindcss} alt="언어" />
          <span>tailwindcss</span>
        </dt>
        <dd>
          <ol>
            <li>
              CSS 프레임워크로 기존에 class를 지정하고, CSS 파일에서 해당
              스타일링을 작업하는 것 보다 테일윈드를 사용하면
            </li>
            <li>
              직관성을 높여주고, CSS 파일을 Tailwindcss 설정만 하면 필요 없는
              장점이 있습니다. 커스텀 기능도 있어서 자유로워서 웬만한 작업에는
              주로 사용합니다.
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={nodejs} alt="언어" />
          <span>node.js</span>
        </dt>
        <dd>
          <ol>
            <li>
              Express와 같은 서버를 사용할 경우에 사용합니다. 최근에는 Next.js를
              사용하면서 사용량이 감소했습니다
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={mongodb} alt="언어" />
          <span>mongodb</span>
        </dt>
        <dd>
          <ol>
            <li>
              NoSQL 데이터베이스로 데이터를 JSON 문서로 저장합니다. 모델 안에
              다른 모델을 복제하여 참조할 수 있습니다.
            </li>
            <li>
              개인적으로는 mongoDB 접속을 도와주는 패키지인 mongoose가 mysql보다
              더 많은 기능을 지원하는 것 같다고 생각합니다
            </li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={mysql} alt="언어" />
          <span>mysql</span>
        </dt>
        <dd>
          <ol>
            <li>
              데이터를 구조화한 테이블 형식으로 저장하는 관계형 데이터베이스
              시스템으로 행에 데이터를 저장하고, 열에 유형별로 데이터의 타입을
              지정합니다.
            </li>
            <li>또한 Primary key, 외래키와 같이 관계를 정의합니다.</li>
          </ol>
        </dd>
        <dt>
          <Image className="w-8" src={github} alt="언어" />
          <span>github</span>
        </dt>
        <dd>
          <ol>
            <li>
              클론, 미니 프로젝트의 경우 별도의 branch를 나누어서 작업을 하지는
              않으며, 체계적인 관리가 필요한 페이지의 경우 git-flow 브랜치
              전략을 사용해 커밋을 진행합니다.
            </li>
          </ol>
        </dd>
      </dl>
    </article>
  );
}
