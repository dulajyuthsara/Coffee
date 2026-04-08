import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Float, Sparkles, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import coffeeCupImg from '../assets/coffee.jpeg';

/* ─────────────────────────────────────────────
   COFFEE CUP — rendered from the uploaded image
───────────────────────────────────────────── */
function CoffeeCup({ scrollProgress }) {
  const groupRef = useRef();
  const halo1 = useRef();
  const halo2 = useRef();
  const texture = useLoader(TextureLoader, coffeeCupImg);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;

    if (groupRef.current) {
      // Float
      groupRef.current.position.y = Math.sin(t * 0.65) * 0.14;
      // Scale down as user scrolls past hero
      const s = Math.max(0.35, 1 - p * 0.65);
      groupRef.current.scale.setScalar(s);
      // Drift right then fade out
      groupRef.current.position.x = p * 3.5;
      groupRef.current.rotation.y = Math.sin(t * 0.35) * 0.08 + p * 0.4;
      groupRef.current.rotation.z = Math.sin(t * 0.28) * 0.025;
      // Opacity via material — achieved by updating the mesh child
      groupRef.current.children.forEach(child => {
        if (child.material) child.material.opacity = Math.max(0, 1 - p * 1.8);
      });
    }

    if (halo1.current) {
      halo1.current.rotation.z = t * 0.22;
      halo1.current.material.opacity = (0.10 + Math.sin(t) * 0.04) * Math.max(0, 1 - p * 2);
    }
    if (halo2.current) {
      halo2.current.rotation.z = -t * 0.15;
      halo2.current.material.opacity = (0.07 + Math.sin(t * 0.8) * 0.03) * Math.max(0, 1 - p * 2);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Glow behind */}
      <mesh position={[0, 0, -0.3]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial color="#c8813a" transparent opacity={0.05} />
      </mesh>
      {/* Halo rings */}
      <mesh ref={halo1} position={[0, 0, -0.15]}>
        <torusGeometry args={[1.6, 0.009, 8, 90]} />
        <meshBasicMaterial color="#c8813a" transparent opacity={0.1} />
      </mesh>
      <mesh ref={halo2} position={[0, 0, -0.2]} rotation={[0, 0, 1.2]}>
        <torusGeometry args={[2.1, 0.006, 8, 90]} />
        <meshBasicMaterial color="#d4a06a" transparent opacity={0.07} />
      </mesh>
      {/* The cup image */}
      <mesh>
        <planeGeometry args={[3.2, 3.0]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.01} />
      </mesh>
      {/* Steam */}
      <Steam position={[-0.1, 1.2, 0.1]} delay={0} />
      <Steam position={[0.12, 1.4, 0.05]} delay={0.8} />
      <Steam position={[0.32, 1.25, 0.08]} delay={1.6} />
    </group>
  );
}

function Steam({ position, delay }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() + delay;
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(t * 0.9) * 0.12;
    ref.current.material.opacity = 0.07 + Math.sin(t) * 0.04;
    const s = 0.75 + Math.sin(t * 0.6) * 0.18;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshBasicMaterial color="#f5ede0" transparent opacity={0.08} />
    </mesh>
  );
}

/* ─────────────────────────────────────────────
   COFFEE BEANS — 18 beans orbiting & drifting
───────────────────────────────────────────── */
function Bean({ basePos, rot, scl, speed, offset, scrollProgress }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    const p = scrollProgress.current;
    if (!ref.current) return;

    // Float motion
    ref.current.position.x = basePos[0] + Math.cos(t * 0.7) * 0.25;
    ref.current.position.y = basePos[1] + Math.sin(t) * 0.22;
    ref.current.position.z = basePos[2] + Math.sin(t * 0.5) * 0.18;

    // Spin
    ref.current.rotation.x += 0.009;
    ref.current.rotation.y += 0.013;

    // Scroll: beans spread across screen
    const spread = p * 3;
    ref.current.position.x += Math.sign(basePos[0]) * spread * 0.6;
    ref.current.position.y -= p * basePos[1] * 0.3;
  });

  return (
    <group ref={ref} position={basePos} rotation={rot} scale={scl}>
      {/* Bean body */}
      <mesh castShadow>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color="#3a2010" roughness={0.45} metalness={0.15}
          emissive="#1a0c06" emissiveIntensity={0.1} />
      </mesh>
      {/* Crease */}
      <mesh position={[0, 0, 0.86]} scale={[0.14, 0.9, 0.14]}>
        <sphereGeometry args={[1, 6, 6]} />
        <meshStandardMaterial color="#1a0c06" roughness={0.9} />
      </mesh>
    </group>
  );
}

function BeanField({ scrollProgress }) {
  const beans = useMemo(() => [
    { basePos: [-3.2, 0.8, -0.6], rot: [0.3, 0.8, 0.2], scl: [0.10, 0.065, 0.10], speed: 0.32, offset: 0 },
    { basePos: [3.1, 0.3, -0.4], rot: [0.6, 0.2, 1.1], scl: [0.12, 0.078, 0.12], speed: 0.26, offset: 1.2 },
    { basePos: [-2.2, -1.0, 0.3], rot: [1.2, 0.5, 0.3], scl: [0.08, 0.052, 0.08], speed: 0.40, offset: 2.5 },
    { basePos: [2.5, -1.2, 0.5], rot: [0.8, 1.2, 0.6], scl: [0.09, 0.058, 0.09], speed: 0.36, offset: 0.8 },
    { basePos: [-3.5, -0.3, -0.8], rot: [1.5, 0.3, 0.9], scl: [0.13, 0.085, 0.13], speed: 0.20, offset: 3.1 },
    { basePos: [2.0, 1.6, -0.7], rot: [0.4, 1.8, 0.1], scl: [0.07, 0.045, 0.07], speed: 0.43, offset: 1.8 },
    { basePos: [-1.5, 1.8, 0.4], rot: [1.1, 0.6, 1.3], scl: [0.08, 0.052, 0.08], speed: 0.31, offset: 4.2 },
    { basePos: [3.6, 1.0, 0.3], rot: [0.2, 1.4, 0.7], scl: [0.09, 0.058, 0.09], speed: 0.27, offset: 2.0 },
    { basePos: [-0.9, -1.8, -1.0], rot: [0.9, 0.1, 1.6], scl: [0.11, 0.071, 0.11], speed: 0.49, offset: 5.0 },
    { basePos: [0.6, 2.0, -0.5], rot: [1.8, 0.8, 0.4], scl: [0.065, 0.042, 0.065], speed: 0.45, offset: 3.7 },
    { basePos: [-4.0, 1.2, -0.2], rot: [0.5, 1.0, 0.8], scl: [0.085, 0.055, 0.085], speed: 0.23, offset: 0.5 },
    { basePos: [3.8, -0.6, -0.4], rot: [1.3, 0.7, 0.2], scl: [0.075, 0.048, 0.075], speed: 0.38, offset: 2.9 },
    { basePos: [-1.8, 2.2, -0.6], rot: [0.7, 0.3, 1.5], scl: [0.06, 0.038, 0.06], speed: 0.52, offset: 1.4 },
    { basePos: [1.2, -2.0, 0.2], rot: [1.6, 1.1, 0.6], scl: [0.09, 0.058, 0.09], speed: 0.34, offset: 6.0 },
    { basePos: [-2.8, 2.0, 0.1], rot: [0.2, 0.9, 1.2], scl: [0.10, 0.065, 0.10], speed: 0.29, offset: 3.3 },
    { basePos: [4.2, 0.4, -1.0], rot: [1.0, 1.5, 0.4], scl: [0.07, 0.045, 0.07], speed: 0.44, offset: 0.2 },
    { basePos: [-0.4, 2.4, -0.3], rot: [0.8, 0.2, 0.9], scl: [0.08, 0.052, 0.08], speed: 0.37, offset: 4.8 },
    { basePos: [0.0, -2.2, -0.7], rot: [1.4, 0.6, 1.8], scl: [0.11, 0.071, 0.11], speed: 0.25, offset: 2.1 },
  ], []);

  return <>{beans.map((b, i) => <Bean key={i} scrollProgress={scrollProgress} {...b} />)}</>;
}

/* ─────────────────────────────────────────────
   PARTICLE DUST — ambient field
───────────────────────────────────────────── */
function ParticleDust({ scrollProgress }) {
  const ref = useRef();
  const count = 320;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 2;
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.018;
    ref.current.rotation.x = t * 0.008;
    // Drift upward as user scrolls
    ref.current.position.y = scrollProgress.current * -2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#c8813a" size={0.018} transparent opacity={0.3} sizeAttenuation />
    </points>
  );
}

/* ─────────────────────────────────────────────
   ORBITING RINGS — section-specific
───────────────────────────────────────────── */
function OrbitalRings({ scrollProgress }) {
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const configs = [
    { radius: 4.5, thickness: 0.012, speed: 0.12, color: '#c8813a', opacity: 0.08 },
    { radius: 6.0, thickness: 0.008, speed: -0.07, color: '#d4a06a', opacity: 0.06 },
    { radius: 3.2, thickness: 0.016, speed: 0.18, color: '#c8813a', opacity: 0.10 },
    { radius: 7.5, thickness: 0.005, speed: -0.05, color: '#d4a06a', opacity: 0.04 },
  ];

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;
    refs.forEach((ref, i) => {
      if (!ref.current) return;
      ref.current.rotation.z = t * configs[i].speed;
      ref.current.rotation.x = t * configs[i].speed * 0.5 + p * 0.8;
      ref.current.rotation.y = t * configs[i].speed * 0.3 + p * 0.4;
      ref.current.material.opacity = configs[i].opacity * (0.5 + p * 0.8);
    });
  });

  return (
    <>
      {configs.map((c, i) => (
        <mesh key={i} ref={refs[i]}>
          <torusGeometry args={[c.radius, c.thickness, 8, 120]} />
          <meshBasicMaterial color={c.color} transparent opacity={c.opacity} />
        </mesh>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   MENU SECTION — rotating display items
───────────────────────────────────────────── */
function MenuOrbs({ scrollProgress }) {
  const groupRef = useRef();
  const orbs = useMemo(() => [
    { pos: [-2.5, 0, -1], color: '#3a2010', emissive: '#c8813a', r: 0.35 },
    { pos: [0, 0.5, -1.5], color: '#2e1c12', emissive: '#d4a06a', r: 0.45 },
    { pos: [2.5, -0.2, -1], color: '#3a2010', emissive: '#c8813a', r: 0.35 },
    { pos: [-1.2, -1.2, -0.5], color: '#1a0f08', emissive: '#c8813a', r: 0.22 },
    { pos: [1.4, 1.3, -0.8], color: '#1a0f08', emissive: '#d4a06a', r: 0.18 },
  ], []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;
    // Only visible in menu section (0.3–0.6)
    const vis = Math.max(0, Math.min(1, (p - 0.28) * 5)) * Math.max(0, 1 - (p - 0.62) * 5);
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.12;
      groupRef.current.children.forEach((c, i) => {
        c.material.emissiveIntensity = vis * (0.3 + Math.sin(t * 0.8 + i) * 0.1);
        c.material.opacity = vis;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {orbs.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.r, 24, 24]} />
          <meshStandardMaterial color={o.color} emissive={o.emissive}
            emissiveIntensity={0.3} roughness={0.2} metalness={0.4}
            transparent opacity={0} />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   SHOP SECTION — three floating cups side by side
───────────────────────────────────────────── */
function ShopCups({ scrollProgress }) {
  const texture = useLoader(TextureLoader, coffeeCupImg);
  texture.minFilter = THREE.LinearFilter;
  const cups = useRef([]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = scrollProgress.current;
    const vis = Math.max(0, Math.min(1, (p - 0.55) * 6)) * Math.max(0, 1 - (p - 0.85) * 6);

    cups.current.forEach((c, i) => {
      if (!c) return;
      c.position.y = [-0.05, 0.05, -0.05][i] + Math.sin(t * 0.7 + i * 1.1) * 0.12;
      c.rotation.y = Math.sin(t * 0.35 + i * 0.8) * 0.08;
      c.children.forEach(ch => {
        if (ch.material) ch.material.opacity = vis;
      });
    });
  });

  const positions = [[-3.0, 0, 0], [0, 0.15, 0.3], [3.0, 0, 0]];
  const scales = [0.55, 0.68, 0.55];

  return (
    <>
      {positions.map((pos, i) => (
        <group key={i} ref={el => cups.current[i] = el} position={pos} scale={scales[i]}>
          <mesh>
            <planeGeometry args={[3.0, 2.8]} />
            <meshBasicMaterial map={texture} transparent alphaTest={0.01} opacity={0} />
          </mesh>
          {/* Pedestal */}
          <mesh position={[0, -1.65, -0.1]}>
            <cylinderGeometry args={[0.5, 0.7, 0.14, 32]} />
            <meshStandardMaterial color="#2a1810" roughness={0.3} metalness={0.4} />
          </mesh>
          <mesh position={[0, -1.6, -0.08]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.55, 32]} />
            <meshBasicMaterial color="#c8813a" transparent opacity={0.15} />
          </mesh>
        </group>
      ))}
    </>
  );
}

/* ─────────────────────────────────────────────
   SCROLL-DRIVEN CAMERA
───────────────────────────────────────────── */
function CameraRig({ scrollProgress }) {
  const { camera } = useThree();

  useFrame(() => {
    const p = scrollProgress.current;
    // Camera path through the scene
    const tx = p * 1.5;
    const ty = -p * 0.8;
    const tz = 5.2 - p * 1.0;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z += (tz - camera.position.z) * 0.04;
    camera.lookAt(p * 0.5, p * -0.2, 0);
  });
  return null;
}

/* ─────────────────────────────────────────────
   WORLD SCENE — assembles everything
───────────────────────────────────────────── */
function WorldScene({ scrollProgress }) {
  return (
    <>
      <CameraRig scrollProgress={scrollProgress} />

      <ambientLight intensity={0.35} color="#fff8f0" />
      <directionalLight position={[5, 8, 5]} intensity={1.8} color="#ffd4a0" castShadow />
      <directionalLight position={[-4, 3, -3]} intensity={0.6} color="#c8813a" />
      <pointLight position={[0, 5, 3]} intensity={1.2} color="#ff9950" />
      <pointLight position={[0, -4, 2]} intensity={0.5} color="#c8813a" />
      <pointLight position={[-6, 0, 2]} intensity={0.4} color="#d4a06a" />

      <Suspense fallback={null}>
        <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.35}>
          <CoffeeCup scrollProgress={scrollProgress} />
        </Float>
        <ShopCups scrollProgress={scrollProgress} />
      </Suspense>

      <BeanField scrollProgress={scrollProgress} />
      <ParticleDust scrollProgress={scrollProgress} />
      <OrbitalRings scrollProgress={scrollProgress} />
      <MenuOrbs scrollProgress={scrollProgress} />

      <Sparkles count={80} scale={12} size={1.4} speed={0.25}
        opacity={0.18} color="#c8813a" position={[0, 0, -3]} />

      <Stars radius={60} depth={30} count={800} factor={2}
        saturation={0.2} fade speed={0.4} />

      <Environment preset="sunset" />
    </>
  );
}

/* ─────────────────────────────────────────────
   EXPORTED WORLD CANVAS — mounts once, persists
───────────────────────────────────────────── */
export default function WorldCanvas({ scrollProgress }) {
  return (
    <div id="world-canvas">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 42 }}
        dpr={[1, 2]}
        style={{ width: '100%', height: '100%' }}
        gl={{ antialias: true, alpha: true }}
        shadows
      >
        <Suspense fallback={null}>
          <WorldScene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
