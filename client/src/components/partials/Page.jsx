import styles from '../../styles/partials/css/Page.module.css';

function Page() {
  return (
    <>
      <article className={styles.article}>
        <div id="homepage" className="part"></div>
        <h2 className={styles.title}>Hxan Portfolio</h2>
        <strong>
          해당 웹 페이지는 FHD(1920x1080) 기준으로 제작되었습니다.
        </strong>
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
        <a href="#project" className={styles.scrollBtn}></a>
      </article>
    </>
  );
}

export default Page;
