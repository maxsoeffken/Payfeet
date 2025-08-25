import { useState, useRef } from "react";

export default function Composer({ onCreate }) {
  const [value, setValue] = useState("");
  const [sending, setSending] = useState(false);
  const taRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
    // einfache Auto-Resize-Logik
    const el = taRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";
  };

  const handleSubmit = async () => {
    if (!value.trim() || sending) return;
    try {
      setSending(true);
      // parent callback (z. B. speichert zu Supabase)
      await onCreate?.(value.trim());
      setValue("");
      // textarea nach dem Senden zurücksetzen
      if (taRef.current) {
        taRef.current.style.height = "auto";
      }
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="
        rounded-2xl border border-white/10 bg-white/70
        shadow-lg backdrop-blur-md
        dark:bg-zinc-900/70 dark:border-zinc-800
      "
    >
      {/* Kopf */}
      <div className="flex items-center justify-between px-4 pt-4">
        <h3 className="text-sm font-semibold tracking-wide text-zinc-700 dark:text-zinc-200">
          Neuen Beitrag erstellen
        </h3>
        {/* Optional: „Mehr“-Button als Platzhalter */}
        <button
          type="button"
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800"
          aria-label="Weitere Optionen"
        >
          •••
        </button>
      </div>

      {/* Eingabe */}
      <div className="px-4 pb-3 pt-2">
        <textarea
          ref={taRef}
          rows={1}
          value={value}
          onChange={handleChange}
          placeholder="Was gibt’s Neues?"
          className="
            w-full resize-none bg-transparent outline-none
            text-[15px] leading-6 placeholder:text-zinc-400
            text-zinc-800 dark:text-zinc-100
          "
        />
      </div>

      {/* Toolbar / Actions */}
      <div
        className="
          flex items-center justify-between gap-3 border-t
          border-zinc-200/70 px-3 py-2
          dark:border-zinc-800
        "
      >
        <div className="flex items-center gap-1.5">
          {/* Platzhalter-Buttons – später mit echten Upload/Pickern verbinden */}
          <ToolButton label="Bild hinzufügen">🖼️</ToolButton>
          <ToolButton label="Datei anhängen">📎</ToolButton>
          <ToolButton label="Notiz">📝</ToolButton>
          <ToolButton label="Formatierung">Aa</ToolButton>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs tabular-nums text-zinc-400">
            {value.length}/280
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!value.trim() || sending}
            className="
              rounded-xl px-4 py-2 text-sm font-semibold
              text-white shadow-md transition
              disabled:opacity-50 disabled:cursor-not-allowed
              bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500
              hover:brightness-110 active:scale-[0.98]
            "
          >
            {sending ? "Senden…" : "Posten"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Kleiner Icon-Button für die Toolbar */
function ToolButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="
        rounded-xl px-2.5 py-1.5 text-[13px]
        text-zinc-600 hover:bg-zinc-100 hover:text-zinc-800
        dark:text-zinc-300 dark:hover:bg-zinc-800
      "
    >
      {children}
    </button>
  );
}
