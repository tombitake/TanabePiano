'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PreviewLoginForm({ redirectTo }: { redirectTo: string }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/preview-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push(redirectTo);
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error ?? 'エラーが発生しました');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🎹</div>
          <h1 className="text-2xl font-bold text-dark-text mb-1">TANABEピアノ教室</h1>
          <p className="text-sm text-muted-text">試作版プレビュー</p>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary/10">
          <p className="text-sm text-muted-text text-center mb-6">
            このサイトは関係者のみ閲覧可能です。<br />
            アクセスコードを入力してください。
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted-text mb-1.5">
                アクセスコード
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/80 text-dark-text placeholder-muted-text/40 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition"
                autoFocus
                required
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '確認中...' : 'プレビューを開く'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-text/50 mt-6">
          ※ このページは一般公開されていません
        </p>
      </div>
    </div>
  );
}
