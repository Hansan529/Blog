import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.center}>
        <h2 className={styles.flex}>
          <Link to="/">
            <img
              className={styles.logo}
              src={`${process.env.PUBLIC_URL}/images/ico/logo-icon.svg`}
              alt="hxan logo"
            />
          </Link>
          &copy; 2023 Hxan
        </h2>
        <ul>
          <li>
            <Link to="https://github.com/hansan529/Blog" target="_blank">
              <img src="https://img.shields.io/badge/Source%20Code-333333?style=for-the-badge&logo=github&logoColor=white" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
