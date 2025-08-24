export default function BottomNav() {
  const Item = ({children, label}) => (
    <button style={btn}>
      <div style={{ fontSize: 20 }}>{children}</div>
      <div style={{ fontSize: 11 }}>{label}</div>
    </button>
  );
  return (
    <nav style={wrap}>
      <Item label="Home">🏠</Item>
      <Item label="Benachr.">🔔</Item>
      <Item label="Neu">➕</Item>
      <Item label="Nachr.">💬</Item>
      <Item label="Profil">👤</Item>
    </nav>
  );
}

const wrap = {
  position:"sticky", bottom:0, zIndex:20,
  display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:4,
  padding:"8px 8px 10px", background:"#fff", borderTop:"1px solid #eee"
};
const btn = {
  display:"grid", placeItems:"center", gap:2,
  padding:"6px 0", border:"none", background:"transparent", cursor:"pointer"
};
