'use client';
import { useState } from 'react';
import styles from './admin.module.css';

const MAX_FILE_BYTES = 50 * 1024 * 1024;
const MAX_IMG_BYTES = 10 * 1024 * 1024;

const TG_SLUGS = new Set([
  'tg-deneme-cozumleri',
  'tasari-yos-denemeleri',
  'kpss-tg-cozumleri',
  'ales-deneme-cozumleri',
  'meb-ags-deneme-sinav-cozumleri',
  'tyt-ayt-deneme-cozumleri',
  'kts-deneme-sinavi',
  'msu-cozumleri',
]);

const TG_ORDER = [
  'tg-deneme-cozumleri',
  'tasari-yos-denemeleri',
  'kpss-tg-cozumleri',
  'ales-deneme-cozumleri',
  'meb-ags-deneme-sinav-cozumleri',
  'tyt-ayt-deneme-cozumleri',
  'kts-deneme-sinavi',
  'msu-cozumleri',
];

const EMPTY_FORM = { title: '', info: '', link: '', image: '', isNew: true };
const NEW_SECTION_VALUE = '__new_section__';

export default function ItemForm({
  data,
  selectedSlug,
  onChangeSlug,
  selectedSectionIdx,
  onChangeSectionIdx,
  onSave,
  editingItem,
  onCancelEdit,
  loading,
  onNotify,
}) {
  const [form, setForm] = useState(() => editingItem
    ? {
        title: editingItem.title || '',
        info: editingItem.info || '',
        link: editingItem.link || '',
        image: editingItem.image || '',
        isNew: !!editingItem.isNew,
      }
    : EMPTY_FORM
  );
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [hasFile, setHasFile] = useState(false);
  const [imgStatus, setImgStatus] = useState(null);
  const [imgUploading, setImgUploading] = useState(false);
  const [imgError, setImgError] = useState(null);
  const [hasImage, setHasImage] = useState(false);
  const [isNewSection, setIsNewSection] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');

  const slugList = Object.keys(data);
  const tgList = TG_ORDER.filter((s) => slugList.includes(s));
  const otherList = slugList.filter((s) => !TG_SLUGS.has(s));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      onNotify({ type: 'error', title: 'Geçersiz dosya', message: 'Yalnızca PDF yüklenebilir.' });
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      onNotify({
        type: 'error',
        title: 'Dosya çok büyük',
        message: `Maksimum ${Math.round(MAX_FILE_BYTES / 1024 / 1024)} MB.`,
      });
      return;
    }

    setUploading(true);
    setUploadStatus(null);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slug', selectedSlug);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (!res.ok) {
        const msg = result.error || 'Bilinmeyen hata';
        setUploadError(msg);
        onNotify({ type: 'error', title: 'Yükleme hatası', message: msg });
        return;
      }
      setForm((prev) => ({
        ...prev,
        link: result.path,
        title: prev.title,
      }));
      setHasFile(true);
      setUploadStatus({
        fileName: result.fileName,
        renamed: result.renamed,
        path: result.path,
      });
      onNotify({
        type: result.renamed ? 'warning' : 'success',
        title: result.renamed ? 'Dosya yeniden adlandırıldı' : 'Dosya yüklendi',
        message: result.renamed
          ? `Aynı isimde dosya vardı, "${result.fileName}" olarak kaydedildi.`
          : 'Link otomatik dolduruldu. Başlığı manuel yazın.',
      });
    } catch (err) {
      const msg = 'Sunucuya ulaşılamadı.';
      setUploadError(msg);
      onNotify({ type: 'error', title: 'Yükleme hatası', message: msg });
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    if (file.size > MAX_IMG_BYTES) {
      onNotify({
        type: 'error',
        title: 'Görsel çok büyük',
        message: `Maksimum ${Math.round(MAX_IMG_BYTES / 1024 / 1024)} MB.`,
      });
      return;
    }
    setImgUploading(true);
    setImgStatus(null);
    setImgError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'images/uploads');
      const res = await fetch('/api/admin/image-upload', { method: 'POST', body: fd });
      const result = await res.json();
      if (!res.ok) {
        const msg = result.error || 'Bilinmeyen hata';
        setImgError(msg);
        onNotify({ type: 'error', title: 'Görsel yükleme hatası', message: msg });
        return;
      }
      setForm((prev) => ({ ...prev, image: result.path }));
      setHasImage(true);
      setImgStatus({ fileName: result.fileName, renamed: result.renamed, path: result.path });
      onNotify({
        type: result.renamed ? 'warning' : 'success',
        title: result.renamed ? 'Görsel yeniden adlandırıldı' : 'Görsel yüklendi',
        message: result.renamed
          ? `Aynı isimde görsel vardı, "${result.fileName}" olarak kaydedildi.`
          : 'Kapak görseli alanı otomatik doldu.',
      });
    } catch (err) {
      const msg = 'Sunucuya ulaşılamadı.';
      setImgError(msg);
      onNotify({ type: 'error', title: 'Görsel yükleme hatası', message: msg });
    } finally {
      setImgUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    if (!form.title.trim()) {
      onNotify({ type: 'warning', title: 'Eksik alan', message: 'Başlık zorunludur.' });
      return;
    }
    if (!form.link.trim() && !hasFile) {
      onNotify({
        type: 'warning',
        title: 'İçerik gerekli',
        message: 'Yukarıdan bir PDF yükleyin ya da "PDF / Link Yolu" alanını manuel doldurun.',
      });
      return;
    }
    if (isNewSection && !newSectionName.trim()) {
      onNotify({
        type: 'warning',
        title: 'Eksik alan',
        message: 'Yeni bölüm için bölüm adı zorunludur.',
      });
      return;
    }
    onSave({
      ...form,
      title: form.title.trim(),
      link: form.link.trim(),
      info: form.info.trim(),
      image: form.image.trim(),
      isNew: form.isNew,
    }, isNewSection ? newSectionName.trim() : null);
    if (!editingItem) {
      setForm(EMPTY_FORM);
      setHasFile(false);
      setHasImage(false);
      setUploadStatus(null);
      setUploadError(null);
      setImgStatus(null);
      setImgError(null);
      setIsNewSection(false);
      setNewSectionName('');
    }
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.cardTitle}>
            {editingItem ? 'Öğeyi Düzenle' : 'Yeni İçerik Ekle'}
          </h2>
          <p className={styles.cardSubtitle}>
            {editingItem
              ? 'Değişiklikleri kaydedin veya iptal edin'
              : 'Seçili kategoriye öğe ekleyin'}
          </p>
        </div>
          {editingItem && (
          <span className={styles.countChip}>
            Düzenleniyor
          </span>
        )}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.formGroup}>
          <label htmlFor="cat" className={styles.label}>Kategori</label>
          <select
            id="cat"
            className={styles.select}
            value={selectedSlug}
            onChange={(e) => onChangeSlug(e.target.value)}
            disabled={loading || !!editingItem}
          >
            {tgList.length > 0 && (
              <optgroup label="TÜRKİYE GENELİ (TG)">
                {tgList.map((s) => (
                  <option key={s} value={s}>{data[s].title}</option>
                ))}
              </optgroup>
            )}
            {otherList.length > 0 && (
              <optgroup label="KİTAP VE DİĞER ÇÖZÜMLER">
                {otherList.map((s) => (
                  <option key={s} value={s}>{data[s].title}</option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="sec" className={styles.label}>Bölüm</label>
          <select
            id="sec"
            className={styles.select}
            value={isNewSection ? NEW_SECTION_VALUE : String(selectedSectionIdx)}
            onChange={(e) => {
              if (e.target.value === NEW_SECTION_VALUE) {
                setIsNewSection(true);
                setNewSectionName('');
              } else {
                setIsNewSection(false);
                setNewSectionName('');
                onChangeSectionIdx(parseInt(e.target.value, 10));
              }
            }}
            disabled={loading || !!editingItem}
          >
            {data[selectedSlug]?.sections?.map((sec, idx) => (
              <option key={idx} value={idx}>{sec.name}</option>
            ))}
            <option value={NEW_SECTION_VALUE}>+ Yeni Bölüm Ekle…</option>
          </select>
          {isNewSection && (
            <input
              type="text"
              className={styles.input}
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              placeholder="Yeni bölüm adı (örn: TR-YÖS DENEMELERİ)"
              disabled={loading || !!editingItem}
              style={{ marginTop: 6 }}
              autoFocus
            />
          )}
        </div>

        {!editingItem && (
          <div className={styles.formGroup}>
            <label htmlFor="pdf" className={styles.label}>PDF Dosya Yükle</label>
            <div className={styles.uploadRow}>
              <input
                id="pdf"
                type="file"
                accept="application/pdf,.pdf"
                className={styles.fileInput}
                onChange={handleUpload}
                disabled={uploading || loading}
              />
            </div>
            {uploading && (
              <p className={styles.hint} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className={styles.spinner} aria-hidden="true" /> Yükleniyor...
              </p>
            )}
            {uploadStatus && !uploading && (
              <div className={`${styles.uploadSuccess} ${uploadStatus.renamed ? styles.uploadWarning : ''}`}>
                <span aria-hidden="true">{uploadStatus.renamed ? '⚠' : '✓'}</span>
                <span>{uploadStatus.fileName}</span>
              </div>
            )}
            {uploadError && !uploading && (
              <div
                role="alert"
                style={{
                  marginTop: 6,
                  padding: '8px 12px',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                  color: '#b91c1c',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span aria-hidden="true">✕</span>
                <span>{uploadError}</span>
              </div>
            )}
            {!uploading && !uploadError && (
              <p className={styles.hint}>
                Yüklendiğinde link otomatik dolar. Başlığı manuel yazın. Maks. 50 MB.
              </p>
            )}
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Başlık *</label>
          <input
            id="title"
            type="text"
            className={styles.input}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Örn: 1. Ünite Çözümleri"
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="link" className={styles.label}>
            PDF / Link Yolu {!editingItem && '(opsiyonel — yüklendiyse otomatik dolar)'}
          </label>
          <input
            id="link"
            type="text"
            className={styles.input}
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            placeholder="/dosyalar/turkiye-geneli-denemeleri/..."
            disabled={loading}
            style={hasFile && !editingItem ? { background: 'var(--bg)', color: 'var(--text-dim)' } : undefined}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.checkboxRow}>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={form.isNew}
              onChange={(e) => setForm({ ...form, isNew: e.target.checked })}
              disabled={loading}
            />
            <span>YENİ etiketi eklensin</span>
          </label>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="info" className={styles.label}>Bilgi (opsiyonel)</label>
          <input
            id="info"
            type="text"
            className={styles.input}
            value={form.info}
            onChange={(e) => setForm({ ...form, info: e.target.value })}
            placeholder="Örn: 2025 Dönemi"
            disabled={loading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Kapak Görseli (kitaplar için)</label>
          <input
            id="image"
            type="text"
            className={styles.input}
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="/images/kapak.jpg"
            disabled={loading}
          />
          <div className={styles.uploadRow} style={{ marginTop: 6 }}>
            <input
              id="img"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif,.jpg,.jpeg,.png,.webp,.gif"
              className={styles.fileInput}
              onChange={handleImageUpload}
              disabled={imgUploading || loading}
            />
          </div>
          {imgUploading && (
            <p className={styles.hint} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className={styles.spinner} aria-hidden="true" /> Görsel yükleniyor...
            </p>
          )}
          {imgStatus && !imgUploading && (
            <div className={`${styles.uploadSuccess} ${imgStatus.renamed ? styles.uploadWarning : ''}`}>
              <span aria-hidden="true">{imgStatus.renamed ? '⚠' : '✓'}</span>
              <span>{imgStatus.fileName}</span>
            </div>
          )}
          {imgError && !imgUploading && (
            <div
              role="alert"
              style={{
                marginTop: 6,
                padding: '8px 12px',
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#b91c1c',
                borderRadius: 'var(--radius-sm)',
                fontSize: 12,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span aria-hidden="true">✕</span>
              <span>{imgError}</span>
            </div>
          )}
          {!imgUploading && !imgStatus && !imgError && (
            <p className={styles.hint}>
              JPG / PNG / WebP / GIF. Maks. 10 MB.
            </p>
          )}
        </div>

        <div className={styles.formActions}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
            disabled={loading || uploading || imgUploading}
          >
            {loading && <span className={styles.spinner} aria-hidden="true" />}
            {editingItem
              ? (loading ? 'Güncelleniyor...' : 'Güncelle')
              : (loading ? 'Kaydediliyor...' : 'Sisteme Kaydet')}
          </button>
          {editingItem && (
            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary}`}
              onClick={handleCancel}
              disabled={loading}
            >
              İptal
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
