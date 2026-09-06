export default function PolicyPage({ policy, slug }) {
  if (!policy) return null;
  const paragraphs = Array.isArray(policy.paragraphs) ? policy.paragraphs : [];

  return (
    <div className="policy-page" style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <section className="page-hero" style={{
        background: 'var(--primary)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontWeight: 800, fontSize: 'clamp(1.5rem, 3.4vw, 2.2rem)', margin: '0' }}>
            {policy.title || slug}
          </h1>
        </div>
      </section>

      <section style={{ padding: '60px 0 100px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <div style={{
            background: 'var(--bg-card)',
            padding: 'clamp(28px, 5vw, 56px)',
            borderRadius: '32px',
            border: '1px solid var(--border)',
            boxShadow: '0 20px 60px rgba(13,30,54,0.06)'
          }}>
            {paragraphs.map((para, i) => {
              const isHeading = para.length < 90 && !/^(\.{3}|•|\d+\.)/.test(para) && /^[A-ZÇĞİÖŞÜ0-9]/.test(para);
              return (
                <p key={i} style={{
                  fontSize: '15.5px',
                  lineHeight: 1.9,
                  color: isHeading ? 'var(--primary)' : 'var(--text)',
                  fontWeight: isHeading ? 800 : 450,
                  margin: isHeading ? '30px 0 12px' : '0 0 18px',
                  letterSpacing: isHeading ? '0.3px' : '0'
                }}>
                  {para}
                </p>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}