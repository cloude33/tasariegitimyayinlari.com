"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 20) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setActiveMobileSubmenu(null);
  };

  const toggleMobileSubmenu = (menu, e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveMobileSubmenu(activeMobileSubmenu === menu ? null : menu);
  };

  return (
    <>

      <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container header-inner">
          <Link href="/" className="header-logo" onClick={closeMenu}>
            <Image src="/images/logo2602.avif" alt="Tasarı Eğitim Yayınları" width={200} height={60} style={{ objectFit: 'contain' }} priority />
          </Link>

          {/* Mobile Toggle Button */}
          <button
            className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menüyü Aç/Kapat"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <ul>
              <li><Link href="/" onClick={closeMenu}>ANASAYFA</Link></li>
              <li><Link href="/yayinlar" onClick={closeMenu}>YAYINLAR</Link></li>

              <li className="has-dropdown">
                <div className="nav-item-wrapper">
                  <Link href="/kitap-deneme-cozumleri" onClick={closeMenu}>KİTAP/DENEME ÇÖZÜMLERİ</Link>
                  <button
                    className={`submenu-toggle-btn ${activeMobileSubmenu === 'cozumler' ? 'active' : ''}`}
                    onClick={(e) => toggleMobileSubmenu('cozumler', e)}
                    aria-label="Alt Menüyü Aç/Kapat"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                <div className={`dropdown ${activeMobileSubmenu === 'cozumler' ? 'mobile-show' : ''}`}>
                  <Link href="/dgs-deneme-sinav-cozumleri" onClick={closeMenu}>DGS Çözümleri</Link>
                  <Link href="/yos" onClick={closeMenu}>YÖS Çözümleri</Link>
                  <Link href="/ales" onClick={closeMenu}>ALES Çözümleri</Link>
                  <Link href="/kpss" onClick={closeMenu}>KPSS Çözümleri</Link>
                  <Link href="/ayt-tyt" onClick={closeMenu}>TYT-AYT Çözümleri</Link>
                  <Link href="/lgs" onClick={closeMenu}>LGS Çözümleri</Link>
                  <Link href="/meb-ags-cozumler" onClick={closeMenu}>MEB-AGS Çözümleri</Link>
                </div>
              </li>

              <li className="has-dropdown">
                <div className="nav-item-wrapper">
                  <Link href="/tg-deneme-cozumleri-bolumleri" onClick={closeMenu}>TG DENEME ÇÖZÜMLERİ</Link>
                  <button
                    className={`submenu-toggle-btn ${activeMobileSubmenu === 'tg' ? 'active' : ''}`}
                    onClick={(e) => toggleMobileSubmenu('tg', e)}
                    aria-label="Alt Menüyü Aç/Kapat"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                <div className={`dropdown ${activeMobileSubmenu === 'tg' ? 'mobile-show' : ''}`}>
                  <Link href="/tg-deneme-cozumleri" onClick={closeMenu}>TG DGS</Link>
                  <Link href="/tasari-yos-denemeleri" onClick={closeMenu}>TG YÖS</Link>
                  <Link href="/kpss-tg-cozumleri" onClick={closeMenu}>TG KPSS</Link>
                  <Link href="/ales-deneme-cozumleri" onClick={closeMenu}>TG ALES</Link>
                  <Link href="/meb-ags-deneme-sinav-cozumleri" onClick={closeMenu}>TG MEB-AGS</Link>
                  <Link href="/tyt-ayt-deneme-cozumleri" onClick={closeMenu}>TG TYT-AYT</Link>
                  <Link href="/kts-deneme-sinavi" onClick={closeMenu}>TG KTS</Link>
                  <Link href="/msu-cozumleri" onClick={closeMenu}>TG MSÜ</Link>
                </div>
              </li>

              <li><Link href="/tasari-deneme-sinav-takvimi" onClick={closeMenu}>SINAV TAKVİMİ</Link></li>
              <li><Link href="/hakkimizda" onClick={closeMenu}>HAKKIMIZDA</Link></li>
              <li><Link href="/iletisim" onClick={closeMenu}>İLETİŞİM</Link></li>

              <li className="nav-action-item" style={{ display: 'flex', alignItems: 'center', gap: '15px', flexShrink: 0 }}>


                <a href="https://kitap.tasariegitim.com" target="_blank" className="nav-cta-button" style={{ marginLeft: '10px' }}>
                  KİTAP SATIN AL
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
