import { Link } from 'react-router-dom';
import styles from '../../styles/partials/css/Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { check } from '../../_redux/_reducer/loginSlice';

function Header() {
  const logged = useSelector((state) => state.login.value);
  const dispatch = useDispatch();
  return (
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
              <Link to="/#homepage">홈페이지 소개</Link>
            </li>
            <li>
              <Link to="/#project">프로젝트</Link>
            </li>
            <li>
              <Link to="/#info">정보 모음</Link>
            </li>
          </ul>
        </nav>
        <div>
          {logged ? (
            <button onClick={() => dispatch(check(false))}>로그아웃</button>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
