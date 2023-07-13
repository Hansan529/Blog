// Components

// Function
import styles from '../../styles/partials/css/Header.module.css';
import { login } from '../../_redux/_reducer/InfoSlice';

// Package
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function Header({ homepage, project, info }) {
  const logged = useSelector((state) => state.info.logged);
  const dispatch = useDispatch();

  // * 바로가기 버튼을 누르면, 해당 위치로 스크롤이 이동하도록 하는 함수
  const onClick = (e) => {
    const { name } = e.target;
    switch (name) {
      case 'homepage':
        homepage.current.scrollIntoView({ behavior: 'smooth' });
        return;
      case 'project':
        project.current.scrollIntoView({ behavior: 'smooth' });
        return;
      case 'info':
        // info.current.scrollIntoView({ behavior: 'smooth' });
        return;
      default:
        return;
    }
  };
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
                <button name="homepage" onClick={onClick}>
                  홈페이지 소개
                </button>
              </li>
              <li>
                <button name="project" onClick={onClick}>
                  프로젝트
                </button>
              </li>
              <li>
                <button name="info" onClick={onClick}>
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
