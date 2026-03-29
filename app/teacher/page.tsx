'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  FileText,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// ---- Types ----
interface Schedule {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  studentId?: string;
  isPublic: boolean;
  student?: { id: string; name: string; email: string };
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  published: boolean;
  createdAt: string;
}

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
}

// ---- Helpers ----
function formatScheduleDate(dateStr: string): string {
  const date = new Date(dateStr);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}（${days[date.getDay()]}）`;
}

function generateSlug(title: string): string {
  const timestamp = Date.now();
  const base = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  return base ? `${base}-${timestamp}` : `post-${timestamp}`;
}

// ---- Schedule Form ----
const emptySchedule = {
  title: '',
  date: '',
  startTime: '',
  endTime: '',
  description: '',
  studentId: '',
  isPublic: false,
};

function ScheduleForm({
  initial,
  students,
  onSave,
  onCancel,
}: {
  initial: Partial<typeof emptySchedule>;
  students: Student[];
  onSave: (data: typeof emptySchedule) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...emptySchedule, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await onSave(form);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-warm-bg rounded-2xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-muted-text mb-1">タイトル *</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-text mb-1">日付 *</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-text mb-1">生徒</label>
          <select
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none bg-white"
          >
            <option value="">（指定なし）</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-text mb-1">開始時刻 *</label>
          <input
            type="time"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-text mb-1">終了時刻 *</label>
          <input
            type="time"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-muted-text mb-1">メモ</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={form.isPublic}
            onChange={handleChange}
            className="w-4 h-4 accent-primary"
          />
          <label htmlFor="isPublic" className="text-sm text-dark-text cursor-pointer">
            全生徒に公開する
          </label>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={saving} size="sm">
          <Save className="w-4 h-4" />
          保存
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  );
}

// ---- Blog Form ----
const emptyPost = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  published: false,
};

function BlogForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: Partial<typeof emptyPost>;
  onSave: (data: typeof emptyPost) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ ...emptyPost, ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: prev.slug || generateSlug(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const slug = form.slug || generateSlug(form.title);
      await onSave({ ...form, slug });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'エラーが発生しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 bg-warm-bg rounded-2xl">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl p-3">{error}</p>
      )}
      <div>
        <label className="block text-xs font-medium text-muted-text mb-1">タイトル *</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleTitleChange}
          required
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-text mb-1">スラッグ（URL）</label>
        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="auto-generated-if-empty"
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none font-mono"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-text mb-1">抜粋（一覧に表示される説明）</label>
        <input
          type="text"
          name="excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-muted-text mb-1">本文 *</label>
        <p className="text-xs text-muted-text mb-2">
          ## 見出し2、### 見出し3、**太字**、- リスト項目 が使えます
        </p>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          required
          rows={10}
          className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none font-mono"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          checked={form.published}
          onChange={handleChange}
          className="w-4 h-4 accent-primary"
        />
        <label htmlFor="published" className="text-sm text-dark-text cursor-pointer">
          公開する
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <Button type="submit" isLoading={saving} size="sm">
          <Save className="w-4 h-4" />
          保存
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          キャンセル
        </Button>
      </div>
    </form>
  );
}

// ---- Main Page ----
export default function TeacherPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'schedules' | 'blog' | 'contacts'>('schedules');

  // Data states
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // UI states
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user.role !== 'TEACHER' && status === 'authenticated') {
      router.push('/student');
    }
  }, [status, session, router]);

  useEffect(() => {
    if (session?.user.role === 'TEACHER') {
      fetchAll();
    }
  }, [session]);

  const fetchAll = async () => {
    setIsLoading(true);
    try {
      const [schedulesRes, postsRes, messagesRes, studentsRes] = await Promise.all([
        fetch('/api/schedules'),
        fetch('/api/blog'),
        fetch('/api/contact'),
        fetch('/api/users/students').catch(() => null),
      ]);

      if (schedulesRes.ok) setSchedules(await schedulesRes.json());
      if (postsRes.ok) setPosts(await postsRes.json());
      if (messagesRes.ok) setMessages(await messagesRes.json());

      // Extract students from schedules as fallback
      const schedulesData: Schedule[] = schedulesRes.ok ? await schedulesRes.clone().json().catch(() => []) : [];
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Get unique students from schedules
  useEffect(() => {
    const studentMap = new Map<string, Student>();
    schedules.forEach((s) => {
      if (s.student) {
        studentMap.set(s.student.id, s.student);
      }
    });
    setStudents(Array.from(studentMap.values()));
  }, [schedules]);

  // Schedule CRUD
  const handleSaveSchedule = async (data: typeof emptySchedule) => {
    if (editingSchedule) {
      const res = await fetch(`/api/schedules/${editingSchedule.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('更新に失敗しました');
      const updated = await res.json();
      setSchedules((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      setEditingSchedule(null);
    } else {
      const res = await fetch('/api/schedules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('作成に失敗しました');
      const created = await res.json();
      setSchedules((prev) => [...prev, created]);
      setShowScheduleForm(false);
    }
  };

  const handleDeleteSchedule = async (id: string) => {
    if (!confirm('このスケジュールを削除しますか？')) return;
    const res = await fetch(`/api/schedules/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setSchedules((prev) => prev.filter((s) => s.id !== id));
    }
  };

  // Blog CRUD
  const handleSavePost = async (data: typeof emptyPost) => {
    if (editingPost) {
      const res = await fetch(`/api/blog/${editingPost.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('更新に失敗しました');
      const updated = await res.json();
      setPosts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      setEditingPost(null);
    } else {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || '作成に失敗しました');
      }
      const created = await res.json();
      setPosts((prev) => [created, ...prev]);
      setShowPostForm(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('この記事を削除しますか？')) return;
    const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleMarkRead = async (id: string, read: boolean) => {
    const res = await fetch('/api/contact', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read }),
    });
    if (res.ok) {
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, read } : m)));
    }
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

  if (!session || session.user.role !== 'TEACHER') return null;

  const unreadCount = messages.filter((m) => !m.read).length;
  const sortedSchedules = [...schedules].sort((a, b) =>
    a.date !== b.date ? a.date.localeCompare(b.date) : a.startTime.localeCompare(b.startTime)
  );

  return (
    <div className="min-h-screen bg-cream pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium text-dark-text">
            先生ダッシュボード
          </h1>
          <p className="text-muted-text mt-1">ようこそ、{session.user.name}先生</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-text">スケジュール</span>
            </div>
            <p className="text-2xl font-serif font-medium text-dark-text">{schedules.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-5 h-5 text-teal" />
              <span className="text-sm text-muted-text">ブログ記事</span>
            </div>
            <p className="text-2xl font-serif font-medium text-dark-text">{posts.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-text">未読メッセージ</span>
            </div>
            <p className="text-2xl font-serif font-medium text-dark-text">{unreadCount}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="flex border-b border-gray-100">
            {[
              { key: 'schedules', label: 'スケジュール管理', icon: Calendar },
              { key: 'blog', label: 'ブログ管理', icon: FileText },
              {
                key: 'contacts',
                label: 'お問い合わせ',
                icon: MessageSquare,
                badge: unreadCount,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === tab.key
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-text hover:text-dark-text'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.badge ? (
                  <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* ---- Schedules Tab ---- */}
            {activeTab === 'schedules' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-xl font-medium text-dark-text">
                    スケジュール一覧
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowScheduleForm(true);
                      setEditingSchedule(null);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    追加
                  </Button>
                </div>

                {(showScheduleForm && !editingSchedule) && (
                  <div className="mb-6">
                    <ScheduleForm
                      initial={emptySchedule}
                      students={students}
                      onSave={handleSaveSchedule}
                      onCancel={() => setShowScheduleForm(false)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  {sortedSchedules.length === 0 ? (
                    <p className="text-center text-muted-text py-12">
                      スケジュールがありません
                    </p>
                  ) : (
                    sortedSchedules.map((schedule) => (
                      <div key={schedule.id}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-warm-bg rounded-2xl hover:bg-white transition-colors">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-3 h-3 rounded-full mt-1.5 shrink-0 ${
                                schedule.isPublic ? 'bg-teal' : 'bg-primary'
                              }`}
                            />
                            <div>
                              <p className="font-medium text-dark-text text-sm">
                                {schedule.title}
                                {schedule.isPublic && (
                                  <span className="ml-2 text-xs bg-teal-light text-teal px-2 py-0.5 rounded-full">
                                    公開
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-muted-text mt-0.5">
                                {formatScheduleDate(schedule.date)} {schedule.startTime}〜{schedule.endTime}
                                {schedule.student && ` ｜ ${schedule.student.name}`}
                              </p>
                              {schedule.description && (
                                <p className="text-xs text-muted-text mt-1">{schedule.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => setEditingSchedule(schedule)}
                              className="p-2 text-muted-text hover:text-primary hover:bg-primary-light rounded-xl transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteSchedule(schedule.id)}
                              className="p-2 text-muted-text hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {editingSchedule?.id === schedule.id && (
                          <div className="mt-2">
                            <ScheduleForm
                              initial={editingSchedule}
                              students={students}
                              onSave={handleSaveSchedule}
                              onCancel={() => setEditingSchedule(null)}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ---- Blog Tab ---- */}
            {activeTab === 'blog' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-serif text-xl font-medium text-dark-text">
                    ブログ記事一覧
                  </h2>
                  <Button
                    size="sm"
                    onClick={() => {
                      setShowPostForm(true);
                      setEditingPost(null);
                    }}
                  >
                    <Plus className="w-4 h-4" />
                    新規作成
                  </Button>
                </div>

                {(showPostForm && !editingPost) && (
                  <div className="mb-6">
                    <BlogForm
                      initial={emptyPost}
                      onSave={handleSavePost}
                      onCancel={() => setShowPostForm(false)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  {posts.length === 0 ? (
                    <p className="text-center text-muted-text py-12">
                      記事がありません
                    </p>
                  ) : (
                    posts.map((post) => (
                      <div key={post.id}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 bg-warm-bg rounded-2xl hover:bg-white transition-colors">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-dark-text text-sm">{post.title}</p>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full ${
                                  post.published
                                    ? 'bg-teal-light text-teal'
                                    : 'bg-gray-100 text-muted-text'
                                }`}
                              >
                                {post.published ? '公開中' : '下書き'}
                              </span>
                            </div>
                            <p className="text-xs text-muted-text mt-0.5">
                              {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                              {post.excerpt && ` ｜ ${post.excerpt.substring(0, 40)}...`}
                            </p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="p-2 text-muted-text hover:text-primary hover:bg-primary-light rounded-xl transition-colors"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-muted-text hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        {editingPost?.id === post.id && (
                          <div className="mt-2">
                            <BlogForm
                              initial={editingPost}
                              onSave={handleSavePost}
                              onCancel={() => setEditingPost(null)}
                            />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ---- Contacts Tab ---- */}
            {activeTab === 'contacts' && (
              <div>
                <h2 className="font-serif text-xl font-medium text-dark-text mb-6">
                  お問い合わせ一覧
                </h2>
                <div className="space-y-3">
                  {messages.length === 0 ? (
                    <p className="text-center text-muted-text py-12">
                      お問い合わせはありません
                    </p>
                  ) : (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`rounded-2xl overflow-hidden border ${
                          msg.read ? 'border-gray-100 bg-white' : 'border-primary/20 bg-primary-light/30'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              {!msg.read && (
                                <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                              )}
                              <p className="font-medium text-dark-text text-sm">{msg.subject}</p>
                            </div>
                            <p className="text-xs text-muted-text">
                              {msg.name}（{msg.email}）
                              {msg.phone && ` ｜ ${msg.phone}`}
                              ｜ {new Date(msg.createdAt).toLocaleDateString('ja-JP')}
                            </p>
                          </div>
                          <button
                            onClick={() => handleMarkRead(msg.id, !msg.read)}
                            className={`shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
                              msg.read
                                ? 'bg-gray-100 text-muted-text hover:bg-gray-200'
                                : 'bg-teal text-white hover:bg-teal-dark'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            {msg.read ? '未読に戻す' : '既読にする'}
                          </button>
                        </div>
                        <div className="px-4 pb-4">
                          <p className="text-sm text-muted-text bg-warm-bg rounded-xl p-3 leading-relaxed">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
