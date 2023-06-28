import { Link } from 'react-router-dom';
import styles from '../../styles/partials/css/Header.module.css';

function Header({ logged }) {
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
          <Link to={`/${logged ? 'logout' : 'login'}`}>
            {logged ? '로그아웃' : '로그인'}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
