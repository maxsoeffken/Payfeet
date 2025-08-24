// components/Layout.js
import TopNav from "./TopNav";
import BottomNav from "./BottomNav";

export default function Layout({ children, title = "START" }) {
  return (
    <div className="app-shell">
      <TopNav title={title} />
      <main className="main">{children}</main>
      <BottomNav />
    </div>
  );
}
