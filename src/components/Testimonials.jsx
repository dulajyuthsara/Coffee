import styles from './Testimonials.module.css';

const testimonials = [
  { initials: 'SK', name: 'Sofia K.', role: 'Home barista · London', text: 'The Yirgacheffe changed how I think about light roast. Floral, clean, and deeply complex — it opens differently every morning.', stars: 5 },
  { initials: 'JM', name: 'James M.', role: 'Designer · Amsterdam', text: "The cold brew kit arrived, I followed the guide, and I genuinely couldn't believe I made something that good. Silky doesn't cover it.", stars: 5 },
  { initials: 'RP', name: 'Rania P.', role: 'Architect · Dubai', text: 'COFFEE is my morning ritual. The subscription is perfectly timed — the freshness is real. Open the bag and the room transforms.', stars: 5 },
];

export default function Testimonials() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.panel}>
        <span className={styles.eye}>STORIES</span>
        <h2 className={styles.heading}>What Our<br /><em>Community Says</em></h2>

        <div className={styles.grid}>
          {testimonials.map(t => (
            <div key={t.name} className={styles.card}>
              <div className={styles.glyph}>&ldquo;</div>
              <p className={styles.text}>{t.text}</p>
              <div className={styles.stars}>{'★'.repeat(t.stars)}</div>
              <div className={styles.author}>
                <div className={styles.avatar}>{t.initials}</div>
                <div>
                  <span className={styles.name}>{t.name}</span>
                  <span className={styles.role}>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.newsletter}>
          <p className={styles.nlEye}>STAY IN THE AROMA LOOP</p>
          <h3 className={styles.nlTitle}>New origins. Limited roasts.<br />Delivered before they sell out.</h3>
          <div className={styles.nlForm}>
            <input type="email" className={styles.nlInput} />
            <button className={styles.nlBtn}>Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}
