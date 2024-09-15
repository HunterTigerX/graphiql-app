'use client';
import { Provider } from 'react-redux';
import store from '../reducers/root/rootReduces';
import { useEffect, useState } from 'react';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import '../styles/global.css';
import '../firebase';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;

    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <ErrorBoundary>
          <Provider store={store}>
            <div className="wrapper">
              <Header isScrolled={isScrolled} />
              {children}
              <Footer />
            </div>
          </Provider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
