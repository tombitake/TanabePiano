import Link from 'next/link';
import { palettes } from '@/lib/palettes';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'カラーパレット比較 | TANABEピアノ教室',
  robots: { index: false }, // 検索エンジンに見せない
};

// 各パレットのメインカラー（primary）を16進数で返す簡易ヘルパー
function rgbToHex(rgb: string): string {
  const [r, g, b] = rgb.split(' ').map(Number);
  return `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
}

export default function PaletteSelectPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── ヘッダー ── */}
      <div className="bg-white border-b border-gray-200 px-6 py-8 text-center">
        <p className="text-xs tracking-[0.4em] text-gray-400 uppercase mb-2">Design Preview</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">カラーパレット 比較・確認</h1>
        <p className="text-sm text-gray-500">
          パレットを選んでボタンを押すと、そのデザインでトップページを確認できます。<br />
          URLを共有して他の方にも見てもらえます。
        </p>
      </div>

      {/* ── パレットグリッド ── */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {(Object.values(palettes)).map((palette) => {
          const primaryHex  = rgbToHex(palette.vars.primary);
          const accentHex   = rgbToHex(palette.vars.accent);
          const creamHex    = rgbToHex(palette.vars.cream);
          const secHex      = rgbToHex(palette.vars.secondary);
          const blushHex    = rgbToHex(palette.vars.blush);
          const darkUiHex   = rgbToHex(palette.vars['dark-ui']);
          const darkTextHex = rgbToHex(palette.vars['dark-text']);
          const mutedHex    = rgbToHex(palette.vars['muted-text']);

          return (
            <div
              key={palette.id}
              className="bg-white rounded-3xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* カラーストリップ */}
              <div className="h-16 flex">
                {palette.swatches.map((hex, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
                ))}
              </div>

              <div className="p-6">
                {/* バッジ + タイトル */}
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                    style={{ backgroundColor: primaryHex }}
                  >
                    {palette.id}
                  </span>
                  <div>
                    <p className="font-bold text-gray-800 leading-none">{palette.nameJa}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{palette.name}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{palette.description}</p>

                {/* ミニプレビュー */}
                <div
                  className="rounded-2xl overflow-hidden mb-5 border"
                  style={{ borderColor: blushHex }}
                >
                  {/* ヘッダー風 */}
                  <div
                    className="px-4 py-3 flex items-center gap-2"
                    style={{ backgroundColor: creamHex }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: primaryHex }}
                    >
                      <span className="text-white text-[8px]">♪</span>
                    </div>
                    <span className="text-xs font-medium" style={{ color: darkTextHex }}>
                      TANABEピアノ教室
                    </span>
                    <div className="ml-auto flex gap-2">
                      {['コース', 'アクセス', 'お問い合わせ'].map((l) => (
                        <span key={l} className="text-[9px]" style={{ color: mutedHex }}>{l}</span>
                      ))}
                    </div>
                  </div>

                  {/* ヒーロー風 */}
                  <div
                    className="px-5 py-4"
                    style={{ background: `linear-gradient(135deg, ${darkUiHex} 0%, ${darkUiHex}cc 100%)` }}
                  >
                    <p className="text-[9px] text-white/40 tracking-widest mb-1">Minami-Nagareyama · Piano School</p>
                    <p className="text-white font-bold text-sm tracking-wider mb-2">TANABE ピアノ教室</p>
                    <div className="w-8 h-px mb-2" style={{ backgroundColor: primaryHex }} />
                    <p className="text-white/40 text-[9px] italic mb-3">〜 家族と過ごす日常に、音楽を 〜</p>
                    <div className="flex gap-2">
                      <span
                        className="text-[9px] px-3 py-1 rounded-full font-medium"
                        style={{ backgroundColor: 'white', color: primaryHex }}
                      >
                        体験レッスン申し込み
                      </span>
                      <span
                        className="text-[9px] px-3 py-1 rounded-full border"
                        style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.8)' }}
                      >
                        コースを見る
                      </span>
                    </div>
                  </div>

                  {/* コンテンツ風 */}
                  <div
                    className="px-5 py-4 grid grid-cols-3 gap-2"
                    style={{ backgroundColor: creamHex }}
                  >
                    {[
                      { label: 'ごあいさつ', color: primaryHex },
                      { label: 'コース一覧', color: accentHex },
                      { label: 'アクセス', color: secHex },
                    ].map(({ label, color }) => (
                      <div
                        key={label}
                        className="rounded-lg p-2 text-center"
                        style={{ backgroundColor: `${color}20`, border: `1px solid ${color}40` }}
                      >
                        <p className="text-[9px] font-medium" style={{ color: darkTextHex }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* CTAボタンサンプル */}
                  <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: 'white' }}>
                    <span
                      className="text-[9px] px-4 py-1.5 rounded-full font-medium"
                      style={{ backgroundColor: primaryHex, color: 'white' }}
                    >
                      ● ボタン（Primary）
                    </span>
                    <span
                      className="text-[9px] px-4 py-1.5 rounded-full border font-medium"
                      style={{ borderColor: primaryHex, color: primaryHex }}
                    >
                      ○ ボタン（Outline）
                    </span>
                  </div>
                </div>

                {/* スウォッチ詳細 */}
                <div className="flex gap-1.5 mb-5 flex-wrap">
                  {[
                    { hex: primaryHex, label: 'Primary' },
                    { hex: accentHex, label: 'Accent' },
                    { hex: secHex, label: 'Secondary' },
                    { hex: creamHex, label: 'Cream' },
                    { hex: blushHex, label: 'Blush' },
                  ].map(({ hex, label }) => (
                    <div key={label} className="flex items-center gap-1">
                      <div
                        className="w-4 h-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                      <span className="text-[9px] text-gray-400">{label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/?palette=${palette.id}`}
                  className="block w-full text-center text-sm font-semibold py-3 rounded-xl transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-md"
                  style={{ backgroundColor: primaryHex, color: 'white' }}
                >
                  このパレットでサイトを見る →
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── フッター説明 ── */}
      <div className="text-center pb-12 px-4">
        <p className="text-xs text-gray-400">
          各パレットのURLを直接共有することもできます：
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-2">
          {Object.values(palettes).map((p) => (
            <code key={p.id} className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-1 text-gray-500">
              /?palette={p.id}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}
