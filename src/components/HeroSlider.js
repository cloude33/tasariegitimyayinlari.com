"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const slides = [
  '/images/slider1.avif',
  '/images/slider2.avif',
  '/images/slider3.avif',
  '/images/slider4.avif',
  '/images/slider5.avif',
  '/images/slider6.avif',
  '/images/slider7.avif',
  '/images/slider8.avif'
];

const stats = [
  { value: '40+', label: 'Yıllık Deneyim' },
  { value: '14', label: 'DGS Türkiye 1.si' },
  { value: '100K+', label: 'Mezun Öğrenci' },
  { value: '500+', label: 'Yayın Başlığı' },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrent((prev) => {
      if (newDirection === 1) return prev === slides.length - 1 ? 0 : prev + 1;
      return prev === 0 ? slides.length - 1 : prev - 1;
    });
  };

  const imgVariants = {
    enter: (dir) => ({ x: dir > 0 ? '5%' : '-5%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir < 0 ? '5%' : '-5%', opacity: 0 }),
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <link rel="preload" as="image" href={slides[0]} fetchPriority="high" />
      {/* Slide Banner Area - Temiz resimler, yazı çakışması yok */}
      <section 
        className="hero-slider-section"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          background: 'var(--bg-dark, #0f172a)',
        }}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.5 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              if (swipe < -8000) paginate(1);
              else if (swipe > 8000) paginate(-1);
            }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `url(${slides[current]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'grab',
            }}
          />
        </AnimatePresence>

        {/* Sol / Sağ Gezinme Okları */}
        <button
          onClick={() => paginate(-1)}
          aria-label="Önceki slayt"
          className="hero-slider-arrow prev"
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            zIndex: 20, borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button
          onClick={() => paginate(1)}
          aria-label="Sonraki slayt"
          className="hero-slider-arrow next"
          style={{
            position: 'absolute', top: '50%', transform: 'translateY(-50%)',
            zIndex: 20, borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.4)', border: '1px solid rgba(255, 255, 255, 0.25)',
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', backdropFilter: 'blur(8px)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.4)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>

        {/* Nokta Göstergeleri */}
        <div 
          className="hero-slider-dots"
          style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            zIndex: 20, display: 'flex', alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.35)', borderRadius: '20px',
            backdropFilter: 'blur(8px)'
          }}
        >
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { setDirection(idx > current ? 1 : -1); setCurrent(idx); }}
              aria-label={`Slayt ${idx + 1}`}
              style={{
                width: current === idx ? '22px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: current === idx ? 'var(--accent, #f59e0b)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Alt Amber Çizgi */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px',
          background: 'var(--accent)',
          zIndex: 20,
        }} />
      </section>
    </div>
  );
}
