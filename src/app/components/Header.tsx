'use client';

// Components

// Function
import styles from './Header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logOut } from '../redux/feature/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

// Package
const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginChk = useSelector((state: RootState) => state.auth.value.isAuth);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.center}>
          {/* {responsive ? <div className={styles.moreEmpty}></div> : null} */}
          <h1 className="logo">
            <Link href="/">
              <picture className={styles.picture}>
                <source
                  srcSet="/images/ico/logo.svg"
                  media="(min-width: 1200px)"
                  type="image/svg+xml"
                  width="60"
                  height="60"
                />
                <source
                  srcSet="/images/ico/logo-icon.svg"
                  media="(max-width: 1200px)"
                  type="image/svg-xml"
                  width="40"
                  height="40"
                />
                <img
                  src="/images/ico/logo-icon.svg"
                  alt="Hxan Blog Logo"
                  width="40"
                  height="40"
                />
              </picture>
            </Link>
          </h1>
          <div className={styles.btn}>
            {loginChk ? (
              <>
                <Link href="/portfolio-setting">업로드</Link>
                <button onClick={() => dispatch(logOut())}>로그아웃</button>
              </>
            ) : (
              <Link href="/login">로그인</Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
