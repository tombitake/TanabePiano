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
    if (viewMonth === 0) {
      setViewYear((y) => y - 1);
      setViewMonth(11);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((y) => y + 1);
      setViewMonth(0);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const toDateStr = (day: number) =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  // 先頭の空セル
  const cells: (number | null)[] = Array(firstDayOfWeek).fill(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

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
        <h3 className="font-serif font-medium text-dark-text text-base">
          {viewYear}年{viewMonth + 1}月
        </h3>
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
              bgCls = 'bg-primary-light ring-1 ring-primary/30';
            } else {
              bgCls = '';
            }

            let hoverCls = '';
            if (onToggle) {
              if (isOpen) {
                hoverCls = 'hover:bg-primary-dark cursor-pointer';
              } else if (dow === 0) {
                hoverCls = 'hover:bg-red-50 cursor-pointer';
              } else if (dow === 6) {
                hoverCls = 'hover:bg-blue-50 cursor-pointer';
              } else {
                hoverCls = 'hover:bg-warm-bg cursor-pointer';
              }
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
                title={isOpen ? '開講日（クリックで解除）' : onToggle ? 'クリックで開講日に設定' : ''}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* ── 凡例 ── */}
        <div className="flex items-center gap-5 mt-4 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-[11px] text-muted-text">開講日</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-primary-light ring-1 ring-primary/30" />
            <span className="text-[11px] text-muted-text">今日</span>
          </div>
          {onToggle && (
            <p className="text-[11px] text-muted-text ml-auto">クリックで切り替え</p>
          )}
        </div>
      </div>
    </div>
  );
}
