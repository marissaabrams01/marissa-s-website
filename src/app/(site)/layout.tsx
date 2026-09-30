import '@/styles/animate.css';
import '@/styles/prism-vsc-dark-plus.css';
import '@/styles/star.css';
import '@/styles/tailwind.css';
import '@/styles/portfolio-gothic.css';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import {
  Cormorant_Garamond,
  IBM_Plex_Mono,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import ScrollReveal from '@/components/Portfolio/ScrollReveal';
import AsciiCursor from '@/components/Portfolio/AsciiCursor';
import AuthProvider from '../context/AuthContext';
import ToasterContext from '../context/ToastContext';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
});

const gothicSerif = Cormorant_Garamond({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gothic',
  weight: ['400', '500', '600'],
});

const terminalMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-terminal',
  weight: ['400', '500', '600'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${plusJakarta.className} ${gothicSerif.variable} ${terminalMono.variable}`}
    >
      <body>
        <ScrollReveal>
          <div className='portfolio-theme isolate'>
            <div className='portfolio-atmosphere' aria-hidden='true'>
              <div className='portfolio-fog' />
              <div className='portfolio-particles'>
                {Array.from({ length: 10 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>
            <NextTopLoader
              color='#ff38ca'
              crawlSpeed={300}
              showSpinner={false}
              shadow='none'
            />

            <AuthProvider>
              <Header />
              {children}
              <Footer />

              <ToasterContext />
            </AuthProvider>
          </div>
          <AsciiCursor />
          <ScrollToTop />
        </ScrollReveal>
      </body>
    </html>
  );
}
