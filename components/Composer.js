export default function Composer() {
  return (
    <div style={box}>
      <div style={{ color: "#8a8a8a" }}>Neuen Beitrag erstellen …</div>
      <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
        <Icon>🖼️</Icon>
        <Icon>📎</Icon>
        <Icon>🗓️</Icon>
        <Icon>Aa</Icon>
      </div>
    </div>
  );
}

function Icon({ children }) {
  return (
    <button style={{
      width: 36, height: 36, borderRadius: 8, border: "1px solid #eee",
      background: "#fff", fontSize: 16, cursor: "pointer"
    }}>
      {children}
    </button>
  );
}

const box = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 16
};
