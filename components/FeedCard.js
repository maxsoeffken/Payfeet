export default function FeedCard({ avatar="🌀", name="OnlyFans", handle="@onlyfans", time="vor 5 Stunden", text, image }) {
  return (
    <article style={card}>
      <div style={{ display:"flex", gap:12 }}>
        <div style={avatarWrap}>{avatar}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
            <div style={{ fontWeight: 700 }}>{name}</div>
            <div style={{ color:"#888" }}>{handle} · {time}</div>
            <button style={kebab}>⋯</button>
          </div>
          <div style={{ marginTop:8, lineHeight:1.45 }}>{text}</div>
        </div>
      </div>

      {image && (
        <div style={{ marginTop:12, overflow:"hidden", borderRadius:12 }}>
          <img src={image} alt="" style={{ width:"100%", display:"block" }}/>
        </div>
      )}
    </article>
  );
}

const card = { background:"#fff", border:"1px solid #eee", borderRadius:12, padding:16 };
const avatarWrap = {
  width:42, height:42, borderRadius:"50%", display:"grid", placeItems:"center",
  background:"#eaf2ff", fontSize:22
};
const kebab = {
  marginLeft:"auto", border:"1px solid #eee", background:"#fff",
  borderRadius:8, width:32, height:32, cursor:"pointer"
};
