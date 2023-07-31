// Components

// Functions
import styles from '../../styles/partials/css/Page.module.css';

// Packages
import { useEffect, useRef } from 'react';

function Homepage({ LinkHomepage, project }) {
  const homepageRef = useRef();

  // * homepageRef가 선택되면, 해당 Ref를 부모 컴포넌트로 전달
  useEffect(() => {
    if (homepageRef) {
      homepageRef.current.focus();
      LinkHomepage(homepageRef);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homepageRef]);

  // * 프로젝트 바로가기 버튼 이동하기
  const onClick = (e) => {
    const { name } = e.target;
    if (name === 'project') {
      project.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <>
      <article className={styles.article}>
        <div ref={homepageRef} id="homepage" className="part"></div>
        <h2 className={styles.title}>Hxan Portfolio</h2>
        <p>프론트엔드 개발자가 되기 위해서 다양한 언어를 공부중입니다</p>
        <p>현재 사용 가능한 언어 및 라이브러리, 툴은 다음과 같습니다</p>
        <div className={styles.language}>
          <div title="html">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/html-icon.svg`}
              alt="html"
            />
            <span>html</span>
          </div>
          <div title="css">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/css-icon.svg`}
              alt="css"
            />
            <span>css</span>
          </div>
          <div title="sass">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/sass-icon.svg`}
              alt="sass"
            />
            <span>sass</span>
          </div>
          <div title="js">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/js-icon.svg`}
              alt="js"
            />
            <span>js</span>
          </div>
          <div title="react">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/react-icon.svg`}
              alt="react"
            />
            <span>react</span>
          </div>
          <div title="redux">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/redux-icon.svg`}
              alt="redux"
            />
            <span>redux</span>
          </div>
          <div title="nodejs">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/nodejs-icon.svg`}
              alt="nodejs"
            />
            <span>nodejs</span>
          </div>
          <div title="express">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/express-icon.svg`}
              alt="express"
            />
            <span>express</span>
          </div>
          <div title="mongodb">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/mongodb-icon.svg`}
              alt="mongodb"
            />
            <span>mongodb</span>
          </div>
          <div title="git">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/git-icon.svg`}
              alt="git"
            />
            <span>git</span>
          </div>
          <div title="github">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/github-icon.svg`}
              alt="github"
            />
            <span>github</span>
          </div>
          <div title="docker">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/docker-icon.svg`}
              alt="docker"
            />
            <span>docker</span>
          </div>
        </div>
        <p>사용 가능 툴에 추가하고자 하는 목표</p>
        <div className={styles.language}>
          <div title="nextjs">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/nextjs-icon.svg`}
              alt="nextjs"
            />
            <span>nextjs</span>
          </div>
          <div title="typescript">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/typescript-icon.svg`}
              alt="typescript"
            />
            <span>typescript</span>
          </div>
          <div title="mysql">
            <img
              src={`${process.env.PUBLIC_URL}/images/ico/mysql-icon.svg`}
              alt="mysql"
            />
            <span>mysql</span>
          </div>
        </div>
        <button
          name="project"
          onClick={onClick}
          className={styles.scrollBtn}
        ></button>
      </article>
    </>
  );
}

export default Homepage;
