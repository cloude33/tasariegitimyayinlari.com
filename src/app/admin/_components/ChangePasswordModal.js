'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './admin.module.css';

export default function ChangePasswordModal({ open, onClose, onNotify }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        if (!loading) onClose();
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose, loading]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!oldPassword || !newPassword || !newPasswordConfirm) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('Yeni şifre en az 6 karakter olmalıdır.');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setError('Yeni şifreler eşleşmiyor.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldPassword, newPassword }),
      });
      const result = await res.json();
      
      if (!res.ok) {
        setError(result.error || 'Şifre değiştirme başarısız.');
      } else {
        onNotify({ type: 'success', title: 'Başarılı', message: 'Şifreniz güncellendi.' });
        setOldPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
        onClose();
      }
    } catch (err) {
      setError('Sunucuya ulaşılamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} ref={modalRef}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Şifre Değiştir</h2>
          <button 
            type="button" 
            className={styles.modalClose} 
            onClick={onClose}
            disabled={loading}
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.modalBody}>
            <div className={styles.formGroup}>
              <label htmlFor="oldPwd" className={styles.label}>Mevcut Şifre</label>
              <input
                id="oldPwd"
                type="password"
                className={styles.input}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                disabled={loading}
                autoFocus
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="newPwd" className={styles.label}>Yeni Şifre</label>
              <input
                id="newPwd"
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="newPwdConf" className={styles.label}>Yeni Şifre (Tekrar)</label>
              <input
                id="newPwdConf"
                type="password"
                className={styles.input}
                value={newPasswordConfirm}
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                disabled={loading}
              />
            </div>

            {error && (
              <div role="alert" className={styles.alertError}>
                {error}
              </div>
            )}
          </div>
          
          <div className={styles.modalFooter}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={onClose}
              disabled={loading}
            >
              İptal
            </button>
            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary}`}
              disabled={loading}
            >
              {loading && <span className={styles.spinner} aria-hidden="true" style={{width: 16, height: 16, borderWidth: 2}} />}
              {loading ? 'Kaydediliyor...' : 'Şifreyi Güncelle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
