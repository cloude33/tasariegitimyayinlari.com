"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import PubCard from '@/components/PubCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function YayinlarClient({ categories }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects for hero
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const ySlider = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Extract all books for the hero slider
  const allBooks = categories.flatMap(c => c.items);
  // Duplicate for seamless marquee
  const marqueeBooks = [...allBooks, ...allBooks].slice(0, 24);

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden' }}>

      {/* Editorial Drenched Hero Section */}
      <section ref={heroRef} style={{
        position: 'relative',
        minHeight: '60vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingTop: '80px',
        paddingBottom: '0px',
        overflow: 'hidden'
      }}>
        {/* Abstract background gradient shapes */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '60vw',
          height: '60vw',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.8,
          pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <motion.div
            style={{ y: yText, opacity: opacityText, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              color: 'var(--accent)',
              fontSize: '12px',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px'
            }}>Koleksiyon</span>
            <h1 style={{
              color: '#ffffff',
              fontSize: 'clamp(32px, 4vw, 56px)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '24px'
            }}>
              Başarıyı Tesadüfe Bırakma.
            </h1>
            <p style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'clamp(14px, 1.2vw, 16px)',
              fontWeight: 400,
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Gerçek sınav formatında, titizlikle hazırlanmış DGS, YÖS, ALES ve KPSS yayınlarımızla hedefine en kısa yoldan ulaş.
            </p>
          </motion.div>
        </div>

        {/* Marquee Slider */}
        <motion.div
          style={{
            y: ySlider,
            marginTop: '60px',
            position: 'relative',
            zIndex: 5,
            width: '100%',
            overflow: 'hidden'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <div style={{
            display: 'flex',
            gap: '0px',
            padding: '0px',
            animation: 'marquee 60s linear infinite',
            width: 'max-content'
          }}>
            {marqueeBooks.map((book, idx) => (
              <div key={idx} style={{
                width: '280px',
                height: '400px',
                borderRadius: '0px',
                overflow: 'hidden',
                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                background: 'var(--bg-card)',
                flexShrink: 0,
                border: 'none'
              }}>
                <img src={book.image} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
          `}} />
        </motion.div>
      </section>

      {/* Categories Content */}
      <div style={{ position: 'relative', zIndex: 20, background: 'var(--bg)', paddingBottom: '120px' }}>
        {categories.map((cat, idx) => (
          <section key={cat.id} id={cat.id} style={{
            paddingTop: idx === 0 ? '80px' : '140px',
            borderTop: idx > 0 ? '1px solid var(--border)' : 'none'
          }}>
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: '64px', maxWidth: '700px' }}
              >
                <h2 style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: 800,
                  color: 'var(--text)',
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>{cat.name}</h2>
                <p style={{
                  fontSize: '18px',
                  color: 'var(--text-dim)',
                  lineHeight: 1.6
                }}>{cat.desc}</p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: '32px'
                }}
              >
                {cat.items.map((item, i) => (
                  <motion.div key={i} variants={itemVariants} style={{ height: '100%' }}>
                    <PubCard {...item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
