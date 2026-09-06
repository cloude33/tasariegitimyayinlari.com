'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LgsLanding() {
  const [activeTab, setActiveTab] = useState('guncel');

  return (
    <div className="lgs-landing-wrapper">
      <div className="lgs-landing-header">
        <h1 className="lgs-landing-title">2025 - LGS DENEME SINAVI ÇÖZÜMLERİ</h1>
        
        <div className="lgs-landing-tabs">
          <button 
            className={`lgs-tab ${activeTab === 'guncel' ? 'active' : ''}`}
            onClick={() => setActiveTab('guncel')}
          >
            GÜNCEL YAYINLAR
          </button>
          <button 
            className={`lgs-tab ${activeTab === 'eski' ? 'active' : ''}`}
            onClick={() => setActiveTab('eski')}
          >
            ESKİ YAYINLAR
          </button>
        </div>
      </div>

      <div className="lgs-landing-content">
        {activeTab === 'guncel' && (
          <div className="lgs-guncel-grid">
            
            {/* Tasari Soru Bankalari & Denemeler (Sol Blok) */}
            <div className="lgs-card-group group-tasari">
              <div className="lgs-group-header">
                <div className="lgs-group-icon">📘</div>
                <h2>TASARI EĞİTİM YAYINLARI</h2>
              </div>
              <div className="lgs-group-links">
                <Link href="/lgs-soru-bankasi-cozumleri" className="lgs-btn primary-btn">
                  SORU BANKALARI
                </Link>
                <Link href="/lgs-deneme-cozumleri" className="lgs-btn primary-btn">
                  DENEMELER
                </Link>
              </div>
            </div>

            {/* Mutlak Deger Soru Bankalari & Denemeler (Sag Blok) */}
            <div className="lgs-card-group group-mutlak">
              <div className="lgs-group-header">
                <div className="lgs-group-icon">📊</div>
                <h2>MUTLAK DEĞER YAYINLARI</h2>
              </div>
              <div className="lgs-group-links">
                <Link href="/mutlak-deger-lgs-soru-bankasi-cozumleri" className="lgs-btn secondary-btn">
                  SORU BANKALARI
                </Link>
                <Link href="/mutlak-deger-lgs-deneme-cozumleri" className="lgs-btn secondary-btn">
                  DENEMELER
                </Link>
              </div>
            </div>

          </div>
        )}

        {activeTab === 'eski' && (
          <div className="lgs-empty-state">
            <div className="lgs-empty-icon">⏳</div>
            <h2>Eski Yayınlar Çok Yakında</h2>
            <p>Eski yayınlarımıza ait çözümler yakında sisteme eklenecektir.</p>
          </div>
        )}
      </div>
    </div>
  );
}
