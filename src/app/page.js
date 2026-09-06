"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSlider from '@/components/HeroSlider';
import BranchCards from '@/components/BranchCards';

// Motion variants for Staggered Viewport Reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] // easeOutQuint
    }
  }
};

export default function Home() {
  // Parallax disabled for performance and to prevent crash
  // const { scrollYProgress } = useScroll();
  // const yParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div style={{ background: 'var(--bg)', overflow: 'hidden' }}>
      {/* HERO */}
      <HeroSlider />

      {/* BRANŞLAR */}
      <div style={{ position: 'relative', zIndex: 10, background: 'var(--bg)', marginTop: '-20px', borderRadius: '24px 24px 0 0' }}>
        <BranchCards />
      </div>

      {/* SATIŞ KANALLARI - Editorial Redesign */}
      <section style={{
        padding: '160px 0',
        background: 'var(--bg)',
        position: 'relative'
      }}>
        <div className="container">
          <motion.div 
            style={{ marginBottom: '80px', maxWidth: '800px' }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 style={{ 
              fontSize: 'clamp(36px, 5vw, 56px)', 
              fontWeight: 800, 
              color: 'var(--text)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '24px'
            }}>Yayınlarımıza Nasıl Ulaşırsınız?</h2>
            <p style={{ 
              color: 'var(--text-dim)', 
              fontSize: 'clamp(18px, 2vw, 22px)', 
              lineHeight: 1.6,
              maxWidth: '600px'
            }}>İster bireysel hazırlanın, ister kurumunuz için toplu alım yapın. Eğitim ihtiyaçlarınıza göre en uygun satış kanalını seçin.</p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px'
            }}
          >
            {/* Bireysel Satış - Asymmetric Left */}
            <motion.div variants={itemVariants} style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '40px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(32px, 5vw, 60px)',
              boxShadow: 'var(--shadow-md)',
              alignItems: 'center'
            }}>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ 
                  width: '64px', height: '64px', 
                  borderRadius: '16px', 
                  background: 'var(--accent)', 
                  color: 'oklch(12% 0.03 245)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '32px',
                  boxShadow: 'var(--shadow-accent)'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                </div>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Bireysel Öğrenciler</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '32px' }}>
                  Türkiye'nin en kapsamlı sınav hazırlık mağazası kitap.tasariegitim.com üzerinden tüm yayınlarımıza anında ulaşabilirsiniz.
                </p>
                <motion.a 
                  href="https://kitap.tasariegitim.com" 
                  target="_blank"
                  whileHover={{ scale: 1.02, boxShadow: 'var(--shadow-accent)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '16px 32px',
                    background: 'var(--accent)', color: 'oklch(12% 0.03 245)',
                    borderRadius: 'var(--radius-btn-pill)',
                    fontWeight: 800, fontSize: '15px', textDecoration: 'none',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.3s var(--ease-quint)'
                  }}
                >
                  Mağazaya Git <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </motion.a>
              </div>
              <div style={{ 
                flex: '1 1 400px', 
                height: '320px', 
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', 
                borderRadius: 'var(--radius)', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img src="/images/bireysel_premium.avif" alt="Bireysel Satış" width="600" height="400" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} onError={(e) => { e.target.style.display = 'none'; }} />
                <div style={{ padding: '40px', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
                  <span style={{ fontSize: '72px', fontWeight: 900, color: 'oklch(100% 0 0 / 0.05)', display: 'block', lineHeight: 1, letterSpacing: '-0.05em' }}>TASARI</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'oklch(100% 0 0 / 0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px', display: 'block' }}>KİTAP MAĞAZASI</span>
                </div>
              </div>
            </motion.div>

            {/* Kurumsal Satış - Asymmetric Right */}
            <motion.div variants={itemVariants} style={{
              display: 'flex',
              flexWrap: 'wrap-reverse',
              gap: '40px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'clamp(32px, 5vw, 60px)',
              boxShadow: 'var(--shadow-md)',
              alignItems: 'center'
            }}>
              <div style={{ 
                flex: '1 1 400px', 
                height: '320px', 
                background: 'linear-gradient(135deg, var(--primary-mid) 0%, var(--primary) 100%)', 
                borderRadius: 'var(--radius)', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <img src="/images/kurumsal_premium.avif" alt="Kurumsal Satış" width="600" height="400" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} onError={(e) => { e.target.style.display = 'none'; }} />
                <div style={{ padding: '40px', textAlign: 'center', pointerEvents: 'none', zIndex: 1 }}>
                  <span style={{ fontSize: '72px', fontWeight: 900, color: 'oklch(100% 0 0 / 0.05)', display: 'block', lineHeight: 1, letterSpacing: '-0.05em' }}>KURUMSAL</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'oklch(100% 0 0 / 0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '10px', display: 'block' }}>İŞ BİRLİĞİ & TOPLU ALIM</span>
                </div>
              </div>
              <div style={{ flex: '1 1 300px' }}>
                <div style={{ 
                  width: '64px', height: '64px', 
                  borderRadius: '16px', 
                  background: 'var(--primary-pale)', 
                  color: 'var(--primary)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '32px'
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text)', marginBottom: '16px', letterSpacing: '-0.02em' }}>Eğitim Kurumları</h3>
                <p style={{ fontSize: '18px', color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '32px' }}>
                  Okullar ve kurs merkezleri için toplu alım avantajları ve özel iskonto seçenekleri sunuyoruz.
                </p>
                <motion.a 
                  href="/iletisim"
                  whileHover={{ scale: 1.02, background: 'var(--primary-pale)' }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '16px 32px',
                    background: 'transparent', color: 'var(--text)',
                    border: '2px solid var(--primary)',
                    borderRadius: 'var(--radius-btn-pill)',
                    fontWeight: 800, fontSize: '15px', textDecoration: 'none',
                    transition: 'all 0.3s var(--ease-quint)'
                  }}
                >
                  Kurumsal İletişim <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* NEDEN TASARI - Split Screen Redesign */}
      <section className="why-tasari-section">
        {/* Parallax Background Shape - Disabled for performance */}
        {/* <motion.div style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(var(--primary-rgb), 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          y: yParallax
        }} /> */}

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="why-tasari-grid">
            <motion.div 
              className="why-tasari-left"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="why-tasari-tag">Neden Tasarı?</span>
              <h2 className="why-tasari-title">
                40 Yıllık<br/>Güven ve Deneyim
              </h2>
              <p className="why-tasari-subtext">
                1984'ten bugüne, sınav hazırlıklarında Türkiye'nin en köklü ve güvenilir eğitim kurumu olarak binlerce öğrencinin başarı hikayesine ortak oluyoruz.
              </p>
            </motion.div>

            <div className="why-tasari-right">
              {[
                { 
                  title: "14 DGS Türkiye 1.si", 
                  desc: "Son 23 yılda 14 Türkiye birincisi çıkaran tek kurum olma unvanını gururla taşıyoruz. Başarı tesadüf değildir.", 
                  number: "01",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                      <path d="M4 22h16"></path>
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34"></path>
                      <path d="M12 2a7 7 0 0 0-7 7c0 3.18 2.12 5.86 5 6.71V2h2z"></path>
                    </svg>
                  )
                },
                { 
                  title: "Uzman Kadro", 
                  desc: "Her branşta uzmanlaşmış, deneyimli öğretmenlerden oluşan Türkiye'nin en güçlü akademik kadrosu.", 
                  number: "02",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5-10 5z"></path>
                      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                    </svg>
                  )
                },
                { 
                  title: "Sınav Odaklılık", 
                  desc: "Sadece güncel müfredata değil, aynı zamanda ÖSYM'nin yeni nesil soru mantığına tam uyumlu materyaller.", 
                  number: "03",
                  icon: (
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <circle cx="12" cy="12" r="6"></circle>
                      <circle cx="12" cy="12" r="2"></circle>
                    </svg>
                  )
                }
              ].map((item, idx) => (
                <motion.div 
                  key={idx}
                  className="why-card"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="why-card-number">{item.number}</div>
                  <div className="why-card-icon-container">
                    {item.icon}
                  </div>
                  <div className="why-card-content">
                    <h3 className="why-card-title">{item.title}</h3>
                    <p className="why-card-desc">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP FLOAT */}
      <motion.a 
        href="https://api.whatsapp.com/send?phone=905327628560&text=Merhaba" 
        target="_blank" 
        aria-label="WhatsApp"
        whileHover={{ scale: 1.1, backgroundColor: '#128C7E' }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          background: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 24px rgba(37, 211, 102, 0.3)',
          zIndex: 100
        }}
      >
        <svg viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="white" />
        </svg>
      </motion.a>
    </div>
  );
}
