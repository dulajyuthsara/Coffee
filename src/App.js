import { Suspense, useRef, useEffect } from 'react';
import WorldCanvas from './components/WorldCanvas';
import Cursor      from './components/Cursor';
import Nav         from './components/Nav';
import Hero        from './components/Hero';
import Craft       from './components/Craft';
import Menu        from './components/Menu';
import Shop        from './components/Shop';
import Testimonials from './components/Testimonials';
import Footer      from './components/Footer';

/* ── Loading screen ── */
function Loader() {
  return (
    <div style={{
      position:'fixed', inset:0, background:'#0a0604',
      display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center',
      zIndex:9999, gap:'1.5rem',
    }}>
      <div style={{
        fontFamily:"'Bebas Neue',sans-serif",
        fontSize:'5rem', color:'#c8813a',
        letterSpacing:'0.1em',
        animation:'fadeOsc 1.4s ease-in-out infinite',
      }}>
        COFFEE
      </div>
      <div style={{
        width:'140px', height:'1px',
        background:'rgba(200,129,58,0.2)',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{
          position:'absolute', top:0, left:'-100%',
          width:'100%', height:'100%',
          background:'#c8813a',
          animation:'loadBar 1.3s ease-in-out infinite',
        }}/>
      </div>
      <style>{`
        @keyframes fadeOsc{0%,100%{opacity:0.4}50%{opacity:1}}
        @keyframes loadBar{0%{left:-100%}100%{left:100%}}
      `}</style>
    </div>
  );
}

export default function App() {
  /* scrollProgress: 0 at top, 1 at bottom — drives camera + scene transitions */
  const scrollProgress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Single persistent 3D canvas behind the entire page ── */}
      <Suspense fallback={<Loader />}>
        <WorldCanvas scrollProgress={scrollProgress} />
      </Suspense>

      {/* ── Custom cursor ── */}
      <Cursor />

      {/* ── All page sections stack above the canvas ── */}
      <div id="page-content">
        <Nav />
        <Hero />
        <Craft />
        <Menu />
        <Shop />
        <Testimonials />
        <Footer />
      </div>
    </>
  );
}
