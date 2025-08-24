export default function Tabs({ active="alle", onChange=()=>{} }) {
  const items = [{key:"alle",label:"Alle"},{key:"ich",label:"Ich folge"}];
  return (
    <div style={{ display:"flex", gap:12, padding:"8px 4px" }}>
      {items.map(t => (
        <button key={t.key}
          onClick={()=>onChange(t.key)}
          style={{
            padding:"8px 14px", borderRadius: 20,
            border: "1px solid " + (active===t.key ? "#111" : "#ddd"),
            background: active===t.key ? "#111" : "#fff",
            color: active===t.key ? "#fff" : "#111", cursor: "pointer",
            fontWeight: 600
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
