# ☕ Coffee& — 3D Specialty Coffee Shop Website

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg?style=flat&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-Latest-black.svg?style=flat&logo=three.js)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-green.svg?style=flat)](https://greensock.com/gsap/)
[![Lenis](https://img.shields.io/badge/Lenis-Smooth_Scroll-lightgrey.svg?style=flat)](https://github.com/studio-freight/lenis)

A cinematic, scroll-driven 3D landing page for a specialty coffee shop. Inspired by premium design aesthetics, this project features a live 3D coffee cup powered by **React Three Fiber**, seamless scroll animations with **GSAP**, and a sleek layout.

---

## ✨ Features

- **Live 3D Scene** — Photorealistic ceramic coffee cup with latte art, steam particles, floating coffee beans, and an orbiting particle field.
- **Oryzo-style Hero** — Giant display type, cinematic overlays, descriptor boxes, and pixel-perfect layouts.
- **Custom Cursor** — Smooth lerp-animated ring cursor that expands on hover.
- **Scroll-Triggered Reveals** — Fully animated sections triggered seamlessly using IntersectionObserver.
- **Interactive Menu & Grid** — Hover-expandable menus, a product grid with add-to-cart feedback animations, and a scrolling caramel marquee.
- **Responsive & Glassmorphism** — Transparent-to-blur navigation on scroll, and a mobile-optimized layout across every breakpoint.

---

## 🚀 Quick Start

Follow these steps to run the project locally on your machine.

### 1. Install dependencies
```bash
npm install
```

### 2. Start development server
```bash
npm start
```

### 3. View the app
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🛠 Tech Stack

| Library | Purpose |
|---------|---------|
| **React 18** | UI framework architecture |
| **React Three Fiber** | Declarative rendering for Three.js |
| **@react-three/drei** | Helpful 3D abstractions (Float, ContactShadows, Environment) |
| **Three.js** | Core 3D engine |
| **GSAP** | Advanced timeline animations |
| **Lenis** | Smooth scrolling functionality |
| **CSS Modules** | Clean and scoped component styling |

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── WorldCanvas.jsx     # Master 3D canvas wrap
│   ├── Cursor.jsx          # Custom lerp cursor
│   ├── Nav.jsx             # Glassmorphism navigation
│   ├── Hero.jsx            # 3D canvas visual start + Layout
│   ├── Craft.jsx           # About section + stats
│   ├── Menu.jsx            # Interactive menu table
│   ├── Shop.jsx            # Product grid
│   ├── Testimonials.jsx    # Review components
│   └── Footer.jsx          # Site footprint and quick links
├── App.js                  # Main app assembly and scroll tracking
├── index.js                # React root hook
└── index.css               # Global tokens, reset, and core aesthetics
```

---

## 🎨 Design Tokens

*Located in `index.css`*
- **Backgrounds:** `--espresso` (#0d0805), `--dark-roast` (#1a100a)
- **Accents:** `--caramel` (#c8813a), `--latte` (#d4a06a)
- **Typography:** `--font-display` ('Bebas Neue'), `--font-serif` ('Cormorant Garamond'), `--font-body` ('DM Sans')

---

## 🔧 Customisation Guide

### Swapping the 3D Model
If you'd like to use a different 3D model, replace the procedural geometry in your scene with a custom GLTF model:
```jsx
// Example code
import { useGLTF } from '@react-three/drei';
const { scene } = useGLTF('/new-coffee-cup.glb');
return <primitive object={scene} />;
```

### Connecting to a Backend
The newsletter block and "Add to Order" functions are UI-ready! Connect them directly to a REST/GraphQL API or popular managed services like Stripe, Shopify Storefront API, or Supabase.

---

<div align="center">
  <p><i>☕ Designed with obsession. Built for craft.</i></p>
</div>
