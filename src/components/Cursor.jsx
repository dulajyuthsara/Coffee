import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const hovered = useRef(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
      }
    };
    const onEnter = () => { hovered.current = true; };
    const onLeave = () => { hovered.current = false; };

    window.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    let raf;
    const lerp = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.11;
      ring.current.y += (pos.current.y - ring.current.y) * 0.11;
      if (ringRef.current) {
        const size = hovered.current ? 56 : 36;
        ringRef.current.style.transform = `translate(${ring.current.x - size/2}px,${ring.current.y - size/2}px)`;
        ringRef.current.style.width  = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderColor = hovered.current ? 'rgba(200,129,58,0.85)' : 'rgba(200,129,58,0.45)';
      }
      raf = requestAnimationFrame(lerp);
    };
    raf = requestAnimationFrame(lerp);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed',top:-4,left:-4,width:8,height:8,borderRadius:'50%',
        background:'var(--caramel)',zIndex:99999,pointerEvents:'none',
        willChange:'transform',mixBlendMode:'difference',
      }}/>
      <div ref={ringRef} style={{
        position:'fixed',top:0,left:0,width:36,height:36,borderRadius:'50%',
        border:'1px solid rgba(200,129,58,0.45)',zIndex:99998,pointerEvents:'none',
        willChange:'transform,width,height,border-color',
        transition:'width 0.28s ease,height 0.28s ease,border-color 0.28s ease',
      }}/>
    </>
  );
}
