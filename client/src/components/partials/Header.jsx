import { Link } from 'react-router-dom';
import styles from '../../styles/partials/css/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../_redux/_reducer/InfoSlice';

function Header() {
  const logged = useSelector((state) => state.info.logged);
  const dispatch = useDispatch();
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
                <a href="#homepage">홈페이지 소개</a>
              </li>
              <li>
                <a href="#project">프로젝트</a>
              </li>
              <li>
                <a href="#info">정보 모음</a>
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
