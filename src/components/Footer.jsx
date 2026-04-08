import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>COFFEE</span>
          <p className={styles.tagline}>Specialty roasters.<br />Brewed with intention since 2020.</p>
        </div>
        <div className={styles.cols}>
          {[
            { title: 'Menu',   items: ['Espresso','Pour-Over','Cold Brew','Seasonal'] },
            { title: 'Shop',   items: ['Beans','Equipment','Kits','Subscribe'] },
            { title: 'Follow', items: ['Instagram','TikTok','Pinterest'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className={styles.colTitle}>{col.title}</h4>
              <ul className={styles.colList}>
                {col.items.map(i => <li key={i}>{i}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2025 COFFEE. All rights reserved.</span>
        <span>Roasted with obsession.</span>
      </div>
    </footer>
  );
}
