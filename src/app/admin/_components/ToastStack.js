'use client';
import { useEffect } from 'react';
import styles from './admin.module.css';

const VARIANTS = {
  success: styles.toastSuccess,
  error: styles.toastError,
  info: styles.toastInfo,
  warning: styles.toastWarning,
};

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ⓘ',
  warning: '!',
};

export default function ToastStack({ toasts, onDismiss }) {
  useEffect(() => {
    const timers = toasts.map((t) => {
      if (t.duration === Infinity) return null;
      return setTimeout(() => onDismiss(t.id), t.duration ?? 3500);
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [toasts, onDismiss]);

  return (
    <div className={styles.toastContainer} role="region" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`${styles.toast} ${VARIANTS[t.type] || ''}`}>
          <div aria-hidden="true" style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.2 }}>
            {ICONS[t.type] || '·'}
          </div>
          <div className={styles.toastBody}>
            {t.title && <p className={styles.toastTitle}>{t.title}</p>}
            {t.message && <p className={styles.toastMessage}>{t.message}</p>}
          </div>
          <button
            className={styles.toastClose}
            onClick={() => onDismiss(t.id)}
            aria-label="Bildirimi kapat"
            type="button"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
