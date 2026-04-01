/**
 * パレット定義ファイル
 * ─────────────────────────────────────────────────────────────────
 * すべてのカラーパレットはここで一元管理します。
 * 新しいパレットを追加する場合は palettes オブジェクトにキーを追加するだけです。
 *
 * CSS変数は Tailwind の opacity modifier が動作するよう
 * 「R G B」（スペース区切り）形式で格納します。
 * Tailwind 側: rgb(var(--primary) / <alpha-value>)
 * ─────────────────────────────────────────────────────────────────
 */

export type PaletteId = '1' | '2' | '3' | '4';

export interface PaletteVars {
  /** メインブランドカラー（ボタン・アクセント） */
  primary: string;
  'primary-dark': string;
  'primary-light': string;
  /** セカンダリアクセント（現 teal / mauve ポジション） */
  secondary: string;
  'secondary-dark': string;
  'secondary-light': string;
  /** アクセント（現 mustard / amber ポジション） */
  accent: string;
  'accent-dark': string;
  'accent-light': string;
  /** ブラッシュ（ボーダー・微妙な差し色） */
  blush: string;
  /** ページ全体の地の色 */
  cream: string;
  /** セクション背景（creamより少し濃い） */
  'warm-bg': string;
  /** 本文テキスト */
  'dark-text': string;
  /** 補助テキスト */
  'muted-text': string;
  /** ダークUIパネル（Hero、CTAセクション背景） */
  'dark-ui': string;
  /** ダークUIパネルの中間トーン */
  'dark-ui-mid': string;
}

export interface PaletteConfig {
  id: PaletteId;
  name: string;
  nameJa: string;
  description: string;
  /** デザイナー提供の5色スウォッチ（表示確認用） */
  swatches: [string, string, string, string, string];
  vars: PaletteVars;
}

// Hex → "R G B" 変換ヘルパー
function rgb(hex: string): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

// ─────────────────────────────────────────────────────────────────
// パレット定義
// ─────────────────────────────────────────────────────────────────

export const palettes: Record<PaletteId, PaletteConfig> = {

  /** ──────── パレット1: 現行 Coral & Cream ──────── */
  '1': {
    id: '1',
    name: 'Coral & Cream',
    nameJa: 'コーラル & クリーム',
    description: '暖かみのあるコーラルとクリームの女性的なパレット（現行）',
    swatches: ['#F2E7C4', '#F2CA80', '#A68F86', '#D9C7C1', '#F28379'],
    vars: {
      primary:           rgb('#F28379'), // 242 131 121
      'primary-dark':    rgb('#D96B61'), // 217 107  97
      'primary-light':   rgb('#FDF0EF'), // 253 240 239
      secondary:         rgb('#A68F86'), // 166 143 134
      'secondary-dark':  rgb('#7D6960'), // 125 105  96
      'secondary-light': rgb('#EDE5E2'), // 237 229 226
      accent:            rgb('#F2CA80'), // 242 202 128
      'accent-dark':     rgb('#D4A845'), // 212 168  69
      'accent-light':    rgb('#FDF5E4'), // 253 245 228
      blush:             rgb('#D9C7C1'), // 217 199 193
      cream:             rgb('#F2E7C4'), // 242 231 196
      'warm-bg':         rgb('#D9C7C1'), // 217 199 193
      'dark-text':       rgb('#2C1F1C'), //  44  31  28
      'muted-text':      rgb('#A68F86'), // 166 143 134
      'dark-ui':         rgb('#2C1F1C'), //  44  31  28
      'dark-ui-mid':     rgb('#3A2826'), //  58  40  38
    },
  },

  /** ──────── パレット2: Forest Sage ──────── */
  '2': {
    id: '2',
    name: 'Forest Sage',
    nameJa: 'フォレスト セージ',
    description: 'ナチュラルなグリーンとピンクの爽やかなパレット',
    swatches: ['#5DA684', '#97A69C', '#7D7672', '#F2EFEB', '#F2B6B6'],
    vars: {
      primary:           rgb('#5DA684'), //  93 166 132
      'primary-dark':    rgb('#4A8A6E'), //  74 138 110
      'primary-light':   rgb('#E4F3EC'), // 228 243 236
      secondary:         rgb('#97A69C'), // 151 166 156
      'secondary-dark':  rgb('#6E7D77'), // 110 125 119
      'secondary-light': rgb('#E8EDEB'), // 232 237 235
      accent:            rgb('#F2B6B6'), // 242 182 182
      'accent-dark':     rgb('#D47878'), // 212 120 120
      'accent-light':    rgb('#FDE8E8'), // 253 232 232
      blush:             rgb('#E0D9D7'), // 224 217 215
      cream:             rgb('#F2EFEB'), // 242 239 235
      'warm-bg':         rgb('#E8E4DF'), // 232 228 223
      'dark-text':       rgb('#2A2F2D'), //  42  47  45
      'muted-text':      rgb('#7D7672'), // 125 118 114
      'dark-ui':         rgb('#1F2E28'), //  31  46  40
      'dark-ui-mid':     rgb('#2A3D35'), //  42  61  53
    },
  },

  /** ──────── パレット3: Aqua & Sunshine ──────── */
  '3': {
    id: '3',
    name: 'Aqua & Sunshine',
    nameJa: 'アクア & サンシャイン',
    description: 'ティールとイエローの涼やかで明るいパレット',
    swatches: ['#D1E3E6', '#B4D9D5', '#68A69B', '#F2E6A7', '#F2CD5C'],
    vars: {
      primary:           rgb('#68A69B'), // 104 166 155
      'primary-dark':    rgb('#52897F'), //  82 137 127
      'primary-light':   rgb('#E4F2F0'), // 228 242 240
      secondary:         rgb('#B4D9D5'), // 180 217 213
      'secondary-dark':  rgb('#7DADA9'), // 125 173 169
      'secondary-light': rgb('#DFF0EE'), // 223 240 238
      accent:            rgb('#F2CD5C'), // 242 205  92
      'accent-dark':     rgb('#C4A020'), // 196 160  32
      'accent-light':    rgb('#FEF5D0'), // 254 245 208
      blush:             rgb('#D1E3E6'), // 209 227 230
      cream:             rgb('#FDFCF3'), // 253 252 243
      'warm-bg':         rgb('#D1E3E6'), // 209 227 230
      'dark-text':       rgb('#1F3530'), //  31  53  48
      'muted-text':      rgb('#5C7A75'), //  92 122 117
      'dark-ui':         rgb('#1A2E2A'), //  26  46  42
      'dark-ui-mid':     rgb('#243D38'), //  36  61  56
    },
  },

  /** ──────── パレット4: Rose & Teal ──────── */
  '4': {
    id: '4',
    name: 'Rose & Teal',
    nameJa: 'ローズ & ティール',
    description: 'ローズとティールの上品でモダンなパレット',
    swatches: ['#BF808C', '#F2DFEB', '#95BFBB', '#51A696', '#D9A7A7'],
    vars: {
      primary:           rgb('#BF808C'), // 191 128 140
      'primary-dark':    rgb('#A36876'), // 163 104 118
      'primary-light':   rgb('#FAF0F3'), // 250 240 243
      secondary:         rgb('#95BFBB'), // 149 191 187
      'secondary-dark':  rgb('#6B8F8B'), // 107 143 139
      'secondary-light': rgb('#DCF0EE'), // 220 240 238
      accent:            rgb('#51A696'), //  81 166 150
      'accent-dark':     rgb('#3D8070'), //  61 128 112
      'accent-light':    rgb('#DFF5F2'), // 223 245 242
      blush:             rgb('#D9A7A7'), // 217 167 167
      cream:             rgb('#FBF5F8'), // 251 245 248
      'warm-bg':         rgb('#F2DFEB'), // 242 223 235
      'dark-text':       rgb('#2A1F22'), //  42  31  34
      'muted-text':      rgb('#9A7580'), // 154 117 128
      'dark-ui':         rgb('#2A1F22'), //  42  31  34
      'dark-ui-mid':     rgb('#38282C'), //  56  40  44
    },
  },
};

export const DEFAULT_PALETTE_ID: PaletteId = '1';

export function getPalette(id: string | undefined): PaletteConfig {
  const key = (id ?? DEFAULT_PALETTE_ID) as PaletteId;
  return palettes[key] ?? palettes[DEFAULT_PALETTE_ID];
}

/**
 * パレットのCSS変数ブロックを文字列で生成する（layout.tsx での <style> 注入用）
 * スコープは :root なので全ページで有効
 */
export function paletteToStyleString(p: PaletteConfig): string {
  const declarations = Object.entries(p.vars)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join('\n');
  return `:root {\n${declarations}\n}`;
}
