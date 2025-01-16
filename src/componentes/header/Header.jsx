import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className={styles.header}>
      <div className={styles.logo_container}>
        <img className={styles.logo} src="alura.png" alt="Logo de Alura" />
      </div>
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </div>
      <nav className={`${styles.navbar} ${menuOpen ? styles.active : ''}`}>
        <Link
          to="/"
          className={`${styles.navLink} ${styles.button} ${
            location.pathname === '/' ? styles.clicked : ''
          }`}
        >
          HOME
        </Link>
        <Link
          to="/new-video"
          className={`${styles.navLink} ${styles.button} ${
            location.pathname === '/new-video' ? styles.clicked : ''
          }`}
        >
          NUEVO VIDEO
        </Link>
      </nav>
    </div>
  );
};

export default Header;
