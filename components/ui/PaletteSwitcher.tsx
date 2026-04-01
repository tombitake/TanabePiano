'use client';

/**
 * PaletteSwitcher
 * ───────────────────────────────────────────────────────────────
 * 開発・プレビュー環境専用のフローティングパレット切替UI。
 * 本番では NEXT_PUBLIC_SHOW_PALETTE_SWITCHER=true を設定しない限り表示されない。
 *
 * 動作原理:
 *   document.documentElement のCSSカスタムプロパティを直接書き換えることで
 *   ビルドし直さずにリアルタイムでパレットを切り替える。
 *   選択はlocalStorageに保存されるのでリロード後も維持される。
 * ───────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from 'react';
import { palettes, type PaletteId, type PaletteConfig } from '@/lib/palettes';
import { Palette, ChevronUp, ChevronDown, X } from 'lucide-react';

const STORAGE_KEY = 'tanabe-preview-palette';

interface PaletteSwitcherProps {
  currentPaletteId: PaletteId;
}

function applyPaletteVars(palette: PaletteConfig) {
  const root = document.documentElement;
  root.dataset.palette = palette.id;
  Object.entries(palette.vars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

export function PaletteSwitcher({ currentPaletteId }: PaletteSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activePaletteId, setActivePaletteId] = useState<PaletteId>(currentPaletteId);

  // 初期化: localStorage から復元
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as PaletteId | null;
    if (saved && palettes[saved]) {
      setActivePaletteId(saved);
      applyPaletteVars(palettes[saved]);
    }
  }, []);

  const switchPalette = useCallback((id: PaletteId) => {
    setActivePaletteId(id);
    applyPaletteVars(palettes[id]);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  const resetToDefault = useCallback(() => {
    switchPalette(currentPaletteId);
    localStorage.removeItem(STORAGE_KEY);
  }, [currentPaletteId, switchPalette]);

  const activePalette = palettes[activePaletteId];

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col items-end gap-2">
      {/* ── パレット選択パネル ── */}
      {isOpen && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72">
          {/* ヘッダー */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-gray-700">🎨 パレット切替</p>
              <p className="text-[10px] text-gray-400 mt-0.5">開発・プレビュー専用</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* パレット一覧 */}
          <div className="space-y-2">
            {(Object.values(palettes) as PaletteConfig[]).map((palette) => {
              const isActive = palette.id === activePaletteId;
              return (
                <button
                  key={palette.id}
                  onClick={() => switchPalette(palette.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-200 ${
                    isActive
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {/* スウォッチ */}
                  <div className="flex gap-0.5 shrink-0">
                    {palette.swatches.map((hex, i) => (
                      <span
                        key={i}
                        className="w-4 h-4 rounded-full border border-white/50 shadow-sm"
                        style={{ backgroundColor: hex }}
                      />
                    ))}
                  </div>
                  {/* テキスト */}
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold leading-none ${isActive ? 'text-white' : 'text-gray-800'}`}>
                      {palette.id}. {palette.nameJa}
                    </p>
                    <p className={`text-[10px] mt-0.5 truncate ${isActive ? 'text-white/60' : 'text-gray-400'}`}>
                      {palette.description}
                    </p>
                  </div>
                  {isActive && (
                    <span className="ml-auto shrink-0 text-[9px] bg-white/20 text-white px-1.5 py-0.5 rounded-full">
                      適用中
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* リセット */}
          {activePaletteId !== currentPaletteId && (
            <button
              onClick={resetToDefault}
              className="w-full mt-3 text-[11px] text-gray-400 hover:text-gray-600 py-2 border-t border-gray-100 transition-colors"
            >
              ↩ デプロイ設定（パレット{currentPaletteId}）に戻す
            </button>
          )}

          {/* 凡例 */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="text-[10px] text-gray-400 leading-relaxed">
              環境変数 <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_COLOR_PALETTE=N</code> でデプロイ時のデフォルトを設定できます。
            </p>
          </div>
        </div>
      )}

      {/* ── フローティングボタン ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-900 text-white text-xs font-medium px-3 py-2 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200 select-none"
        title="パレット切替"
      >
        {/* 現在のパレットのスウォッチミニ */}
        <div className="flex gap-0.5">
          {activePalette.swatches.slice(0, 3).map((hex, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full border border-white/30"
              style={{ backgroundColor: hex }}
            />
          ))}
        </div>
        <Palette className="w-3.5 h-3.5" />
        <span>P{activePaletteId}</span>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
      </button>
    </div>
  );
}
