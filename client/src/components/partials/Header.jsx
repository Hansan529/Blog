// Components

// Function
import styles from '../../styles/partials/css/Header.module.css';
import { linkPart, login } from '../../_redux/_reducer/InfoSlice';

// Package
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

function Header({ homepage, project, info }) {
  const logged = useSelector((state) => state.info.logged);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const homepageBtn = useRef();
  const projectBtn = useRef();
  const infoBtn = useRef();
  const part = useSelector((state) => state.info.part);

  // * 바로가기 버튼을 누르면, 해당 위치로 스크롤이 이동하도록 하는 함수
  const onClick = (e) => {
    const { name } = e.target;
    switch (name) {
      case 'homepage':
        if (homepage) {
          homepage.current.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
          dispatch(linkPart('homepage'));
        }
        return;
      case 'project':
        if (project) {
          project.current.scrollIntoView({ behavior: 'smooth' });
        } else {
          navigate('/');
          dispatch(linkPart('project'));
        }
        return;
      case 'info':
        // info.current.scrollIntoView({ behavior: 'smooth' });
        // dispatch(linkPart('info'))
        return;
      default:
        return;
    }
  };

  // FIXME: 실행되지 않음 (Home 컴포넌트를 제외한 다른 곳에서는 사용 불가능 Ref가 연결되어 있지 않기 때문에)
  useEffect(() => {
    switch (part) {
      case 'homepage':
        homepageBtn.current.click();
        break;
      case 'project':
        console.log(project);
        projectBtn.current.click();
        break;
      case 'info':
        infoBtn.current.click();
        break;
      default:
        break;
    }
    dispatch(linkPart(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [part]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.center}>
          <h1 className="logo">
            <Link to="/">
              <picture className={styles.picture}>
                <source
                  srcSet={`${process.env.PUBLIC_URL}/images/ico/logo.svg`}
                  media="(min-width: 1200px)"
                  type="image/svg+xml"
                  width="60"
                  height="60"
                />
                <source
                  srcSet={`${process.env.PUBLIC_URL}/images/ico/logo-icon.svg`}
                  media="(max-width: 1200px)"
                  type="image/svg-xml"
                  width="40"
                  height="40"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/images/ico/logo-icon.svg`}
                  alt="Hxan Blog Logo"
                  width="40"
                  height="40"
                />
              </picture>
            </Link>
          </h1>
          <nav>
            <ul className={styles.ul}>
              <li>
                <button ref={homepageBtn} name="homepage" onClick={onClick}>
                  홈페이지 소개
                </button>
              </li>
              <li>
                <button ref={projectBtn} name="project" onClick={onClick}>
                  프로젝트
                </button>
              </li>
              <li>
                <button ref={infoBtn} name="info" onClick={onClick}>
                  정보 모음
                </button>
              </li>
            </ul>
          </nav>
          <div className={styles.btn}>
            {logged ? (
              <>
                <Link to="/upload">업로드</Link>
                <button onClick={() => dispatch(login(false))}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
