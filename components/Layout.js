// components/Layout.js
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <main className="main">{children}</main>
      <BottomNav />
    </div>
  );
}
