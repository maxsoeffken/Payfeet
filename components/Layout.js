// components/Layout.js
import TopNav from "./TopNav";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#77AEEE]">
      <TopNav />
      <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
    </div>
  );
}
