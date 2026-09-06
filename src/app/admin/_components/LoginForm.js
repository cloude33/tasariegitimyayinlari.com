'use client';
import { useState } from 'react';
import styles from './admin.module.css';

export default function LoginForm({ onLogin }) {
  const [authData, setAuthData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(authData),
      });
      const result = await res.json();
      if (!res.ok) {
        if (res.status === 429) {
          setError('Çok fazla deneme. Lütfen biraz bekleyin.');
        } else {
          setError(result.message || 'Giriş başarısız.');
        }
        return;
      }
      onLogin();
    } catch {
      setError('Sunucuya ulaşılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={handleSubmit} noValidate>
        <div className={styles.loginLogo} aria-hidden="true">T</div>
        <h1 className={styles.loginTitle}>Admin Girişi</h1>
        <p className={styles.loginSubtitle}>Tasarı Eğitim Yayınları yönetim paneli</p>

        <div className={styles.formGroup}>
          <label htmlFor="username" className={styles.label}>Kullanıcı Adı</label>
          <input
            id="username"
            type="text"
            className={styles.input}
            value={authData.username}
            onChange={(e) => setAuthData({ ...authData, username: e.target.value })}
            required
            autoComplete="username"
            autoFocus
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Şifre</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            value={authData.password}
            onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
            required
            autoComplete="current-password"
            disabled={loading}
          />
        </div>

        {error && (
          <div
            role="alert"
            className={styles.alertError}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
          disabled={loading}
        >
          {loading && <span className={styles.spinner} aria-hidden="true" />}
          {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </div>
  );
}
