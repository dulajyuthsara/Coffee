import { useEffect, useRef } from 'react';
import styles from './Craft.module.css';

const stats = [
  { num: '12', label: 'Origins' },
  { num: '48h', label: 'Roast Cycle' },
  { num: '97°', label: 'Brew Temp' },
  { num: '24K', label: 'Cups Served' },
];

export default function Craft() {
  const ref = useRef();

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.querySelectorAll('[data-r]').forEach((el, i) => {
            setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, i * 100);
          });
        }
      });
    }, { threshold: 0.12 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="craft" className={styles.craft} ref={ref}>
      {/* Semi-transparent panel so 3D canvas bleeds through */}
      <div className={styles.panel}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <span data-r className={styles.eye} style={{ opacity:0, transform:'translateY(18px)', transition:'all 0.8s ease' }}>THE CRAFT</span>
            <h2 data-r className={styles.heading} style={{ opacity:0, transform:'translateY(22px)', transition:'all 0.9s ease' }}>
              Roasted<br />for the<br /><em>Digital Age.</em>
            </h2>
            <p data-r className={styles.body} style={{ opacity:0, transform:'translateY(18px)', transition:'all 0.9s ease' }}>
              COFFEE sources single-origin micro-lots from twelve farms across Ethiopia, Colombia, and Japan. Every batch is roasted in 48-hour cycles — never pre-ground, never compromised.
            </p>
            <p data-r className={styles.body} style={{ opacity:0, transform:'translateY(18px)', transition:'all 0.9s ease' }}>
              Our process mirrors our philosophy: obsessive attention to detail, from altitude of growth to angle of grind.
            </p>
            <a data-r href="#menu" className={styles.cta} style={{ opacity:0, transform:'translateY(18px)', transition:'all 0.9s ease' }}>
              Explore the Menu →
            </a>
          </div>
          <div className={styles.right}>
            <div data-r className={styles.statsGrid} style={{ opacity:0, transform:'translateY(22px)', transition:'all 1s ease' }}>
              {stats.map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statNum}>{s.num}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <div data-r className={styles.quote} style={{ opacity:0, transform:'translateY(22px)', transition:'all 1s ease' }}>
              <span className={styles.quoteGlyph}>&ldquo;</span>
              <p className={styles.quoteText}>The finest coffee begins with an honest relationship — with the land, the farmer, the flame.</p>
              <span className={styles.quoteAttrib}>— The COFFEE Manifesto</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ticker */}
      <div className={styles.ticker}>
        {Array(2).fill(['SINGLE ORIGIN','·','SMALL BATCH','·','HAND ROASTED','·','DIRECT TRADE','·','ALWAYS FRESH','·']).flat().map((t,i) => (
          <span key={i} className={styles.tickWord}>{t}</span>
        ))}
      </div>
    </section>
  );
}
