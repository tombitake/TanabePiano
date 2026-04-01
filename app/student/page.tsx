'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, BookOpen, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { formatMonthLabel } from '@/lib/utils';
import { MonthCalendar } from '@/components/ui/MonthCalendar';

interface Schedule {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  studentId?: string;
  isPublic: boolean;
  student?: {
    id: string;
    name: string;
    email: string;
  };
}

interface StudioDay {
  id: string;
  date: string;
  note?: string | null;
}

type GroupedSchedules = Record<string, Schedule[]>;

function formatScheduleDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日（${days[date.getDay()]}）`;
}

export default function StudentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [studioDays, setStudioDays] = useState<StudioDay[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchAll();
    }
  }, [session]);

  const fetchAll = async () => {
    try {
      const [schedulesRes, studioDaysRes] = await Promise.all([
        fetch('/api/schedules'),
        fetch('/api/studio-days'),
      ]);

      if (!schedulesRes.ok) throw new Error('スケジュールの取得に失敗しました');
      const schedulesData: Schedule[] = await schedulesRes.json();
      setSchedules(schedulesData);

      if (studioDaysRes.ok) {
        setStudioDays(await studioDaysRes.json());
      }

      // Expand current and next month by default
      const now = new Date();
      const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const nextMonthDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      const nextMonth = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}`;
      setExpandedMonths({ [currentMonth]: true, [nextMonth]: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMonth = (month: string) => {
    setExpandedMonths((prev) => ({ ...prev, [month]: !prev[month] }));
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-text">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (!session) return null;

  // Group schedules by month
  const groupedSchedules: GroupedSchedules = schedules.reduce((groups, schedule) => {
    const [year, month] = schedule.date.split('-');
    const key = `${year}-${month}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(schedule);
    return groups;
  }, {} as GroupedSchedules);

  const sortedMonths = Object.keys(groupedSchedules).sort();
  const mySchedules = schedules.filter((s) => s.studentId === session.user.id);
  const publicSchedules = schedules.filter((s) => s.isPublic);

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm text-muted-text mb-1">ようこそ、</p>
          <h1 className="text-3xl font-serif font-medium text-dark-text">
            {session.user.name}<span className="text-xl font-sans">さん</span>
          </h1>
          <p className="text-muted-text mt-2">レッスンスケジュールを確認できます。</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-text">今後のレッスン</span>
            </div>
            <p className="text-2xl font-serif font-medium text-dark-text">
              {mySchedules.filter((s) => s.date >= new Date().toISOString().split('T')[0]).length}
            </p>
            <p className="text-xs text-muted-text">回</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-text">総レッスン数</span>
            </div>
            <p className="text-2xl font-serif font-medium text-dark-text">
              {mySchedules.length}
            </p>
            <p className="text-xs text-muted-text">回</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-text">公開イベント</span>
            </div>
            <p className="text-2xl font-serif font-medium text-dark-text">
              {publicSchedules.length}
            </p>
            <p className="text-xs text-muted-text">件</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* ── 教室開講日カレンダー ── */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg font-medium text-dark-text">教室開講日カレンダー</h2>
          </div>
          <MonthCalendar studioDays={studioDays} />
        </div>

        {/* ── レッスンスケジュール一覧 ── */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-serif text-lg font-medium text-dark-text">レッスンスケジュール</h2>
          </div>

          {schedules.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 text-center">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-dark-text font-medium mb-2">スケジュールはありません</p>
              <p className="text-muted-text text-sm">
                レッスンスケジュールが登録されると、こちらに表示されます。
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedMonths.map((month) => {
                const monthSchedules = groupedSchedules[month];
                const isExpanded = expandedMonths[month] ?? false;
                const now = new Date().toISOString().split('T')[0];
                const hasUpcoming = monthSchedules.some((s) => s.date >= now);

                return (
                  <div key={month} className="bg-white rounded-3xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => toggleMonth(month)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-warm-bg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary-light flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h2 className="font-serif font-medium text-dark-text">
                            {formatMonthLabel(month)}
                          </h2>
                          <p className="text-xs text-muted-text">
                            {monthSchedules.length}件のスケジュール
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasUpcoming && (
                          <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full font-medium">
                            予定あり
                          </span>
                        )}
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-muted-text" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-text" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="border-t border-gray-100 divide-y divide-gray-50">
                        {monthSchedules
                          .sort((a, b) => {
                            if (a.date !== b.date) return a.date.localeCompare(b.date);
                            return a.startTime.localeCompare(b.startTime);
                          })
                          .map((schedule) => {
                            const isPast = schedule.date < now;
                            const isOwn = schedule.studentId === session.user.id;

                            return (
                              <div
                                key={schedule.id}
                                className={`p-5 ${isPast ? 'opacity-60' : ''}`}
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                  <div className="flex gap-4">
                                    <div
                                      className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                                        schedule.isPublic
                                          ? 'bg-primary'
                                          : isOwn
                                          ? 'bg-primary'
                                          : 'bg-gray-300'
                                      }`}
                                    />
                                    <div>
                                      <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-medium text-dark-text text-sm">
                                          {schedule.title}
                                        </h3>
                                        {schedule.isPublic && (
                                          <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                                            公開
                                          </span>
                                        )}
                                        {isOwn && !schedule.isPublic && (
                                          <span className="text-xs bg-primary-light text-primary px-2 py-0.5 rounded-full">
                                            マイレッスン
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-sm text-muted-text mb-1">
                                        {formatScheduleDate(schedule.date)}
                                      </p>
                                      <div className="flex items-center gap-1 text-muted-text text-xs">
                                        <Clock className="w-3.5 h-3.5" />
                                        {schedule.startTime}〜{schedule.endTime}
                                      </div>
                                      {schedule.description && (
                                        <p className="text-xs text-muted-text mt-1.5 bg-warm-bg rounded-lg px-3 py-1.5">
                                          {schedule.description}
                                        </p>
                                      )}
                                    </div>
                                  </div>
                                  {isPast && (
                                    <span className="text-xs text-muted-text bg-gray-100 px-2 py-1 rounded-full h-fit self-start">
                                      終了
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
