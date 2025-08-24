export default function TopNav() {
  return (
    <header style={styles.wrap}>
      <div style={{ fontSize: 22, fontWeight: 800 }}>START</div>
      <div style={styles.actions}>
        <button style={styles.iconBtn} aria-label="Search">🔍</button>
        <button style={styles.iconBtn} aria-label="Menu">⋮</button>
      </div>
    </header>
  );
}

const styles = {
  wrap: {
    position: "sticky", top: 0, zIndex: 20,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: 56, padding: "0 16px",
    background: "#fff", borderBottom: "1px solid #eee"
  },
  actions: { display: "flex", gap: 8 },
  iconBtn: {
    width: 36, height: 36, borderRadius: 8, border: "1px solid #eee",
    background: "#fff", fontSize: 18, cursor: "pointer"
  }
};
