import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';
import { getPalette, paletteToStyleString, type PaletteId } from '@/lib/palettes';
import { PaletteSwitcher } from '@/components/ui/PaletteSwitcher';
import { Suspense } from 'react';
import { PaletteInitializer } from '@/components/ui/PaletteInitializer';

export const metadata: Metadata = {
  title: {
    default: '南流山TANABEピアノ教室',
    template: '%s | 南流山TANABEピアノ教室',
  },
  description:
    '南流山駅から徒歩1分。〜家族と過ごす日常に音楽を〜 2歳半から大人まで、温かみのあるレッスンで音楽の楽しさを伝えます。',
  keywords: ['ピアノ教室', '南流山', '流山', 'TANABEピアノ教室', 'ピアノレッスン', '子供ピアノ', '大人ピアノ'],
  openGraph: {
    title: '南流山TANABEピアノ教室',
    description: '〜家族と過ごす日常に音楽を〜 南流山駅から徒歩1分のピアノ教室',
    type: 'website',
    locale: 'ja_JP',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // サーバー側のデフォルトパレット（環境変数で制御）
  const paletteId = (process.env.NEXT_PUBLIC_COLOR_PALETTE ?? '1') as PaletteId;
  const palette = getPalette(paletteId);
  const paletteCSS = paletteToStyleString(palette);

  // 開発中 or プレビューフラグが立っているときだけスイッチャーを表示
  const showSwitcher =
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_SHOW_PALETTE_SWITCHER === 'true';

  return (
    <html lang="ja" data-palette={paletteId}>
      <head>
        {/* サーバー側デフォルトパレットをSSR時に適用（フラッシュ防止） */}
        <style dangerouslySetInnerHTML={{ __html: paletteCSS }} />
      </head>
      <body>
        <Providers>
          {/* URLパラメータ ?palette=N をクライアント側で読み取り上書き */}
          <Suspense fallback={null}>
            <PaletteInitializer serverPaletteId={paletteId} />
          </Suspense>
          <Header />
          <main>{children}</main>
          <Footer />
          {showSwitcher && <PaletteSwitcher currentPaletteId={paletteId} />}
        </Providers>
      </body>
    </html>
  );
}
