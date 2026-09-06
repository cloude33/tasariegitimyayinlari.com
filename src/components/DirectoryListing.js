"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

function toReadableTitle(pathStr) {
  if (!pathStr) return '';
  const parts = pathStr.split('/').filter(Boolean);
  const last = parts[parts.length - 1] || pathStr;
  
  const upperTokens = {
    dgs: 'DGS',
    ales: 'ALES',
    kpss: 'KPSS',
    lgs: 'LGS',
    yos: 'YÖS',
    ayt: 'AYT',
    tyt: 'TYT',
    tg: 'TG',
    kts: 'KTS',
    msu: 'MSÜ',
  };

  return last
    .split('-')
    .map(token => {
      const lower = token.toLowerCase();
      if (upperTokens[lower]) return upperTokens[lower];
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join(' ')
    .replace(/cozumleri/i, 'Çözümleri')
    .replace(/cozum/i, 'Çözüm')
    .replace(/sinav/i, 'Sınav')
    .replace(/sinavi/i, 'Sınavı')
    .replace(/yayinlari/i, 'Yayınları')
    .replace(/eski/i, 'Eski')
    .replace(/yayin/i, 'Yayın')
    .replace(/gunde/i, 'Günde')
    .replace(/muhtesem/i, 'Muhteşem')
    .replace(/soru/i, 'Soru')
    .replace(/bankasi/i, 'Bankası')
    .replace(/matematik/i, 'Matematik')
    .replace(/turkce/i, 'Türkçe')
    .replace(/sayisal/i, 'Sayısal')
    .replace(/sozel/i, 'Sözel')
    .trim();
}

// Disk dosya adını eski sitedeki görünümle aynı hale getirir:
// "2-soru-1-test.pdf" -> "2. SORU 1. TEST", "24-25-soru.pdf" -> "24-25. SORU"
function formatItemName(name, currentPath) {
  if (!name) return name;
  if (currentPath && currentPath.includes('tr-yos-genel-yetenek-cozumleri')) {
    const match = name.match(/deneme-(\d+)/i);
    if (match) return `YÖS IQ Deneme-${match[1]} Çözüm`;
  }
  let base = name.replace(/\.pdf$/i, '');
  
  if (currentPath && currentPath.includes('3dales-all-star')) {
    base = base.replace(/^[\d-]+/, '');
  }

  if (currentPath && currentPath.includes('yos-cozumlu-soru-cozumleri')) {
    base = base.replace(/^(\d+)-/, '$1\uE000 ');
  }

  const spaced = base
    .replace(/(\d)-(\d)/g, (m) => m.replace('-', '\uE000'))
    .replace(/-/g, ' ')
    .replace(/\uE000/g, '-');
    
  const upperTokens = ['dgs', 'ales', 'kpss', 'lgs', 'yos', 'ayt', 'tyt', 'tg', 'kts', 'msu', '3d'];
  
  let formatted = spaced.split(' ')
    .map(word => {
      if (!word) return '';
      if (upperTokens.includes(word.toLowerCase())) return word.toUpperCase();
      return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1).toLocaleLowerCase('tr-TR');
    })
    .join(' ');
    
  return formatted
    .replace(/(\d+)\s+Gun/gi, '$1. Gün')
    .replace(/(\d+)\s+Deneme/gi, '$1. Deneme')
    .replace(/Cozumler/gi, 'Çözümler')
    .replace(/Cozum/gi, 'Çözüm')
    .replace(/6li/gi, "6'lı")
    .replace(/7li/gi, "7'li")
    .replace(/5li/gi, "5'li")
    .replace(/4lu/gi, "4'lü")
    .replace(/3lu/gi, "3'lü");
}

export default function DirectoryListing({ initialPath, title: titleProp }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(initialPath);

  useEffect(() => {
    loadDirectory(currentPath);
  }, [currentPath]);

  const loadDirectory = async (path) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/files?path=${path}`);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Failed to load directory:', error);
    }
    setLoading(false);
  };

  const handlePathClick = (path) => {
    if (path.startsWith('/api/files')) {
      // Extract path from URL parameter
      const urlParams = new URLSearchParams(path.split('?')[1]);
      const newPath = urlParams.get('path');
      setCurrentPath(newPath);
    }
  };

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
        newWindow.location.href = `/api/pdf?file=${encodeURIComponent(link)}`;
      } else {
        window.open(`/api/pdf?file=${encodeURIComponent(link)}`, '_blank');
      }
    }
  };

  if (loading) return (
    <div className="container" style={{padding:'150px 0', textAlign:'center', fontSize:'1.2rem', color:'var(--text-dim)'}}>
      🔍 Dosyalar yükleniyor, lütfen bekleyiniz...
    </div>
  );

  if (!data) return (
    <div className="container" style={{padding:'150px 0', textAlign:'center'}}>
      <h2>⚠️ Dizin Bulunamadı</h2>
      <p>İstediğiniz dizine ulaşılamadı.</p>
      <Link href="/" className="btn btn-primary" style={{marginTop:'20px'}}>Ana Sayfaya Dön</Link>
    </div>
  );

  if (data.type === 'file') {
    // Redirect to file
    window.location.href = data.path;
    return null;
  }

  const initialSegments = initialPath.split('/').filter(Boolean);
  const currentSegments = currentPath.split('/').filter(Boolean);
  
  const breadcrumbItems = [];
  let pathAcc = [];
  
  currentSegments.forEach((segment, idx) => {
    pathAcc.push(segment);
    if (idx >= initialSegments.length - 1) {
      breadcrumbItems.push({
        name: toReadableTitle(segment),
        path: pathAcc.join('/')
      });
    }
  });

  const pageTitle = titleProp || toReadableTitle(currentPath);
  const lastBreadcrumbName = titleProp || breadcrumbItems[breadcrumbItems.length - 1]?.name;

  return (
    <div className="directory-listing-page">
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/cozumler">Çözümler</Link>
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;
            return (
              <span key={index}>
                <span>/</span>
                {isLast ? (
                  <span className="breadcrumb-active" style={{ color: 'var(--text-dim)', fontWeight: 600 }}>{lastBreadcrumbName}</span>
                ) : (
                  <button 
                    onClick={() => setCurrentPath(item.path)} 
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      color: 'var(--accent)',
                      font: 'inherit',
                      cursor: 'pointer',
                      textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                    onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                  >
                    {item.name}
                  </button>
                )}
              </span>
            );
          })}
        </div>
      </div>

      <section className="page-hero">
        <div className="container">
          <h1>{pageTitle}</h1>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="file-list">
            {data.items.map((item, index) => {
              const isFile = item.isFile;
              const displayName = formatItemName(item.name, currentPath);
              const Icon = isFile ? (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" strokeWidth="2"/>
                </svg>
              ) : (
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" strokeWidth="2"/>
                </svg>
              );

              return isFile ? (
                <a 
                  key={index} 
                  href={`/api/pdf?file=${encodeURIComponent(item.path)}`}
                  onClick={item.path.toLowerCase().endsWith('.pdf') ? (e) => handlePdfView(e, item.path) : undefined}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="file-card sol-card card-color-0 fade-in" 
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  <div className="icon-box">{Icon}</div>
                  <div className="sol-details">
                    <h4>{displayName}</h4>
                    <p>PDF Dosyası • {item.size ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : ''}</p>
                  </div>
                  <div className="sol-download">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              ) : (
                <div 
                  key={index} 
                  className="file-card sol-card card-color-1 fade-in cursor-pointer" 
                  style={{animationDelay: `${index * 0.05}s`}}
                  onClick={() => handlePathClick(item.path)}
                >
                  <div className="icon-box">{Icon}</div>
                  <div className="sol-details">
                    <h4>{displayName}</h4>
                    <p>Klasör</p>
                  </div>
                  <div className="sol-download">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

