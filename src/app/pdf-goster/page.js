"use client";
import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function PdfViewer() {
  const searchParams = useSearchParams();
  const file = searchParams.get('file');

  useEffect(() => {
    if (!file) return;
    const fetchPdf = async () => {
      try {
        const res = await fetch(`/api/pdf?file=${encodeURIComponent(file)}&bypassIdm=true`);
        if (!res.ok) throw new Error('API Hatası');
        const base64Text = await res.text();
        const binaryString = window.atob(base64Text);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const finalBlob = new Blob([bytes], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(finalBlob);
        window.location.replace(fileURL);
      } catch (err) {
        window.location.replace(`/api/pdf?file=${encodeURIComponent(file)}`);
      }
    };
    fetchPdf();
  }, [file]);

  return (
    <div style={{ background: '#0d1e36', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontFamily: 'sans-serif', color: 'white' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ marginBottom: '10px' }}>PDF Yükleniyor...</h2>
        <p style={{ opacity: 0.7 }}>Lütfen bekleyin, güvenli görüntüleyici hazırlanıyor.</p>
      </div>
    </div>
  );
}

export default function PdfGosterPage() {
  return (
    <Suspense fallback={<div style={{ background: '#0d1e36', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: 'white' }}><h2>Yükleniyor...</h2></div>}>
      <PdfViewer />
    </Suspense>
  );
}
