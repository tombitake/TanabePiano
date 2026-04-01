'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StudioDay {
  id: string;
  date: string;
  note?: string | null;
}

interface MonthCalendarProps {
  /** YYYY-MM-DD 形式の開講日リスト */
  studioDays: StudioDay[];
  /** 指定すると編集可能（講師ビュー）。省略すると読み取り専用（生徒ビュー） */
  onToggle?: (date: string) => Promise<void>;
  /** 操作中のフラグ（ボタンを無効化） */
  isUpdating?: boolean;
}

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

export function MonthCalendar({ studioDays, onToggle, isUpdating }: MonthCalendarProps) {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-indexed

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const todayStr = now.toISOString().split('T')[0];

  const openDateSet = new Set(studioDays.map((d) => d.date));

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else { setViewMonth((m) => m - 1); }
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else { setViewMonth((m) => m + 1); }
  };

  const toDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // 先頭の空セル
  const cells: (number | null)[] = Array(firstDayOfWeek).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  // 今月の開講日数
  const monthPrefix = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
  const openCount = studioDays.filter((d) => d.date.startsWith(monthPrefix)).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-warm-bg">
      {/* ── ヘッダー ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-warm-bg transition-colors text-muted-text hover:text-dark-text"
          aria-label="前月"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-center">
          <h3 className="font-serif font-medium text-dark-text text-base">
            {viewYear}年{viewMonth + 1}月
          </h3>
          {openCount > 0 && (
            <p className="text-[10px] text-primary mt-0.5">開講日 {openCount}日</p>
          )}
        </div>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-warm-bg transition-colors text-muted-text hover:text-dark-text"
          aria-label="翌月"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4">
        {/* ── 曜日ヘッダー ── */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {WEEKDAYS.map((wd, i) => (
            <div
              key={wd}
              className={`text-center text-[11px] font-medium py-1 ${
                i === 0 ? 'text-red-400' : i === 6 ? 'text-blue-400' : 'text-muted-text'
              }`}
            >
              {wd}
            </div>
          ))}
        </div>

        {/* ── 日付セル ── */}
        <div className="grid grid-cols-7 gap-1">
          {cells.map((day, i) => {
            if (day === null) return <div key={`e-${i}`} />;
            const dateStr = toDateStr(day);
            const isOpen = openDateSet.has(dateStr);
            const isToday = dateStr === todayStr;
            const dow = (firstDayOfWeek + day - 1) % 7; // 0=Sun

            let textCls = '';
            if (isOpen) {
              textCls = 'text-white';
            } else if (dow === 0) {
              textCls = 'text-red-400';
            } else if (dow === 6) {
              textCls = 'text-blue-400';
            } else {
              textCls = 'text-dark-text';
            }

            let bgCls = '';
            if (isOpen) {
              bgCls = 'bg-primary shadow-sm';
            } else if (isToday) {
              bgCls = 'ring-2 ring-primary/40 bg-primary/5';
            }

            let hoverCls = '';
            if (onToggle) {
              hoverCls = isOpen ? 'hover:bg-primary-dark cursor-pointer' : 'hover:bg-warm-bg cursor-pointer';
            } else {
              hoverCls = 'cursor-default';
            }

            return (
              <button
                key={dateStr}
                onClick={() => !isUpdating && onToggle?.(dateStr)}
                disabled={!onToggle || isUpdating}
                className={`
                  aspect-square flex items-center justify-center rounded-lg
                  text-xs font-medium transition-all duration-150
                  ${textCls} ${bgCls} ${hoverCls}
                  disabled:opacity-60
                `}
                title={
                  isOpen
                    ? '開講日' + (onToggle ? '（クリックで解除）' : '')
                    : onToggle ? 'クリックで開講日に設定' : ''
                }
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* ── 凡例 (Legend) ── */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <p className="text-[10px] font-medium text-muted-text mb-2 tracking-wider uppercase">凡例</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            {/* 開講日 */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-primary flex-shrink-0 flex items-center justify-center">
                <span className="text-[9px] text-white font-bold">日</span>
              </div>
              <span className="text-[11px] text-dark-text font-medium">開講日</span>
            </div>
            {/* 今日 */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md ring-2 ring-primary/40 bg-primary/5 flex-shrink-0 flex items-center justify-center">
                <span className="text-[9px] text-primary font-bold">日</span>
              </div>
              <span className="text-[11px] text-dark-text font-medium">今日</span>
            </div>
            {/* 休日（日） */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-red-50 flex-shrink-0 flex items-center justify-center">
                <span className="text-[9px] text-red-400 font-bold">日</span>
              </div>
              <span className="text-[11px] text-muted-text">日曜日</span>
            </div>
            {/* 土曜 */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md bg-blue-50 flex-shrink-0 flex items-center justify-center">
                <span className="text-[9px] text-blue-400 font-bold">日</span>
              </div>
              <span className="text-[11px] text-muted-text">土曜日</span>
            </div>
          </div>
          {onToggle && (
            <p className="text-[10px] text-muted-text mt-2 pl-1">
              ✎ 日付をクリックして開講日をオン/オフ
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
