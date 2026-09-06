"use client";
import { motion } from 'framer-motion';

export default function PubCard({ category, title, desc, features, buyLink, solutionLink, image }) {
  // Map categories to premium OKLCH color accents
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'dgs': return { bg: 'oklch(96% 0.02 250)', border: 'oklch(60% 0.15 250)', text: 'oklch(40% 0.15 250)' };
      case 'yos': return { bg: 'oklch(97% 0.03 70)', border: 'oklch(60% 0.18 60)', text: 'oklch(45% 0.18 60)' };
      case 'ales': return { bg: 'oklch(97% 0.03 150)', border: 'oklch(55% 0.15 150)', text: 'oklch(40% 0.15 150)' };
      case 'kpss': return { bg: 'oklch(96% 0.02 340)', border: 'oklch(55% 0.18 340)', text: 'oklch(40% 0.18 340)' };
      case 'tyt': return { bg: 'oklch(96% 0.03 290)', border: 'oklch(55% 0.20 290)', text: 'oklch(40% 0.20 290)' };
      case 'spk': return { bg: 'oklch(96% 0.03 40)', border: 'oklch(60% 0.18 40)', text: 'oklch(45% 0.18 40)' };
      default: return { bg: 'var(--bg)', border: 'var(--border)', text: 'var(--primary)' };
    }
  };

  const colors = getCategoryColor(category);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: "easeOut" } }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)',
        position: 'relative',
        height: '100%',
        isolation: 'isolate'
      }}
    >
      {/* Premium Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '130%', /* Taller ratio to fit portrait book covers */
        background: colors.bg,
        borderBottom: '1px solid var(--border)'
      }}>
        {/* Subtle radial gradient for lighting effect */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 0%, ${colors.bg} 0%, transparent 80%)`,
          opacity: 0.6,
          zIndex: 1
        }} />
        
        {image ? (
          <motion.img 
            src={image} 
            alt={title} 
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 2,
            }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
            <span style={{ color: colors.text, opacity: 0.5, fontWeight: 600, letterSpacing: '2px' }}>{category.toUpperCase()}</span>
          </div>
        )}
      </div>
      
      {/* Content Area */}
      <div style={{
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        gap: '16px'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: colors.text,
            background: colors.bg,
            padding: '4px 8px',
            borderRadius: '4px',
            alignSelf: 'flex-start',
            border: `1px solid ${colors.border}`
          }}>
            {category}
          </span>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 800,
            lineHeight: 1.3,
            color: 'var(--text)',
            margin: 0
          }}>{title}</h3>
        </div>
        
        <p style={{
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'var(--text-dim)',
          margin: 0,
          flexGrow: 1
        }}>{desc}</p>
        
        {/* Features - Distilled to a cleaner inline format */}
        {features && features.length > 0 && (
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border)'
          }}>
            {features.slice(0, 2).map((f, i) => (
              <span key={i} style={{
                fontSize: '12px',
                color: 'var(--text-dim)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={colors.text} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                {f}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          paddingTop: '16px',
          marginTop: 'auto'
        }}>
          {buyLink && (
            <motion.a 
              href={buyLink} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, backgroundColor: 'var(--text-dark)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'var(--primary)',
                color: '#fff',
                padding: '12px',
                borderRadius: 'var(--radius-btn)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease'
              }}
            >
              Satın Al
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </motion.a>
          )}
          {solutionLink && (
            <motion.a 
              href={solutionLink}
              whileHover={{ backgroundColor: 'var(--bg)' }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                padding: '12px',
                borderRadius: 'var(--radius-btn)',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'background-color 0.2s ease'
              }}
            >
              Çözümler
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
