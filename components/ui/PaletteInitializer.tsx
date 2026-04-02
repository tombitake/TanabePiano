'use client';

/**
 * PaletteInitializer
 * URLパラメータ ?palette=N を読み取り、CSSカスタムプロパティを即時適用する。
 * layout.tsx に配置し、全ページで動作する。
 *
 * 優先順位: URLパラメータ > localStorage > サーバー側デフォルト（env var）
 */

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { palettes, type PaletteId } from '@/lib/palettes';

const STORAGE_KEY = 'tanabe-preview-palette';

function applyPalette(id: PaletteId) {
  const palette = palettes[id];
  if (!palette) return;
  const root = document.documentElement;
  root.dataset.palette = id;
  Object.entries(palette.vars).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}

export function PaletteInitializer({ serverPaletteId }: { serverPaletteId: PaletteId }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlPalette = searchParams.get('palette') as PaletteId | null;
    const savedPalette = localStorage.getItem(STORAGE_KEY) as PaletteId | null;

    if (urlPalette && palettes[urlPalette]) {
      // URLパラメータが最優先
      applyPalette(urlPalette);
      localStorage.setItem(STORAGE_KEY, urlPalette);
    } else if (savedPalette && palettes[savedPalette]) {
      // localStorageに保存済みのパレットを復元
      applyPalette(savedPalette);
    }
    // どちらもなければ layout.tsx がサーバー側で適用したものがそのまま使われる
  }, [searchParams, serverPaletteId]);

  return null;
}
