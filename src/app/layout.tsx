import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import localFont from 'next/font/local';
import '@/app/global.css';
import { ThemeProvider } from 'next-themes';
import { Providers } from '@/mocks/MSWProvider';

const suit = localFont({
  src: './fonts/SUIT-Variable.woff2',
  display: 'swap',
  variable: '--font-suit',
});

const yclover = localFont({
  src: './fonts/YClover-Bold.woff2',
  display: 'swap',
  variable: '--font-yclover',
});

const moneygraphy = localFont({
  src: './fonts/Moneygraphy-Rounded.woff2',
  display: 'swap',
  variable: '--font-moneygraphy',
});

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${moneygraphy.variable} ${pretendard.variable} ${yclover.variable} ${suit.variable} font-pretendard antialiased`}
      >
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system">
            <main>{children}</main>
          </ThemeProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
