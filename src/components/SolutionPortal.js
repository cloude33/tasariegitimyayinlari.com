"use client";
import { useState, useEffect } from 'react';
import solutionsData from '@/data/solutions.json';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function SolutionPortal({ slug, title: titleProp, badge: badgeProp, data: dataProp }) {
  const data = dataProp || solutionsData[slug];
  const [activeTab, setActiveTab] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!data) {
    return (
      <div className="container" style={{ padding: '100px 20px', textAlign: 'center' }}>
        <h1>İçerik Bulunamadı</h1>
        <p>İstediğiniz kategoriye ait veriler henüz sisteme tanımlanmamış.</p>
        <Link href="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Ana Sayfaya Dön</Link>
      </div>
    );
  }

  const title = titleProp || data.title || slug;
  const badge = badgeProp || '';
  const sections = data.sections || [];
  const hasTabs = data.hasTabs || false;

  const handlePdfView = async (e, link) => {
    if (!link.toLowerCase().endsWith('.pdf')) return;
    e.preventDefault();
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <html style="background: #0d1e36; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: sans-serif; color: white;">
          <body>
            <div style="text-align: center;">
              <h2 style="margin-bottom: 10px;">PDF Yükleniyor...</h2>
              <p style="opacity: 0.7;">Lütfen bekleyin, güvenli görüntüleyici hazırlanıyor.</p>
            </div>
          </body>
        </html>
      `);
    }
    try {
      const res = await fetch(`/api/pdf?file=${encodeURIComponent(link)}&bypassIdm=true`);
      if (!res.ok) throw new Error('API Hatası');
      const base64Text = await res.text();
      const binaryString = window.atob(base64Text);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const finalBlob = new Blob([bytes], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(finalBlob);
      if (newWindow) {
        newWindow.location.href = fileURL;
      } else {
        window.open(fileURL, '_blank');
      }
    } catch {
      if (newWindow) {
        newWindow.location.href = link;
      } else {
        window.open(link, '_blank');
      }
    }
  };

  if (!mounted) {
    return (
      <section className="page-hero" style={{ padding: '100px 0', background: 'var(--primary)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <div className="section-tag" style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>{badge}</div>
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', margin: '20px 0 10px' }}>{title}</h1>
        </div>
      </section>
    );
  }

  return (
    <div className="solution-portal">
      <section className="page-hero" style={{
        padding: '100px 0 60px',
        background: 'var(--primary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {badge && (
              <div className="section-tag" style={{
                display: 'inline-block', padding: '6px 14px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.5px'
              }}>{badge}</div>
            )}
            <h1 style={{ fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', margin: '20px 0 10px' }}>{title}</h1>
          </motion.div>
        </div>
      </section>

      {hasTabs && sections.length > 1 && (
        <section className="tab-navigation" style={{
          background: 'var(--bg-card)', borderBottom: '2px solid var(--border)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div className="container">
            <div className="tab-buttons" style={{ display: 'flex', maxWidth: '600px', margin: '0 auto' }}>
              {sections.map((section, idx) => (
                <button key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
                  style={{
                    flex: 1, padding: '22px 10px', background: 'transparent',
                    border: 'none', fontSize: '14px', fontWeight: 800,
                    color: activeTab === idx ? 'var(--primary)' : 'var(--text-dim)',
                    cursor: 'pointer', borderBottom: activeTab === idx ? '3px solid var(--accent)' : '3px solid transparent',
                    marginBottom: '-2px', letterSpacing: '0.5px',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >{section.name}</button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="solutions-content" style={{ padding: '60px 0' }}>
        <div className="container">
          {hasTabs ? (
            <AnimatePresence mode="wait">
              <motion.div key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <ItemsGrid items={sections[activeTab]?.items || []} onPdfView={handlePdfView} slug={slug} />
              </motion.div>
            </AnimatePresence>
          ) : (
            sections.map((section, idx) => (
              <div key={idx} className="solution-section" style={{ marginBottom: '50px' }}>
                {sections.length > 1 && (
                  <div className="section-header" style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <h2 style={{ fontWeight: 800, fontSize: '20px', color: 'var(--primary)', letterSpacing: '0.5px' }}>
                      {section.name}
                    </h2>
                  </div>
                )}
                <ItemsGrid items={section.items || []} onPdfView={handlePdfView} slug={slug} />
              </div>
            ))
          )}

          {sections.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
              <p>Bu bölümde henüz içerik bulunmamaktadır.</p>
            </div>
          )}
        </div>
      </section>

      <style jsx>{`
        .solution-portal {
          background: var(--bg);
          min-height: 100vh;
        }
        @media (max-width: 768px) {
          .tab-buttons { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

function ItemsGrid({ items, onPdfView, slug }) {
  const imageItems = items.filter(item => item.image);
  const linkItems = items.filter(item => !item.image);

  return (
    <div className="items-grid-container">
      {imageItems.length > 0 && (
        <div className="card-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: linkItems.length > 0 ? '40px' : '0'
        }}>
          {imageItems.map((item, idx) => (
            <ItemCard key={idx} item={item} onPdfView={onPdfView} />
          ))}
        </div>
      )}

      {linkItems.length > 0 && (
        <div className="link-list" style={{ 
          display: 'grid', 
          gridTemplateColumns: slug === 'komple-paragraf-cozumleri' ? '1fr' : 'repeat(auto-fill, minmax(350px, 1fr))', 
          gap: '16px',
          maxWidth: slug === 'komple-paragraf-cozumleri' ? '800px' : 'none',
          margin: slug === 'komple-paragraf-cozumleri' ? '0 auto' : '0'
        }}>
          {linkItems.map((item, idx) => (
            <ItemLink key={idx} item={item} onPdfView={onPdfView} />
          ))}
        </div>
      )}
    </div>
  );
}

function ItemCard({ item, onPdfView }) {
  const isPdf = item.link && item.link.toLowerCase().endsWith('.pdf');
  const isExternal = item.link && item.link.startsWith('http');
  const isDetail = item.link && item.link.startsWith('/cozumler/');

  return (
    <motion.div 
      whileHover={{ y: -8 }} 
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={isPdf ? '#' : item.link}
        onClick={isPdf ? (e) => { onPdfView(e, item.link); } : undefined}
        target={isExternal ? '_blank' : undefined}
        className="solution-card"
        style={{
          display: 'block',
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          textDecoration: 'none',
          color: 'inherit',
          boxShadow: 'var(--shadow-sm)',
          border: '1px solid var(--border)',
          transition: 'all 0.4s var(--ease-quint)',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          e.currentTarget.style.borderColor = 'var(--border-strong)';
          const img = e.currentTarget.querySelector('.book-cover-img');
          if (img) img.style.transform = 'scale(1.05) translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
          e.currentTarget.style.borderColor = 'var(--border)';
          const img = e.currentTarget.querySelector('.book-cover-img');
          if (img) img.style.transform = 'scale(1) translateY(0)';
        }}
      >
        {item.isNew && (
          <div style={{
            position: 'absolute', top: '12px', right: '12px',
            background: 'oklch(58% 0.18 20)', color: 'white',
            padding: '4px 10px', borderRadius: '8px',
            fontSize: '11px', fontWeight: 800, zIndex: 2,
            letterSpacing: '0.5px'
          }}>YENİ</div>
        )}
        {item.image && (
          <div className="card-image-wrapper" style={{
            position: 'relative',
            width: '100%',
            paddingTop: '130%',
            background: 'var(--bg-secondary, #f8f9fa)',
            borderBottom: '1.5px solid var(--border)',
            overflow: 'hidden'
          }}>
            <img
              src={item.image}
              alt={item.title}
              className="book-cover-img"
              style={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%', 
                height: '100%', 
                objectFit: 'contain',
                padding: '15px',
                transition: 'transform 0.4s var(--ease-quint)'
              }}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        <div className="card-body" style={{ padding: '16px', display: 'flex', flexDirection: 'column', flexGrow: 1, minHeight: '120px' }}>
          <h3 style={{
            fontSize: '15px', fontWeight: 700,
            color: 'var(--text-primary)',
            margin: '0 0 12px 0', lineHeight: '1.4',
            display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
          }}>{item.title}</h3>
          
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {item.info && (
              <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>{item.info}</span>
            )}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              background: isPdf ? 'rgba(220, 53, 69, 0.1)' : 'rgba(25, 71, 80, 0.1)',
              color: isPdf ? '#dc3545' : 'var(--text-primary)',
              transition: 'all 0.2s'
            }}
            className="card-action-btn"
            >
              {isPdf ? 'PDF Görüntüle' : 'Çözümleri Aç'}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ItemLink({ item, onPdfView }) {
  const isPdf = item.link && item.link.toLowerCase().endsWith('.pdf');
  const isExternal = item.link && item.link.startsWith('http');

  return (
    <motion.div whileHover={{ x: 4 }} transition={{ type: 'spring', stiffness: 300 }}>
      <a
        href={isPdf ? '#' : item.link}
        onClick={isPdf ? (e) => { onPdfView(e, item.link); } : undefined}
        target={isExternal ? '_blank' : undefined}
        className="solution-link-item"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px 20px',
          background: 'var(--bg-card)',
          borderRadius: '16px',
          textDecoration: 'none',
          color: 'inherit',
          border: '1px solid var(--border)',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          gap: '16px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'var(--bg-glass)';
          e.currentTarget.style.borderColor = 'var(--border-strong)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'var(--bg-card)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
      >
        <div style={{
          width: '40px', height: '40px',
          background: 'var(--primary-pale)',
          color: 'var(--primary)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {isPdf ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
            {item.title}
          </div>
          {item.info && (
            <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '2px' }}>{item.info}</div>
          )}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-dim)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </a>
    </motion.div>
  );
}
