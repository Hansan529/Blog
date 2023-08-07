'use client';

// Components

// Function
import styles from './Header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logOut } from '../app/redux/feature/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/redux/store';

// Package
function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const loginChk = useSelector((state: RootState) => state.auth.value.isAuth);

  // * 바로가기 버튼을 누르면, 해당 위치로 스크롤이 이동하도록 하는 함수
  const onClick = (e) => {
    const { name } = e.target;
    // switch (name) {
    //   case 'homepage':
    //     if (homepage) {
    //       homepage.current.scrollIntoView({ behavior: 'smooth' });
    //     } else {
    //       navigate('/');
    //       dispatch(linkPart('homepage'));
    //     }
    //     return;
    //   case 'project':
    //     if (project) {
    //       project.current.scrollIntoView({ behavior: 'smooth' });
    //     } else {
    //       navigate('/');
    //       dispatch(linkPart('project'));
    //     }
    //     return;
    //   case 'info':
    //     info.current.scrollIntoView({ behavior: 'smooth' });
    //     // dispatch(linkPart('info'));
    //     return;
    //   default:
    //     return;
    // }
  };
  return (
    <>
      <header className={styles.header}>
        <div className={styles.center}>
          {/* {responsive ? <div className={styles.moreEmpty}></div> : null} */}
          <h1 className="logo">
            <Link href="/">
              <picture className={styles.picture}>
                <source
                  srcSet="/logo.svg"
                  media="(min-width: 1200px)"
                  type="image/svg+xml"
                  width="60"
                  height="60"
                />
                <source
                  srcSet="/logo-icon.svg"
                  media="(max-width: 1200px)"
                  type="image/svg-xml"
                  width="40"
                  height="40"
                />
                <img
                  src="/logo-icon.svg"
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
            {loginChk ? (
              <>
                <Link href="/upload">업로드</Link>
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
}

export default Header;
