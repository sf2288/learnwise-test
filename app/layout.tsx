import Header from '@/components/header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CONSTANTS } from '@/utils/constants';
import { ModalProvider } from '@/components/modal-context';

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.NEXT_PUBLIC_SITE_URL),
  title: {
    template: '%s | Shahid Learnwise Test',
    default: 'Shahid Learnwise Test'
  },
  description: 'Shahid Learnwise Test',
  openGraph: {
    images: ['/next.svg'],
    locale: 'en_US',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen w-full flex-col antialiased`}
      >
        <ModalProvider>
          <Header />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
