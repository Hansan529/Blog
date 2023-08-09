// Components

// Function
import styles from './Header.module.scss';
import Link from 'next/link';
import HeaderLogin from './HedaerLogin';

// Package
const Header = () => {
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
          <HeaderLogin />
        </div>
      </header>
    </>
  );
};

export default Header;
