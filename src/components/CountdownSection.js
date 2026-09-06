"use client";
import { useState, useEffect } from 'react';
export default function CountdownSection() {
  const allExams = [
    { "id": 1, "name": "TR-YÖS/1", "date": "2026-05-17T10:00:00", "info": "Yabancı Uyruklu Öğrenci Sınavı", "color": "#194750" },
    { "id": 7, "name": "YKS (TYT)", "date": "2026-06-20T10:15:00", "info": "YKS 1. Oturum (Temel Yeterlilik)", "color": "#ef4444" },
    { "id": 8, "name": "YKS (AYT)", "date": "2026-06-21T10:15:00", "info": "YKS 2. Oturum (Alan Yeterlilik)", "color": "#8b5cf6" },
    { "id": 9, "name": "YKS (YDT)", "date": "2026-06-21T15:45:00", "info": "YKS 3. Oturum (Yabancı Dil)", "color": "#3b82f6" },
    { "id": 2, "name": "DGS", "date": "2026-07-19T10:15:00", "info": "Dikey Geçiş Sınavı", "color": "#cd7e3b" },
    { "id": 3, "name": "ALES-2", "date": "2026-07-26T10:15:00", "info": "Akademik Personel Sınavı", "color": "#10b981" },
    { "id": 4, "name": "KPSS Lisans", "date": "2026-09-06T10:15:00", "info": "Kamu Personeli Seçme Sınavı", "color": "#06b6d4" },
    { "id": 5, "name": "KPSS Alan", "date": "2026-09-13T10:15:00", "info": "KPSS Alan Bilgisi Sınavı", "color": "#0ea5e9" },
    { "id": 6, "name": "ALES-3", "date": "2026-11-22T10:15:00", "info": "Akademik Personel Sınavı", "color": "#ec4899" }
  ];

  const [exams, setExams] = useState([]);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      
      const upcomingExams = allExams
        .map(exam => {
          const examDate = new Date(exam.date);
          const diff = examDate - now;
          
          if (diff < 0) return null;

          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / 1000 / 60) % 60);

          return { ...exam, days, hours, minutes, diff };
        })
        .filter(Boolean)
        .sort((a, b) => a.diff - b.diff);

      setExams(upcomingExams);
    };

    calculateTime();
    const timer = setInterval(calculateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  if (exams.length === 0) return null;

  return (
    <section className="countdown-section section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">SINAV TAKVİMİ</div>
          <h2>Yaklaşan Sınavlar İçin Geri Sayım</h2>
          <p>Hayallerinize giden yolda kalan süreyi takip edin.</p>
        </div>

        <div className="countdown-grid" style={{
          display:'grid', 
          gridTemplateColumns:'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', 
          gap:'15px', 
          marginTop:'40px'
        }}>
          {exams.map((exam, idx) => {
            // Renkleri garanti altına al
            const examColors = {
              'TR-YÖS': '#194750',
              'DGS': '#cd7e3b',
              'ALES': '#10b981',
              'KPSS': '#06b6d4',
              'YKS': '#ef4444',
              'TYT': '#ef4444',
              'AYT': '#8b5cf6'
            };
            
            const baseColor = exam.color || Object.entries(examColors).find(([key]) => exam.name.includes(key))?.[1] || '#194750';

            return (
              <div key={exam.id} className="countdown-card fade-in card" style={{
                animationDelay:`${idx * 0.1}s`, 
                padding: '0'
              }}>
                {/* Full Width Colored Header */}
                <div style={{
                  background: baseColor,
                  padding:'30px 15px 20px',
                  position:'relative',
                  width:'100%',
                  margin:0
                }}>
                  <div style={{
                    position:'absolute', 
                    top:'10px', 
                    right:'15px', 
                    fontSize:'9px', 
                    fontWeight:800, 
                    color:'#fff', 
                    background:'rgba(255,255,255,0.2)', 
                    padding:'3px 8px', 
                    borderRadius:'100px'
                  }}>2026</div>

                  <h3 style={{fontSize:'22px', fontWeight:900, color:'#fff', margin:0, letterSpacing:'-0.5px'}}>{exam.name}</h3>
                </div>

                {/* Bottom Content Area */}
                <div style={{padding:'20px 15px 25px', flexGrow:1, background:'var(--bg-card)', display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <p style={{fontSize:'12px', color:'var(--text-dim)', marginBottom:'15px', fontWeight:600, minHeight:'32px', display:'flex', alignItems:'center', justifyContent:'center'}}>{exam.info}</p>
                  
                  {/* Precisely Aligned Timer */}
                  <div style={{display:'flex', justifyContent:'center', alignItems:'baseline', gap:'4px', marginBottom:'20px'}}>
                    <div style={{minWidth:'58px'}}>
                      <div style={{fontSize:'30px', fontWeight:900, color:'var(--text)', lineHeight:1}}>{exam.days}</div>
                      <div style={{fontSize:'8px', fontWeight:800, color: baseColor, marginTop:'6px', letterSpacing:'1px'}}>GÜN</div>
                    </div>
                    <div style={{fontSize:'20px', fontWeight:900, color:'var(--text-dim)', position:'relative', top:'-4px'}}>:</div>
                    <div style={{minWidth:'58px'}}>
                      <div style={{fontSize:'30px', fontWeight:900, color:'var(--text)', lineHeight:1}}>{exam.hours}</div>
                      <div style={{fontSize:'8px', fontWeight:800, color: baseColor, marginTop:'6px', letterSpacing:'1px'}}>SAAT</div>
                    </div>
                    <div style={{fontSize:'20px', fontWeight:900, color:'var(--text-dim)', position:'relative', top:'-4px'}}>:</div>
                    <div style={{minWidth:'58px'}}>
                      <div style={{fontSize:'30px', fontWeight:900, color:'var(--text)', lineHeight:1}}>{exam.minutes}</div>
                      <div style={{fontSize:'8px', fontWeight:800, color: baseColor, marginTop:'6px', letterSpacing:'1px'}}>DAKİKA</div>
                    </div>
                  </div>

                  <div style={{
                    padding:'12px', 
                    background:'#ef4444', 
                    borderRadius:'12px', 
                    fontSize:'11px', 
                    fontWeight:800, 
                    color:'#ffffff',
                    textAlign:'center',
                    boxShadow:'0 4px 12px rgba(239, 68, 68, 0.2)'
                  }}>
                    Başarıya Giden Yolda Son Adımlar
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
