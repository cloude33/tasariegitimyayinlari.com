'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import LoginForm from './_components/LoginForm';
import ItemForm from './_components/ItemForm';
import ItemsList from './_components/ItemsList';
import ToastStack from './_components/ToastStack';
import ConfirmDialog from './_components/ConfirmDialog';
import ChangePasswordModal from './_components/ChangePasswordModal';
import styles from './_components/admin.module.css';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [selectedSlug, setSelectedSlug] = useState('');
  const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [showPwdModal, setShowPwdModal] = useState(false);

  const [editing, setEditing] = useState(null);

  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  const [confirm, setConfirm] = useState(null);

  const notify = useCallback((t) => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, duration: 3500, ...t }]);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/solutions');
      if (res.status === 401) {
        setIsLoggedIn(false);
        return null;
      }
      if (!res.ok) throw new Error('Veri yüklenemedi');
      const d = await res.json();
      const keys = Object.keys(d);
      if (keys.length > 0) {
        setSelectedSlug((prev) => prev || keys[0]);
      }
      return d;
    } catch (err) {
      notify({ type: 'error', title: 'Hata', message: err.message });
      return null;
    }
  }, [notify]);

  useEffect(() => {
    (async () => {
      const d = await fetchData();
      if (d) {
        setData(d);
        setIsLoggedIn(true);
      }
      setAuthChecked(true);
    })();
  }, [fetchData]);

  const handleLoginSuccess = useCallback(async () => {
    const d = await fetchData();
    if (d) {
      setData(d);
      setIsLoggedIn(true);
    } else {
      notify({ type: 'error', title: 'Hata', message: 'Veriler yüklenemedi.' });
    }
  }, [fetchData, notify]);

  const handleLogout = useCallback(async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch {
      // yoksay
    }
    setIsLoggedIn(false);
    setData(null);
    setSelectedSlug('');
    setSelectedSectionIdx(0);
    setEditing(null);
    notify({ type: 'info', title: 'Çıkış yapıldı', message: 'Güle güle.' });
  }, [notify]);

  const persist = useCallback(async (updated, successMsg) => {
    const res = await fetch('/api/solutions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'İşlem başarısız');
    }
    setData(updated);
    if (successMsg) notify({ type: 'success', ...successMsg });
  }, [notify]);

  const handleSaveItem = useCallback(async (item, newSectionName) => {
    if (!selectedSlug) return;
    setLoading(true);
    try {
      const updated = structuredClone(data);
      if (newSectionName) {
        const newSection = { name: newSectionName, items: [item] };
        updated[selectedSlug].sections.push(newSection);
        setSelectedSectionIdx(updated[selectedSlug].sections.length - 1);
      } else {
        const items = (updated[selectedSlug].sections[selectedSectionIdx].items ||= []);
        if (editing) {
          items[editing.idx] = item;
        } else {
          items.push(item);
        }
      }
      await persist(updated, {
        title: editing ? 'Güncellendi' : 'Eklendi',
        message: newSectionName ? `${newSectionName} › ${item.title}` : item.title,
      });
      setEditing(null);
    } catch (err) {
      notify({ type: 'error', title: editing ? 'Güncelleme hatası' : 'Kayıt hatası', message: err.message });
    } finally {
      setLoading(false);
    }
  }, [data, selectedSlug, selectedSectionIdx, editing, persist, notify]);

  const handleAskDelete = useCallback((idx, item) => {
    setConfirm({
      title: 'Öğeyi sil',
      message: `"${item.title}" kalıcı olarak silinecek. Bu işlem geri alınamaz.`,
      confirmLabel: 'Evet, sil',
      destructive: true,
      onConfirm: async () => {
        setLoading(true);
        try {
          const updated = structuredClone(data);
          updated[selectedSlug].sections[selectedSectionIdx].items.splice(idx, 1);
          await persist(updated, { title: 'Silindi', message: item.title });
          if (editing && editing.idx === idx) setEditing(null);
          setConfirm(null);
        } catch (err) {
          notify({ type: 'error', title: 'Silme hatası', message: err.message });
        } finally {
          setLoading(false);
        }
      },
    });
  }, [data, selectedSlug, selectedSectionIdx, editing, persist, notify]);

  const handleAskEdit = useCallback((idx, item) => {
    setEditing({ idx, item });
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditing(null);
  }, []);

  const handleMove = useCallback(async (from, to) => {
    if (to < 0) return;
    const list = data[selectedSlug].sections[selectedSectionIdx].items || [];
    if (to >= list.length) return;
    setLoading(true);
    try {
      const updated = structuredClone(data);
      const arr = updated[selectedSlug].sections[selectedSectionIdx].items;
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      await persist(updated, null);
    } catch (err) {
      notify({ type: 'error', title: 'Sıralama hatası', message: err.message });
    } finally {
      setLoading(false);
    }
  }, [data, selectedSlug, selectedSectionIdx, persist, notify]);

  if (!authChecked) {
    return (
      <div className={styles.centerLoad}>
        <span className={styles.spinner} aria-hidden="true" />
        <span>Yükleniyor...</span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <>
        <LoginForm onLogin={handleLoginSuccess} />
        <ToastStack toasts={toasts} onDismiss={dismissToast} />
      </>
    );
  }

  if (!data) {
    return (
      <div className={styles.centerLoad}>
        <span className={styles.spinner} aria-hidden="true" />
        <span>Veriler yükleniyor...</span>
      </div>
    );
  }

  const currentSection = data[selectedSlug]?.sections?.[selectedSectionIdx] || null;

  return (
    <div className={styles.shell}>
      <header className={styles.topbar}>
        <div className={`${styles.container} ${styles.topbarInner}`}>
          <div className={styles.brand}>
            <div className={styles.brandMark}>T</div>
            <div className={styles.brandText}>
              <h1>Admin Panel</h1>
              <p>İçerik yönetimi</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.btnSm}`}
              onClick={() => setShowPwdModal(true)}
            >
              Şifre Değiştir
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary} ${styles.btnSm}`}
              onClick={handleLogout}
            >
              Çıkış Yap
            </button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>Hoş geldiniz</h2>
            <p className={styles.pageSubtitle}>
              Sitedeki tüm PDF ve içerikleri buradan yönetin.
            </p>
          </div>

          <div className={styles.layout}>
            <ItemForm
              key={editing ? `edit-${selectedSlug}-${selectedSectionIdx}-${editing.idx}` : `new-${selectedSlug}-${selectedSectionIdx}`}
              data={data}
              selectedSlug={selectedSlug}
              onChangeSlug={(slug) => { setSelectedSlug(slug); setSelectedSectionIdx(0); setEditing(null); }}
              selectedSectionIdx={selectedSectionIdx}
              onChangeSectionIdx={(idx) => { setSelectedSectionIdx(idx); setEditing(null); }}
              onSave={handleSaveItem}
              editingItem={editing?.item || null}
              onCancelEdit={handleCancelEdit}
              loading={loading}
              onNotify={notify}
            />

            <ItemsList
              title={data[selectedSlug]?.title || ''}
              subtitle={currentSection?.name}
              items={currentSection?.items || []}
              onAskDelete={handleAskDelete}
              onAskEdit={handleAskEdit}
              onMove={handleMove}
              loading={loading}
              editingIdx={editing?.idx ?? null}
            />
          </div>
        </div>
      </main>

      <ConfirmDialog
        open={!!confirm}
        title={confirm?.title}
        message={confirm?.message}
        confirmLabel={confirm?.confirmLabel}
        destructive={confirm?.destructive}
        loading={loading}
        onConfirm={confirm?.onConfirm}
        onCancel={() => setConfirm(null)}
      />

      <ChangePasswordModal 
        open={showPwdModal} 
        onClose={() => setShowPwdModal(false)} 
        onNotify={notify} 
      />

      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
