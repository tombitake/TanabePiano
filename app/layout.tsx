import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    default: '南流山TANABEピアノ教室',
    template: '%s | 南流山TANABEピアノ教室',
  },
  description:
    '南流山駅から徒歩1分。〜家族と過ごす日常に音楽を〜 2歳半から大人まで、温かみのあるレッスンで音楽の楽しさを伝えます。',
  keywords: [
    'ピアノ教室',
    '南流山',
    '流山',
    'TANABEピアノ教室',
    'ピアノレッスン',
    '子供ピアノ',
    '大人ピアノ',
  ],
  openGraph: {
    title: '南流山TANABEピアノ教室',
    description: '〜家族と過ごす日常に音楽を〜 南流山駅から徒歩1分のピアノ教室',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
