import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Providers } from './providers';
import { getPalette, paletteToStyleString, type PaletteId } from '@/lib/palettes';
import { PaletteSwitcher } from '@/components/ui/PaletteSwitcher';

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
  // 環境変数でパレットを決定（デフォルト: '1'）
  const paletteId = (process.env.NEXT_PUBLIC_COLOR_PALETTE ?? '1') as PaletteId;
  const palette = getPalette(paletteId);

  // パレットのCSS変数をインライン<style>で注入
  const paletteCSS = paletteToStyleString(palette);

  // パレットスイッチャーを表示するか
  const showSwitcher =
    process.env.NODE_ENV === 'development' ||
    process.env.NEXT_PUBLIC_SHOW_PALETTE_SWITCHER === 'true';

  return (
    <html lang="ja" data-palette={paletteId}>
      <head>
        {/* パレットCSS変数を最優先で適用 */}
        <style dangerouslySetInnerHTML={{ __html: paletteCSS }} />
      </head>
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          {showSwitcher && <PaletteSwitcher currentPaletteId={paletteId} />}
        </Providers>
      </body>
    </html>
  );
}
