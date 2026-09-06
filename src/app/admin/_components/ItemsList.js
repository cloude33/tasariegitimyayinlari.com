'use client';
import styles from './admin.module.css';

export default function ItemsList({
  title,
  subtitle,
  items,
  onAskDelete,
  onAskEdit,
  onMove,
  loading,
  editingIdx,
}) {
  return (
    <div className={styles.listCard}>
      <div className={styles.listHeader}>
        <div>
          <h3 className={styles.listTitle}>{title || 'Öğeler'}</h3>
          {subtitle && <p className={styles.listSubtitle}>{subtitle}</p>}
        </div>
        <span className={styles.count}>{items.length} öğe</span>
      </div>
      <div className={styles.listBody}>
        {items.length === 0 ? (
          <p className={styles.empty}>Henüz öğe eklenmemiş.</p>
        ) : (
          <ul className={styles.list}>
            {items.map((item, idx) => (
              <li
                key={item.title + idx}
                className={`${styles.listItem} ${editingIdx === idx ? styles.listItemEditing : ''}`}
              >
                <div className={styles.listItemContent}>
                  <span className={styles.listItemIdx}>{idx + 1}</span>
                  <div className={styles.listItemInfo}>
                    <strong className={styles.listItemTitle}>{item.title}</strong>
                    {item.description && (
                      <p className={styles.listItemDesc}>{item.description}</p>
                    )}
                  </div>
                </div>
                <div className={styles.listItemActions}>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                    onClick={() => onMove(idx, idx - 1)}
                    disabled={idx === 0 || loading}
                    title="Yukarı taşı"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                    onClick={() => onMove(idx, idx + 1)}
                    disabled={idx === items.length - 1 || loading}
                    title="Aşağı taşı"
                  >
                    ↓
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
                    onClick={() => onAskEdit(idx, item)}
                    disabled={loading}
                    title="Düzenle"
                  >
                    ✏
                  </button>
                  <button
                    type="button"
                    className={`${styles.btn} ${styles.btnDanger} ${styles.btnSm}`}
                    onClick={() => onAskDelete(idx, item)}
                    disabled={loading}
                    title="Sil"
                  >
                    🗑
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
