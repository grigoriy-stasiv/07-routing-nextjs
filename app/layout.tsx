import './globals.css'; import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import type { ReactNode } from 'react';

export const metadata = { title: 'NoteHub', description: 'Your notes app', };

type RootLayoutProps = { children: ReactNode; modal: ReactNode; };
export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="uk"><body>
      <TanStackProvider>
        <Header />
        <main>
          {children}
          {modal}
        </main>
        <Footer />
      </TanStackProvider>
    </body></html>
  );
}
