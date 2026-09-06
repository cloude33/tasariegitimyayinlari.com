"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';

const branches = [
  {
    title: 'DGS',
    fullTitle: 'DGS Yayınları',
    desc: 'Son 23 yılda 14 Türkiye birincisi. DGS\'de liderliğimizi yayınlarımızla pekiştiriyoruz.',
    link: '/yayinlar#dgs',
    image: '/images/branches/dgs.avif',
    number: '01',
    tag: 'Dikey Geçiş',
  },
  {
    title: 'YÖS',
    fullTitle: 'YÖS Yayınları',
    desc: 'Uluslararası öğrenci sınavında Türkiye\'nin en güçlü içerik kadrosu.',
    link: '/yayinlar#yos',
    image: '/images/branches/yos.avif',
    number: '02',
    tag: 'Yabancı Uyruklu',
  },
  {
    title: 'ALES',
    fullTitle: 'ALES Yayınları',
    desc: 'Türkiye\'nin ilk ALES kursu. 1997\'den bu yana öncü.',
    link: '/yayinlar#ales',
    image: '/images/branches/ales.avif',
    number: '03',
    tag: 'Lisansüstü',
  },
  {
    title: 'KPSS',
    fullTitle: 'KPSS Yayınları',
    desc: 'Kamu personel seçme sınavında kapsamlı kaynak ve soru bankaları.',
    link: '/yayinlar#kpss',
    image: '/images/branches/kpss.avif',
    number: '04',
    tag: 'Kamu Personeli',
  },
  {
    title: 'TYT-AYT',
    fullTitle: 'TYT-AYT Yayınları',
    desc: 'Üniversite sınavına hazırlık için güncel müfredata uygun yayın setleri.',
    link: '/yayinlar#tyt',
    image: '/images/branches/tyt.avif',
    number: '05',
    tag: 'Üniversite Hazırlık',
  },
  {
    title: 'SPK',
    fullTitle: 'SPK Yayınları',
    desc: 'Sermaye piyasası lisanslama sınavlarına özel kaynak ve test kitapları.',
    link: '/yayinlar#spk',
    image: '/images/branches/spk.avif',
    number: '06',
    tag: 'Finans',
  },
];

export default function BranchCards() {
  return (
    <section style={{ padding: 'clamp(64px, 8vw, 120px) 0', background: 'var(--bg)' }}>
      <div className="container">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(40px, 6vw, 72px)' }}
        >
          <div className="section-eyebrow">Sınav Branşları</div>
          <h2 style={{
            fontSize: 'clamp(28px, 4.5vw, 52px)',
            fontWeight: 800,
            color: 'var(--text)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: '600px',
          }}>
            Hangi Sınava<br />Hazırlanıyorsunuz?
          </h2>
        </motion.div>

        {/* 2-column grid — her satırda 2 kart (Mobilde tek sütun) */}
        <div className="branch-grid">
          {branches.map((branch, idx) => (
            <motion.div
              key={branch.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5 }}
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                background: 'var(--bg-dark)',
                boxShadow: 'var(--shadow-md)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'box-shadow 0.35s var(--ease-quint)',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-xl)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
            >
              {/* --- Image area (üst ½) --- */}
              <div style={{
                position: 'relative',
                height: '220px',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                {/* Resim */}
                <div style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${branch.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.6s var(--ease-quint)',
                }} className={`branch-img-${idx}`} />

                {/* Altta soluk fade — içerik alanına geçiş */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: `linear-gradient(to top,
                    oklch(18% 0.04 245 / 0.85) 0%,
                    oklch(18% 0.04 245 / 0.30) 55%,
                    transparent 100%)`,
                }} />

                {/* Numara watermark */}
                <span style={{
                  position: 'absolute', top: '14px', right: '20px',
                  fontSize: '72px', fontWeight: 900,
                  color: 'oklch(100% 0 0 / 0.08)',
                  lineHeight: 1, letterSpacing: '-0.05em',
                  userSelect: 'none', pointerEvents: 'none',
                }}>
                  {branch.number}
                </span>

                {/* Tag pill — resmin sol alt köşesinde */}
                <span style={{
                  position: 'absolute', bottom: '14px', left: '20px',
                  display: 'inline-block',
                  background: 'var(--accent)',
                  color: 'oklch(12% 0.03 245)',
                  fontSize: '10px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '4px 12px', borderRadius: '99px',
                }}>
                  {branch.tag}
                </span>
              </div>

              {/* --- Text area (alt ½) --- */}
              <div style={{
                padding: '28px 32px 32px',
                display: 'flex', flexDirection: 'column',
                flex: 1,
                background: 'var(--bg-dark)',
              }}>
                <h3 style={{
                  fontSize: 'clamp(22px, 2.2vw, 30px)',
                  fontWeight: 800,
                  color: 'oklch(97% 0.004 245)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.1,
                  marginBottom: '12px',
                }}>
                  {branch.fullTitle}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'oklch(70% 0.012 245)',
                  lineHeight: 1.65,
                  marginBottom: '24px',
                  flex: 1,
                }}>
                  {branch.desc}
                </p>

                <Link href={branch.link} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  color: 'var(--accent)', fontSize: '14px', fontWeight: 700,
                  textDecoration: 'none', letterSpacing: '0.02em',
                  transition: 'gap 0.2s ease',
                  width: 'fit-content',
                }}
                  onMouseEnter={e => e.currentTarget.style.gap = '14px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '8px'}
                >
                  Detaylı İncele
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Hover zoom animasyonu için global stil */}
      <style>{`
        @media (hover: hover) {
          .branch-card:hover .branch-img { transform: scale(1.06); }
        }
        @media (max-width: 640px) {
          [data-branch-grid] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
