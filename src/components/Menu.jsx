import { useRef, useEffect } from 'react';
import styles from './Menu.module.css';

const items = [
  { no: '01', name: 'Signature Espresso', origin: 'Colombia', notes: 'Dark chocolate · Dried cherry · Velvet body', roast: 'Dark', price: '$4.50', desc: 'Pulled at 9 bar through 18g of our house blend. Intensity without bitterness.' },
  { no: '02', name: 'Yirgacheffe Pour-Over', origin: 'Ethiopia ', notes: 'Jasmine · Bergamot · Lingering citrus', roast: 'Light', price: '$6.80', desc: 'Single-origin micro-lot, brewed to order. Floral, bright, and endlessly complex.' },
  { no: '03', name: 'Cold Brew Reserve', origin: 'Colombia', notes: 'Silk · Low-acid · Dark caramel', roast: 'Medium', price: '$5.90', desc: '24-hour cold steep. Silky, dangerously smooth, over crystal ice with sea salt.' },
  { no: '04', name: 'Velvet Mocha', origin: 'Brazil', notes: 'Dark chocolate · Oat milk · Warm spice', roast: 'Dark', price: '$6.20', desc: 'House espresso, single-origin chocolate, steamed oat milk. An evening in a cup.' },
  { no: '05', name: 'Kyoto Flash', origin: 'Japan', notes: 'Floral · Stone fruit · Clean finish', roast: 'Light', price: '$7.50', desc: 'Japanese-style flash brew — crystalline, aromatic, unlike any other cold cup.' },
];

export default function Menu() {
  const ref = useRef();
  useEffect(() => {
    const rows = ref.current?.querySelectorAll('[data-row]') || [];
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
    }, { threshold: 0.08 });
    rows.forEach(r => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section id="menu" className={styles.menu} ref={ref}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.eye}>THE MENU</span>
          <h2 className={styles.heading}>Crafted with<br /><em>Intention</em></h2>
          <p className={styles.sub}>Every item is a composition — balanced, intentional, and worth savouring slowly.</p>
        </div>

        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>No.</span><span>Name</span><span>Origin</span><span>Roast</span><span>Price</span>
          </div>
          {items.map((item, i) => (
            <div key={item.no} data-row className={styles.row}
              style={{ opacity: 0, transform: 'translateY(18px)', transition: `all 0.7s ease ${i * 0.07}s` }}>
              <span className={styles.rNo}>{item.no}</span>
              <div className={styles.rMain}>
                <span className={styles.rName}>{item.name}</span>
                <span className={styles.rNotes}>{item.notes}</span>
              </div>
              <span className={styles.rOrigin}>{item.origin}</span>
              <span className={styles.rRoast} data-roast={item.roast}>{item.roast}</span>
              <span className={styles.rPrice}>{item.price}</span>
              <div className={styles.rExpand}>
                <p>{item.desc}</p>
                <button className={styles.orderBtn}>Add to Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
