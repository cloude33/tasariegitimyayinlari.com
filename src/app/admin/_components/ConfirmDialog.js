'use client';
import { useEffect, useRef } from 'react';
import styles from './admin.module.css';

export default function ConfirmDialog({
  open,
  title = 'Emin misiniz?',
  message,
  confirmLabel = 'Onayla',
  cancelLabel = 'Vazgeç',
  destructive = false,
  loading = false,
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (open && confirmRef.current) {
      confirmRef.current.focus();
    }
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && !loading) onCancel();
      if (e.key === 'Enter' && !loading) onConfirm();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, loading, onCancel, onConfirm]);

  if (!open) return null;

  return (
    <div
      className={styles.dialogBackdrop}
      onClick={!loading ? onCancel : undefined}
    >
      <div
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-title" className={styles.dialogTitle}>
          {title}
        </h2>
        {message && <p className={styles.dialogMessage}>{message}</p>}
        <div className={styles.dialogActions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.btnSecondary}`}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmRef}
            className={`${styles.btn} ${destructive ? styles.btnDanger : styles.btnPrimary}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
