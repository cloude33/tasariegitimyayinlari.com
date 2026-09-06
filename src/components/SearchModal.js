"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import solutionsData from '@/data/solutions.json';
import Link from 'next/link';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      // Small timeout to ensure transition finishes before focusing
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [isOpen]);

  // Handle Ctrl+K / Cmd+K to toggle modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // This relies on the parent handling the 'open' state,
          // but usually we dispatch a custom event or let the parent handle the hotkey.
          // For simplicity, we just handle Esc here.
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Search Logic
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    
    const searchStr = query.toLowerCase();
    const found = [];

    // Search through all categories
    Object.keys(solutionsData).forEach(categoryKey => {
      const category = solutionsData[categoryKey];
      if (category && category.items) {
        category.items.forEach(item => {
          if (
            (item.title && item.title.toLowerCase().includes(searchStr)) ||
            (categoryKey.toLowerCase().includes(searchStr)) ||
            (item.badge && item.badge.toLowerCase().includes(searchStr))
          ) {
            found.push({
              ...item,
              categoryLabel: categoryKey.toUpperCase(),
              slug: categoryKey
            });
          }
        });
      }
    });

    setResults(found);
  }, [query]);

  // PDF Viewer function (same logic as SolutionPortal)
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
    } catch (err) {
      if (newWindow) {
        newWindow.location.href = link;
      } else {
        window.open(link, '_blank');
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="search-modal-backdrop"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(13, 30, 54, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: '10vh'
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="search-modal-content"
            style={{
              position: 'fixed',
              top: '10vh',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '90%',
              maxWidth: '640px',
              background: 'var(--bg-card, #fff)',
              borderRadius: '24px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              zIndex: 10000,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '80vh',
              border: '1px solid var(--border-color, rgba(13, 30, 54, 0.1))'
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-color, rgba(13, 30, 54, 0.1))'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '16px', opacity: 0.7}}>
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kitap, deneme veya çözümü arayın..."
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  fontSize: '20px',
                  fontWeight: '600',
                  background: 'transparent',
                  color: 'var(--text-color, #0d1e36)',
                  width: '100%'
                }}
              />
              <button 
                onClick={onClose}
                style={{
                  background: 'var(--bg-hover, rgba(13, 30, 54, 0.05))',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  color: 'var(--text-dim)',
                  cursor: 'pointer'
                }}
              >
                ESC
              </button>
            </div>

            <div style={{
              overflowY: 'auto',
              padding: '16px',
              flex: 1
            }}>
              {query.trim().length > 0 && query.trim().length < 2 && (
                <div style={{padding: '20px', textAlign: 'center', color: 'var(--text-dim)'}}>
                  Aramak için en az 2 karakter yazın...
                </div>
              )}
              
              {query.trim().length >= 2 && results.length === 0 && (
                <div style={{padding: '40px 20px', textAlign: 'center', color: 'var(--text-dim)'}}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{margin: '0 auto 16px', opacity: 0.5}}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <p style={{fontSize: '16px', fontWeight: 500}}>"{query}" için sonuç bulunamadı.</p>
                </div>
              )}

              {results.length > 0 && (
                <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                  {results.map((item, idx) => {
                    const isPdf = item.link.toLowerCase().endsWith('.pdf');
                    return (
                      <a 
                        key={idx}
                        href={isPdf ? "#" : item.link}
                        onClick={isPdf ? (e) => { handlePdfView(e, item.link); onClose(); } : onClose}
                        target={!isPdf && item.link.startsWith('http') ? "_blank" : undefined}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '16px',
                          borderRadius: '16px',
                          background: 'var(--bg-card, #fff)',
                          textDecoration: 'none',
                          color: 'inherit',
                          border: '1px solid var(--border-color, rgba(13,30,54,0.05))',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-hover, rgba(13,30,54,0.03))';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--bg-card, #fff)';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{
                          width: '40px',
                          height: '40px',
                          background: 'var(--primary-light, rgba(25,71,80,0.1))',
                          color: 'var(--primary, #194750)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '16px',
                          flexShrink: 0
                        }}>
                          {isPdf ? (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                              <polyline points="14 2 14 8 20 8"></polyline>
                              <line x1="16" y1="13" x2="8" y2="13"></line>
                              <line x1="16" y1="17" x2="8" y2="17"></line>
                              <polyline points="10 9 9 9 8 9"></polyline>
                            </svg>
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          )}
                        </div>
                        <div style={{flex: 1}}>
                          <div style={{fontSize: '15px', fontWeight: 700, color: 'var(--text-color, #0d1e36)'}}>
                            {item.title}
                          </div>
                          <div style={{fontSize: '12px', color: 'var(--text-dim, #64748b)', marginTop: '4px', display: 'flex', gap: '8px'}}>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '4px',
                              fontWeight: 700,
                              background: 'var(--accent-glow)',
                              color: 'var(--accent)'
                            }}>
                              {item.categoryLabel}
                            </span>
                            {item.badge && (
                              <span style={{opacity: 0.8}}>{item.badge}</span>
                            )}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
