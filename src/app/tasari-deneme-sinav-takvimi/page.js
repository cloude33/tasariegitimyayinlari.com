'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const schedules = [
  {
    id: 'dgs-tg',
    title: "2026 DGS Türkiye Geneli Takvimi",
    sub: "Dikey Geçiş Sınavı · 15 Dev Deneme",
    icon: "🎓",
    color: "#e0f2fe",
    accent: "#0284c7",
    category: "DGS",
    pdf: "/dosyalar/2026%20T%C3%BCrkiye%20Geneli%20Deneme%20S%C4%B1nav%20Takvimi/DGS%20TG%20DENEME%20SINAVI%20TAKV%C4%B0M%C4%B0.pdf",
    exams: [
      { name: "TG - 1. Deneme", date: "28 Aralık 2025" },
      { name: "TG - 2. Deneme", date: "25 Ocak 2026" },
      { name: "TG - 3. Deneme", date: "22 Şubat 2026" },
      { name: "TG - 4. Deneme", date: "15 Mart 2026" },
      { name: "TG - 5. Deneme (İlk Prova)", date: "26 Nisan 2026" },
      { name: "TG - 6. Deneme", date: "10 Mayıs 2026" },
      { name: "TG - 7. Deneme", date: "23 Mayıs 2026" },
      { name: "TG - 8. Deneme", date: "6 Haziran 2026" },
      { name: "TG - 9. Deneme", date: "13 Haziran 2026" },
      { name: "TG - 10. Deneme (Orta Prova)", date: "20 Haziran 2026" },
      { name: "TG - 11. Deneme", date: "27 Haziran 2026" },
      { name: "TG - 12. Deneme", date: "28 Haziran 2026" },
      { name: "TG - 13. Deneme (Check up-1)", date: "4 Temmuz 2026" },
      { name: "TG - 14. Deneme (Check up-2)", date: "5 Temmuz 2026" },
      { name: "TG - 15. Deneme (Son Prova)", date: "11 Temmuz 2026" },
    ]
  },
  {
    id: 'dgs-ara',
    title: "2026 DGS Ara Denemeler",
    sub: "Dikey Geçiş Sınavı · Ara Dönem",
    icon: "📝",
    color: "#fef3c7",
    accent: "#d97706",
    category: "DGS",
    pdf: "/dosyalar/2026%20T%C3%BCrkiye%20Geneli%20Deneme%20S%C4%B1nav%20Takvimi/DGS%20ARA%20DENEMELER.pdf",
    exams: [
      { name: "Ara Deneme Sınavı - 1", date: "21 Aralık 2025" },
      { name: "Ara Deneme Sınavı - 2", date: "18 Ocak 2026" },
      { name: "Ara Deneme Sınavı - 3", date: "15 Şubat 2026" },
      { name: "Ara Deneme Sınavı - 4", date: "8 Mart 2026" },
      { name: "Ara Deneme Sınavı - 5", date: "19 Nisan 2026" },
    ]
  },
  {
    id: 'kpss-lisans',
    title: "2026 KPSS Lisans Takvimi",
    sub: "Genel Kültür · Genel Yetenek",
    icon: "🏛️",
    color: "#fce7f3",
    accent: "#db2777",
    category: "KPSS",
    pdf: "/dosyalar/2026%20T%C3%BCrkiye%20Geneli%20Deneme%20S%C4%B1nav%20Takvimi/KPSS%202026%20D%C3%96NEM%C4%B0%20L%C4%B0SANS.pdf",
    exams: [
      { name: "TG - 1. Deneme", date: "21 Aralık 2025" },
      { name: "TG - 2. Deneme", date: "18 Ocak 2026" },
      { name: "TG - 3. Deneme", date: "22 Şubat 2026" },
      { name: "TG - 4. Deneme", date: "14 Mart 2026" },
      { name: "TG - 5. Deneme", date: "25 Nisan 2026" },
      { name: "TG - 6. Deneme", date: "17 Mayıs 2026" },
      { name: "TG - 7. Deneme", date: "6 Haziran 2026" },
      { name: "TG - 8. Deneme", date: "14 Haziran 2026" },
      { name: "TG - 9. Deneme", date: "21 Haziran 2026" },
      { name: "TG - 10. Deneme", date: "28 Haziran 2026" },
    ]
  },
  {
    id: 'kpss-onlisans',
    title: "2026 KPSS Ortaöğretim - Ön Lisans",
    sub: "Genel Kültür · Genel Yetenek",
    icon: "📖",
    color: "#f0fdf4",
    accent: "#16a34a",
    category: "KPSS",
    pdf: "/dosyalar/2026%20T%C3%BCrkiye%20Geneli%20Deneme%20S%C4%B1nav%20Takvimi/KPSS%202026%20D%C3%96NEM%C4%B0%20orta%20%C3%B6%C4%9Fretim%20%C3%B6n%20lisans.pdf",
    exams: [
      { name: "TG - 1. Deneme", date: "21 Aralık 2025" },
      { name: "TG - 2. Deneme", date: "18 Ocak 2026" },
      { name: "TG - 3. Deneme", date: "22 Şubat 2026" },
      { name: "TG - 4. Deneme", date: "14 Mart 2026" },
      { name: "TG - 5. Deneme", date: "25 Nisan 2026" },
      { name: "TG - 6. Deneme", date: "17 Mayıs 2026" },
      { name: "TG - 7. Deneme", date: "6 Haziran 2026" },
      { name: "TG - 8. Deneme", date: "14 Haziran 2026" },
      { name: "TG - 9. Deneme", date: "21 Haziran 2026" },
      { name: "TG - 10. Deneme", date: "28 Haziran 2026" },
    ]
  },
  {
    id: 'meb-ags',
    title: "2026 MEB - AGS Sınav Takvimi",
    sub: "Milli Eğitim Bakanlığı · Akademi",
    icon: "🏫",
    color: "#eff6ff",
    accent: "#2563eb",
    category: "MEB",
    pdf: "/dosyalar/2026%20T%C3%BCrkiye%20Geneli%20Deneme%20S%C4%B1nav%20Takvimi/MEB%20-%20AGS%20SINAV.pdf",
    exams: [
      { name: "TG - 1. Deneme", date: "21 Aralık 2025" },
      { name: "TG - 2. Deneme", date: "18 Ocak 2026" },
      { name: "TG - 3. Deneme", date: "22 Şubat 2026" },
      { name: "TG - 4. Deneme", date: "14 Mart 2026" },
      { name: "TG - 5. Deneme", date: "25 Nisan 2026" },
      { name: "TG - 6. Deneme", date: "17 Mayıs 2026" },
      { name: "TG - 7. Deneme", date: "6 Haziran 2026" },
      { name: "TG - 8. Deneme", date: "14 Haziran 2026" },
      { name: "TG - 9. Deneme", date: "21 Haziran 2026" },
      { name: "TG - 10. Deneme", date: "28 Haziran 2026" },
    ]
  }
];

// Helper to convert Turkish month names to JS Date objects for sorting
const monthMap = {
  "Ocak": 0, "Şubat": 1, "Mart": 2, "Nisan": 3, "Mayıs": 4, "Haziran": 5,
  "Temmuz": 6, "Ağustos": 7, "Eylül": 8, "Ekim": 9, "Kasım": 10, "Aralık": 11
};

const parseDate = (dateStr) => {
  const parts = dateStr.split(' ');
  if (parts.length < 3) return new Date();
  const day = parseInt(parts[0]);
  const month = monthMap[parts[1]];
  const year = parseInt(parts[2]);
  return new Date(year, month, day);
};

// Strip time component for precise date matches
const stripTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

// Framer motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function SnavTakvimi() {
  // Use exact dynamic system date
  const todayRaw = new Date();
  const todayStripped = useMemo(() => stripTime(todayRaw), []);

  const [currentMonth, setCurrentMonth] = useState(new Date(todayRaw.getFullYear(), todayRaw.getMonth()));
  const [selectedDate, setSelectedDate] = useState(todayStripped);

  // Extract all exams and sort them by date
  const allExams = useMemo(() => {
    const exams = [];
    schedules.forEach(schedule => {
      schedule.exams.forEach(exam => {
        exams.push({
          ...exam,
          category: schedule.category,
          scheduleTitle: schedule.title,
          color: schedule.accent,
          dateObj: parseDate(exam.date)
        });
      });
    });
    return exams.sort((a, b) => a.dateObj - b.dateObj);
  }, []);

  // Filter exams for "Upcoming Dates" (Exams strictly whose dates are today or in the future)
  // PAST EXAMS ARE AUTOMATICALLY STRIPPED FROM THIS LIST
  const upcomingExams = useMemo(() => {
    return allExams.filter(ex => ex.dateObj >= todayStripped).slice(0, 5);
  }, [allExams, todayStripped]);

  // Find exams on the currently clicked calendar date
  const selectedDayExams = useMemo(() => {
    return allExams.filter(ex => ex.dateObj.toDateString() === selectedDate.toDateString());
  }, [allExams, selectedDate]);

  const monthNames = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));

  return (
    <div className="takvim-page" style={{background: 'var(--bg)', minHeight: '100vh'}}>
      {/* Premium Header */}
      <section className="calendar-hero" style={{
        backgroundImage: "url('/images/modern_study.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '70px 20px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="container" style={{position: 'relative', zIndex: 2}}>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="calendar-hero-card"
          >
            <span style={{
              background: '#FDCB08', 
              color: '#0d1e36', 
              padding: '6px 18px', 
              borderRadius: '100px', 
              fontSize: '11px', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              marginBottom: '16px', 
              display: 'inline-block', 
              letterSpacing: '0.8px'
            }}>
              Takvim
            </span>
            <h1 style={{
              fontSize: 'clamp(28px, 4vw, 38px)', 
              fontWeight: 900, 
              color: 'var(--text-dark)', 
              marginBottom: '12px',
              letterSpacing: '-0.5px'
            }}>
              Sınav Takvimi
            </h1>
            <p style={{
              fontSize: '1.05rem', 
              color: '#4b5563', 
              fontWeight: 600, 
              maxWidth: '560px', 
              margin: '0 auto',
              lineHeight: 1.5
            }}>
              Deneme sınavı tarihleri, resmi sınavlar ve önemli tarihlerin tamamı.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="calendar-section" style={{padding: '60px 0'}}>
        <div className="container">
          <div className="calendar-grid-layout">
            
            {/* Left: Upcoming Dates */}
            <div className="upcoming-dates">
              <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px'}}>
                <span style={{color: 'var(--accent)', fontSize: '22px'}}>🚩</span>
                <h3 style={{fontSize: '20px', fontWeight: 800, color: 'var(--primary)', margin: 0}}>Yaklaşan Sınavlar</h3>
              </div>

              <motion.div 
                className="upcoming-list" 
                style={{display: 'flex', flexDirection: 'column', gap: '16px'}}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {upcomingExams.length === 0 ? (
                  <div style={{padding: '30px', background: 'var(--bg-card)', borderRadius: '24px', textAlign: 'center', color: 'var(--text-dim)'}}>
                    Yaklaşan sınav bulunmamaktadır.
                  </div>
                ) : (
                  upcomingExams.map((ex, i) => {
                    const isTodayExam = ex.dateObj.getTime() === todayStripped.getTime();
                    
                    return (
                      <motion.div 
                        key={i} 
                        className="upcoming-card" 
                        variants={cardVariants}
                        whileHover={{ x: isTodayExam ? 0 : 6, scale: 1.01 }}
                        style={{
                          background: isTodayExam ? '#A83620' : 'var(--bg-card)', // TURURN GÜNÜ RED BG
                          color: isTodayExam ? '#FFF' : 'var(--text-dark)',
                          padding: '20px',
                          borderRadius: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          boxShadow: isTodayExam ? '0 15px 35px rgba(168, 54, 32, 0.35)' : '0 8px 30px rgba(25, 71, 80, 0.03)',
                          border: isTodayExam ? '1px solid #A83620' : '1px solid rgba(25, 71, 80, 0.05)',
                          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                        }}
                      >
                        <div style={{
                          width: '64px',
                          height: '64px',
                          borderRadius: '18px',
                          background: isTodayExam ? '#FFF' : ex.color,
                          color: isTodayExam ? '#A83620' : 'white',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          fontWeight: 800,
                          boxShadow: isTodayExam ? 'none' : `0 8px 20px ${ex.color}25`
                        }}>
                          <span style={{fontSize: '18px', fontWeight: 900}}>{ex.date.split(' ')[0]}</span>
                          <span style={{fontSize: '10px', fontWeight: 800, textTransform: 'uppercase'}}>{ex.date.split(' ')[1].substring(0, 3)}</span>
                        </div>
                        <div style={{flex: 1}}>
                          <span style={{fontSize: '11px', fontWeight: 800, color: isTodayExam ? 'rgba(255,255,255,0.9)' : ex.color, textTransform: 'uppercase', letterSpacing: '0.5px'}}>{ex.category}</span>
                          <h4 style={{fontSize: '15px', fontWeight: 800, color: isTodayExam ? '#FFF' : 'var(--primary)', margin: '2px 0'}}>{ex.name}</h4>
                          <div style={{display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: isTodayExam ? 'rgba(255,255,255,0.75)' : 'var(--text-dim)'}}>
                            <span>🕒</span> 10:00 {isTodayExam && <strong style={{marginLeft: '8px', background: 'rgba(255,255,255,0.2)', padding: '2px 8px', borderRadius: '4px', fontSize: '10px'}}>BUGÜN</strong>}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            </div>

            {/* Right: Calendar + Click Actions + Files */}
            <div className="calendar-column" style={{display: 'flex', flexDirection: 'column', gap: '30px'}}>
              <motion.div 
                className="calendar-card"
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="calendar-header" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '25px'}}>
                  <button onClick={handlePrevMonth} style={{background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--text-dim)', padding: '5px 12px'}}>❮</button>
                  <h3 style={{fontSize: '18px', fontWeight: 800, color: 'var(--primary)', margin: 0}}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                  <button onClick={handleNextMonth} style={{background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: 'var(--text-dim)', padding: '5px 12px'}}>❯</button>
                </div>

                <div className="calendar-legend" style={{display: 'flex', gap: '20px', marginBottom: '25px', fontSize: '12px', fontWeight: 700, borderBottom: '1px solid rgba(25, 71, 80, 0.05)', paddingBottom: '15px'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)'}}><span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#0284c7'}}></span> DGS</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)'}}><span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#db2777'}}></span> KPSS</div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)'}}><span style={{width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb'}}></span> MEB</div>
                </div>

                <div className="calendar-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', textAlign: 'center'}}>
                  {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map(day => (
                    <div key={day} style={{color: 'var(--text-dim)', fontSize: '12px', fontWeight: 700, padding: '5px 0'}}>{day}</div>
                  ))}
                  
                  {Array.from({ length: (firstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear()) + 6) % 7 }).map((_, i) => (
                    <div key={`empty-${i}`}></div>
                  ))}
                  
                  {Array.from({ length: daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear()) }).map((_, i) => {
                    const day = i + 1;
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    const hasExams = allExams.filter(ex => ex.dateObj.toDateString() === date.toDateString());
                    const isToday = date.toDateString() === todayStripped.toDateString();
                    const isSelected = date.toDateString() === selectedDate.toDateString();

                    return (
                      <div 
                        key={day} 
                        onClick={() => setSelectedDate(date)}
                        className={`calendar-day-cell ${isSelected ? 'selected' : ''}`}
                        style={{
                          padding: '12px 0',
                          borderRadius: '14px',
                          position: 'relative',
                          background: isSelected 
                            ? 'var(--accent)' 
                            : isToday 
                              ? 'rgba(25, 71, 80, 0.04)' 
                              : 'transparent',
                          border: isSelected 
                            ? '1px solid var(--accent)' 
                            : isToday 
                              ? '2px solid var(--primary)' 
                              : '1px solid transparent',
                          fontSize: '14px',
                          fontWeight: 700,
                          color: isSelected 
                            ? '#FFF' 
                            : isToday 
                              ? 'var(--primary)' 
                              : 'var(--text)',
                          minHeight: '44px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                          boxShadow: isSelected ? '0 6px 15px rgba(205, 126, 59, 0.35)' : 'none'
                        }}
                      >
                        {day}
                        {hasExams.length > 0 && (
                          <div style={{display: 'flex', gap: '3px', justifyContent: 'center', position: 'absolute', bottom: '6px', left: '0', right: '0'}}>
                            {hasExams.map((ex, idx) => (
                              <span key={idx} style={{width: '5px', height: '5px', borderRadius: '50%', background: isSelected ? '#FFF' : ex.color}}></span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Dynamic clicked day exam drawer */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={selectedDate.toDateString()}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'var(--bg-card)',
                    borderRadius: '24px',
                    padding: '30px',
                    border: '1px solid rgba(25, 71, 80, 0.04)',
                    boxShadow: '0 12px 35px rgba(25, 71, 80, 0.02)'
                  }}
                >
                  <h4 style={{fontSize: '15px', fontWeight: 800, color: 'var(--primary)', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '10px'}}>
                    <span style={{width: '4px', height: '18px', background: 'var(--accent)', borderRadius: '4px'}}></span>
                    📅 {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()} Sınav Programı
                  </h4>
                  
                  {selectedDayExams.length === 0 ? (
                    <div style={{textAlign: 'center', color: 'var(--text-dim)', fontSize: '14px', padding: '15px 0'}}>
                      Bu tarihte planlanmış deneme sınavı bulunmamaktadır.
                    </div>
                  ) : (
                    <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
                      {selectedDayExams.map((ex, idx) => (
                        <div key={idx} style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '14px 20px',
                          background: 'rgba(25, 71, 80, 0.02)',
                          borderRadius: '16px',
                          border: '1px solid rgba(25, 71, 80, 0.04)'
                        }}>
                          <div>
                            <span style={{fontSize: '11px', fontWeight: 800, color: ex.color, textTransform: 'uppercase', letterSpacing: '0.5px'}}>{ex.category}</span>
                            <h5 style={{fontSize: '14px', fontWeight: 800, color: 'var(--primary)', margin: '2px 0'}}>{ex.name}</h5>
                          </div>
                          <div style={{fontSize: '13px', fontWeight: 700, color: 'var(--text-dim)'}}>
                            🕒 10:00
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>
      </section>

      {/* PDF Files Section */}
      <section className="pdf-files-section" style={{
        padding: '80px 0', 
        background: 'var(--bg-card)',
        borderTop: '1px solid rgba(25, 71, 80, 0.05)',
        borderBottom: '1px solid rgba(25, 71, 80, 0.05)'
      }}>
        <div className="container">
          <motion.div 
            className="section-header" 
            style={{ textAlign: 'center', marginBottom: '50px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag" style={{ background: 'rgba(205, 126, 59, 0.08)', color: 'var(--accent)', display: 'inline-block' }}>Dosyalar</div>
            <h2 style={{ color: 'var(--primary)', fontSize: 'clamp(28px, 4vw, 36px)', marginTop: '15px', fontWeight: 800 }}>Sınav Takvimi Dosyaları (PDF)</h2>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px', maxWidth: '600px', margin: '15px auto 0' }}>
              DGS, KPSS ve MEB-AGS sınav takvimlerini PDF formatında bilgisayarınıza veya telefonunuza indirerek saklayabilirsiniz.
            </p>
          </motion.div>

          <motion.div 
            className="pdf-grid" 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {schedules.map(schedule => (
              <motion.div 
                key={schedule.id}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(13, 30, 54, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
              >
                <a 
                  href={schedule.pdf} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="pdf-link-item-modern" 
                  style={{
                    borderLeft: `6px solid ${schedule.accent}`
                  }}
                >
                  <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
                    <div style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '20px',
                      background: schedule.color,
                      color: schedule.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '26px',
                      flexShrink: 0,
                      boxShadow: `0 8px 20px ${schedule.accent}20`,
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }} className="pdf-icon-wrapper">
                      {schedule.icon}
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                      <span style={{
                        fontSize: '16px', 
                        fontWeight: 800, 
                        color: 'var(--primary)', 
                        lineHeight: 1.2
                      }}>
                        {schedule.title}
                      </span>
                      <span style={{
                        fontSize: '13px', 
                        color: 'var(--text-dim)', 
                        fontWeight: 600
                      }}>
                        {schedule.sub}
                      </span>
                    </div>
                  </div>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: schedule.accent,
                    boxShadow: '0 4px 12px rgba(13, 30, 54, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} className="pdf-download-btn">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  </div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{paddingBottom: '80px'}}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="calendar-cta-card"
          >
            <div style={{position: 'absolute', top: '-10%', right: '-5%', fontSize: '10rem', opacity: 0.08, pointerEvents: 'none'}}>📊</div>
            <h3 style={{fontSize: '28px', fontWeight: 800, marginBottom: '16px'}}>Sınav Sonuçlarını Sorgulayın</h3>
            <p style={{opacity: 0.8, maxWidth: '600px', margin: '0 auto 35px', fontSize: '16px', lineHeight: '1.65'}}>Deneme sınavı sonuçlarınızı ve detaylı analizlerinizi sorgulamak için tıklayın.</p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.a 
                href="http://sonuc.tasariegitim.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                whileHover={{ y: -4, boxShadow: '0 15px 35px rgba(205, 126, 59, 0.35)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'var(--accent)', 
                  padding: '18px 45px', 
                  borderRadius: '100px', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  fontSize: '15px', 
                  fontWeight: 800, 
                  color: 'white', 
                  textDecoration: 'none', 
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(205, 126, 59, 0.2)'
                }}
              >
                Sorgulama Sayfasına Git →
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Card Styling */
        .calendar-hero-card {
          background: var(--bg-glass);
          backdrop-filter: blur(20px);
          padding: 40px 60px;
          border-radius: 32px;
          display: inline-block;
          max-width: 720px;
          width: 100%;
          box-shadow: var(--shadow-lg);
          border: 1px solid var(--border);
        }

        /* Layout Grid */
        .calendar-grid-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
        }

        /* Calendar Card Styling */
        .calendar-card {
          background: var(--bg-card);
          border-radius: 32px;
          padding: 35px 40px;
          box-shadow: var(--shadow-md);
          position: relative;
          border: 1px solid var(--border);
          transition: transform 0.3s ease;
        }
        
        .calendar-day-cell:hover:not(.selected) {
          background: rgba(25, 71, 80, 0.08) !important;
          color: var(--primary) !important;
        }

        /* PDF Grid & Link styling */
        .pdf-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); 
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .pdf-link-item-modern {
          background: var(--bg-card);
          padding: 28px 30px;
          border-radius: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-decoration: none;
          color: var(--primary);
          border-top: 1px solid var(--border);
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          box-shadow: 0 8px 30px rgba(25, 71, 80, 0.01);
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        /* Modern hover effects replacing old overrides */
        .pdf-link-item-modern:hover {
          border-color: rgba(25, 71, 80, 0.1) !important;
          box-shadow: 0 15px 35px rgba(25, 71, 80, 0.08) !important;
        }
        .pdf-link-item-modern:hover .pdf-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }
        .pdf-link-item-modern:hover .pdf-download-btn {
          background: var(--primary) !important;
          color: #ffffff !important;
          transform: scale(1.1);
        }

        /* CTA Card Styling */
        .calendar-cta-card {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark, #0E292E) 100%);
          border-radius: 32px;
          padding: 70px 45px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
          box-shadow: 0 20px 45px rgba(25, 71, 80, 0.15);
        }

        /* Responsive Breakpoints */
        @media (max-width: 992px) {
          .calendar-grid-layout {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .calendar-hero-card {
            padding: 30px 25px;
            border-radius: 24px;
          }
        }

        @media (max-width: 576px) {
          .calendar-card {
            padding: 20px 15px;
            border-radius: 20px;
          }
          .pdf-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
          }
          .pdf-link-item-modern {
            padding: 20px 15px;
            border-radius: 20px;
          }
          .calendar-cta-card {
            padding: 40px 20px;
            border-radius: 24px;
          }
        }
      `}</style>
    </div>
  );
}
