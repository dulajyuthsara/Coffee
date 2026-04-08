import { useState } from 'react';
import styles from './Shop.module.css';

import imgYirgacheffe from '../assets/Yirgacheffe Light.jpeg';
import imgHouseBlend from '../assets/House Blend Espresso.jpeg';
import imgColdBrewKit from '../assets/Reserve Cold Brew Kit.jpeg';
import imgPourOver from '../assets/Pour-Over Starter Set.jpeg';
import imgKyoto from '../assets/Kyoto Flash Beans.jpeg';
import imgColdBrew from '../assets/Cold Brew Concentrate.jpeg';

const products = [
  { id: 1, img: imgYirgacheffe, name: 'Yirgacheffe Light', tag: 'Single Origin', price: '$8.50', badge: 'New', detail: 'Ethiopia · 250g · Light Roast' },
  { id: 2, img: imgHouseBlend, name: 'House Blend Espresso', tag: 'Signature Blend', price: '$6.00', badge: null, detail: 'Colombia + Brazil · 250g · Dark Roast' },
  { id: 3, img: imgColdBrewKit, name: 'Reserve Cold Brew Kit', tag: 'Limited Edition', price: '$4.00', badge: 'Limited', detail: 'Colombia Micro-lot · Brew kit + 200g' },
  { id: 4, img: imgPourOver, name: 'Pour-Over Starter Set', tag: 'Equipment', price: '$6.00', badge: null, detail: 'Ceramic dripper · Filters · Scale' },
  { id: 5, img: imgKyoto, name: 'Kyoto Flash Beans', tag: 'Single Origin', price: '$8.00', badge: 'Rare', detail: 'Japan · 200g · Light Roast' },
  { id: 6, img: imgColdBrew, name: 'Cold Brew Concentrate', tag: 'Ready to Drink', price: '$10.00', badge: null, detail: '500ml · Colombian Reserve' },
];

export default function Shop() {
  const [added, setAdded] = useState({});
  const handleAdd = (id) => {
    setAdded(p => ({ ...p, [id]: true }));
    setTimeout(() => setAdded(p => ({ ...p, [id]: false })), 1400);
  };

  return (
    <section id="shop" className={styles.shop}>
      <div className={styles.panel}>
        <div className={styles.header}>
          <span className={styles.eye}>THE SHOP</span>
          <h2 className={styles.heading}>Bring the<br /><em>Ritual Home</em></h2>
          <p className={styles.sub}>Beans, blends, and brewing gear — curated for the discerning home barista.</p>
        </div>
        <div className={styles.grid}>
          {products.map(p => (
            <div key={p.id} className={styles.card}>
              {p.badge && <span className={styles.badge}>{p.badge}</span>}
              <div className={styles.visual}>
                <img src={p.img} alt={p.name} className={styles.productImg} />
                <div className={styles.glow} />
              </div>
              <div className={styles.info}>
                <span className={styles.tag}>{p.tag}</span>
                <h3 className={styles.name}>{p.name}</h3>
                <p className={styles.detail}>{p.detail}</p>
                <div className={styles.bottom}>
                  <span className={styles.price}>{p.price}</span>
                  <button className={`${styles.addBtn} ${added[p.id] ? styles.added : ''}`}
                    onClick={() => handleAdd(p.id)}>
                    {added[p.id] ? '✓' : '+'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
