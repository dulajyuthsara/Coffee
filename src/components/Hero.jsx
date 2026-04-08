import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const titleRef = useRef();
  const tagRef = useRef();
  const boxRef = useRef();
  const subRef = useRef();

  useEffect(() => {
    const els = [tagRef.current, titleRef.current, boxRef.current, subRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        el.style.transition = 'opacity 1.1s cubic-bezier(0.22,1,0.36,1), transform 1.1s cubic-bezier(0.22,1,0.36,1)';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 250 + i * 160);
    });
  }, []);

  return (
    <section id="intro" className={styles.hero}>
      {/* Gradient overlays — left & bottom to keep text readable */}
      <div className={styles.gradLeft} />
      <div className={styles.gradBottom} />

      {/* Top center tagline */}
      <p ref={tagRef} className={styles.topTag}>
        MADE FOR MORNINGS. BREWED FOR MOMENTS.
      </p>

      {/* Giant hero title */}
      <h1 ref={titleRef} className={styles.title}>COFFEE</h1>

      {/* Bottom-left descriptor box — Oryzo style */}
      <div ref={boxRef} className={styles.descriptorBox}>
        <p className={styles.descriptorHeader}>
          SOURCED FROM<br />ORIGIN FARMS,<br />ROASTED TO ORDER.
        </p>
        <div className={styles.divider} />
        <p className={styles.descriptorSub}>
          The world's most intentionally<br />crafted cup of coffee.
        </p>
      </div>

      {/* Right side body copy */}
      <p ref={subRef} className={styles.rightCopy}>
        Designed to lift, awaken, and linger in<br />
        all the right ways. COFFEE makes the<br />
        simplest moment feel extraordinary.
      </p>

      {/* Scroll indicator */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollCircle}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span>SCROLL TO CONTINUE</span>
      </div>

      {/* Vertical side label */}
      <div className={styles.sideLabel}>SINGLE-ORIGIN MODEL — 2025</div>

      {/* Corner accent dot */}
      <div className={styles.dot} />
    </section>
  );
}
