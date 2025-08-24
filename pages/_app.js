import '../styles/modern.css'; // Hier wird dein CSS eingebunden
import { SessionProvider } from 'next-auth/react';

export default function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
