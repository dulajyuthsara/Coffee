import { useEffect, useState } from 'react';
import styles from './Nav.module.css';

const links = ['INTRO', 'CRAFT', 'MENU', 'SHOP', 'CONTACT'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('INTRO');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setActive(id);
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo}>COFFEE</div>
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l}>
            <button className={`${styles.link} ${active === l ? styles.active : ''}`} onClick={() => go(l)}>
              {l}
            </button>
          </li>
        ))}
      </ul>
      <div className={styles.badge}>EST. 2020</div>
    </nav>
  );
}
