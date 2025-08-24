// components/FeedCard.js
export default function FeedCard({
  author = 'Payfeet',
  handle = '@payfeet',
  time = 'vor 5 Minuten',
  text = 'Beispiel-Beitragstext…',
  avatarUrl = '/logo.png', // lege optional /public/logo.png an
}) {
  return (
    <article
      style={{
        display: 'flex',
        gap: 14,
        padding: 16,
        borderRadius: 16,
        border: '1px solid #e9ecf1',
        background: '#fff',
        boxShadow: '0 4px 14px rgba(0,0,0,.04)',
      }}
    >
      <img
        src={avatarUrl}
        alt={author}
        width={44}
        height={44}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <strong style={{ fontSize: 16 }}>{author}</strong>
          <span style={{ color: '#667085' }}>{handle}</span>
          <span style={{ color: '#98a2b3' }}>· {time}</span>
        </div>
        <p style={{ marginTop: 6, lineHeight: 1.5 }}>{text}</p>
      </div>
      <button
        aria-label="Mehr"
        style={{
          border: '1px solid #e9ecf1',
          background: '#fff',
          borderRadius: 12,
          width: 40,
          height: 40,
        }}
      >
        …
      </button>
    </article>
  );
}
