"use client";
import { useState } from 'react';
import Link from 'next/link';
import styles from './DgsSolutionsPage.module.css';

export default function DgsSolutionsPage() {
  const [activeTab, setActiveTab] = useState('yeniyayinlar');

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>
          DGS Yayın <span className={styles.heroAccent}>Çözümleri</span>
        </h1>
      </section>

      {/* Tabs + Content Card */}
      <section className={styles.mainSection}>
        <div className={styles.card}>
          {/* Tab Bar */}
          <div className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'yeniyayinlar' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('yeniyayinlar')}
              >
                GÜNCEL YAYINLAR
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'oncekiyayinlar' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('oncekiyayinlar')}
              >
                ESKİ YAYINLAR
              </button>
            </div>
          </div>

          {/* Panel */}
          <div className={styles.panel}>
            {activeTab === 'yeniyayinlar' && (
              <div className={styles.panelInner}>
                <div className={styles.bookIcon}>
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.actionButtons}>
                  <Link href="/dgs-soru-bankalari" className={styles.actionBtn}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    SORU BANKALARI
                  </Link>
                  <Link href="/dgs-denemeleri" className={styles.actionBtn}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="14 2 14 8 20 8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="16" y1="13" x2="8" y2="13" strokeWidth="2" strokeLinecap="round" />
                      <line x1="16" y1="17" x2="8" y2="17" strokeWidth="2" strokeLinecap="round" />
                      <polyline points="10 9 9 9 8 9" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    DENEMELER
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'oncekiyayinlar' && (
              <div className={styles.panelInner}>
                <div className={`${styles.bookIcon} ${styles.bookIconOld}`}>
                  <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className={styles.actionButtons}>
                  <Link href="/cozumler/dgs-eski-yayinlari" className={styles.actionBtn}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    DGS ESKİ YAYINLAR
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <section className={styles.contactBar}>
        <div className={styles.contactItem}>
          <div className={styles.contactIconWrap}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.86 12 19.79 19.79 0 0 1 1.77 3.38 2 2 0 0 1 3.76 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className={styles.contactLabel}>TELEFON</span>
            <span className={styles.contactValue}>0 (212) 570 10 82</span>
          </div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.contactIconWrap}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <polyline points="22,6 12,13 2,6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className={styles.contactLabel}>E-POSTA</span>
            <a href="mailto:satis@tasariegitimyayinlari.com" className={styles.contactLink}>satis@tasariegitimyayinlari.com</a>
          </div>
        </div>
        <div className={styles.contactItem}>
          <div className={styles.contactIconWrap}>
            <svg width="22" height="22" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <polyline points="12 6 12 12 16 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className={styles.contactLabel}>ÇALIŞMA SAATLERİ</span>
            <span className={styles.contactValue}>Hafta içi &amp; Hafta sonu 09:00 – 20:00</span>
          </div>
        </div>
      </section>
    </div>
  );
}
