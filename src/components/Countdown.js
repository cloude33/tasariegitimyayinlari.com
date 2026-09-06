"use client";
import { useState, useEffect } from 'react';

const exams = [
  { id: 'tyt', name: 'Temel Yeterlilik Testi', badge: 'TYT', date: '2026-06-20T10:15:00' },
  { id: 'ayt', name: 'Alan Yeterlilik Testleri', badge: 'AYT', date: '2026-06-21T10:15:00' },
  { id: 'dgs', name: 'Dikey Geçiş Sınavı', badge: 'DGS', date: '2026-07-19T10:15:00' },
  { id: 'ales', name: 'ALES/1', badge: 'ALES', date: '2026-05-10T10:15:00' },
  { id: 'kpss', name: 'Kamu Personeli Seçme Sınavı', badge: 'KPSS', date: '2026-09-06T10:15:00' },
];

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const newTimeLeft = {};

      exams.forEach(exam => {
        const target = new Date(exam.date).getTime();
        const diff = target - now;

        if (diff > 0) {
          newTimeLeft[exam.id] = {
            d: Math.floor(diff / (1000 * 60 * 60 * 24)),
            h: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            m: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
            s: Math.floor((diff % (1000 * 60)) / 1000),
          };
        } else {
          newTimeLeft[exam.id] = { d: 0, h: 0, m: 0, s: 0 };
        }
      });

      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section exam-countdown-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">Sınavlara Kaç Gün Kaldı?</div>
          <h2>Yaklaşan Sınavlar İçin Geri Sayım</h2>
          <p>Hedeflerinize ulaşmak için her anınızı değerlendirin</p>
        </div>
        <div className="countdown-grid">
          {exams.map(exam => {
            const time = timeLeft[exam.id] || { d: '--', h: '--', m: '--', s: '--' };
            return (
              <div key={exam.id} className="countdown-card">
                <div className="countdown-badge" data-exam={exam.id}>{exam.badge}</div>
                <div className="countdown-exam-name">{exam.name}</div>
                <div className="countdown-date">{new Date(exam.date).toLocaleDateString('tr-TR', { day:'numeric', month:'long', year:'numeric' })}</div>
                <div className="countdown-timer">
                  <div className="countdown-unit"><span className="countdown-value days">{time.d}</span><span className="countdown-label">Gün</span></div>
                  <div className="countdown-unit"><span className="countdown-value">{time.h}</span><span className="countdown-label">Saat</span></div>
                  <div className="countdown-unit"><span className="countdown-value">{time.m}</span><span className="countdown-label">Dakika</span></div>
                  <div className="countdown-unit"><span className="countdown-value">{time.s}</span><span className="countdown-label">Saniye</span></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
