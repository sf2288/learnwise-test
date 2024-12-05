import Header from '@/components/header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CONSTANTS } from '@/utils/constants';
import { ModalProvider } from '@/components/modal-context';
import { ToastProvider } from '@/components/toast-context';

import dynamic from 'next/dynamic';

const Analytics = dynamic(() => import('@/components/analytics'));

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  metadataBase: new URL(CONSTANTS.NEXT_PUBLIC_SITE_URL),
  title: {
    template: `%s | ${CONSTANTS.SITE_NAME} Test`,
    default: `${CONSTANTS.SITE_NAME} Test`
  },
  description: `${CONSTANTS.SITE_NAME} Test`,
  openGraph: {
    images: ['/next.svg'],
    locale: 'en_US',
    type: 'website'
  }
};

/**
 * The root layout of the app.
 *
 * This component is responsible for rendering the header and the modal context
 * provider.
 *
 * @param children The children of the root layout.
 * @returns The root layout component.
 */
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
        <ToastProvider>
          <ModalProvider>
            <Header />
            {children}
          </ModalProvider>
        </ToastProvider>
        {CONSTANTS.IS_PRDOUCTION ? <Analytics /> : null}
      </body>
    </html>
  );
}
