'use client';

import { useState, useEffect, Suspense } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Music, Eye, EyeOff, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/Button';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      const redirectTo = session.user.role === 'TEACHER' ? '/teacher' : '/student';
      router.push(redirectTo);
    }
  }, [session, router]);

  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError === 'AccessDenied') {
      setError('アクセスが拒否されました。権限を確認してください。');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError('メールアドレスまたはパスワードが正しくありません。');
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-primary-light to-teal-light flex items-center justify-center py-20 px-4">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 text-5xl text-primary/10 font-serif animate-float">♪</div>
        <div className="absolute top-40 right-20 text-4xl text-teal/10 font-serif animate-float-delay">♫</div>
        <div className="absolute bottom-20 left-1/4 text-6xl text-primary/10 font-serif animate-float-delay2">♩</div>
        <div className="absolute bottom-40 right-10 text-4xl text-teal/10 font-serif animate-float">♬</div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-lg">
              <Music className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-text">南流山</p>
              <p className="font-serif text-xl font-medium text-dark-text">TANABEピアノ教室</p>
            </div>
          </Link>
        </div>

        {/* Form card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10">
          <h1 className="text-2xl font-serif font-medium text-dark-text text-center mb-2">
            ログイン
          </h1>
          <p className="text-sm text-muted-text text-center mb-8">
            生徒・先生の方はこちらからログインしてください
          </p>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@email.com"
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text placeholder-gray-300 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-text mb-2">
                パスワード
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text placeholder-gray-300 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text hover:text-dark-text transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full py-3.5"
            >
              <LogIn className="w-4 h-4" />
              ログイン
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-muted-text text-center">
              パスワードをお忘れの方は
              <Link href="/contact" className="text-primary hover:underline">
                お問い合わせ
              </Link>
              ください
            </p>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">👩‍🎓</div>
            <p className="text-xs font-medium text-dark-text">生徒の方</p>
            <p className="text-xs text-muted-text mt-1">スケジュールを確認できます</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center">
            <div className="text-2xl mb-1">👩‍🏫</div>
            <p className="text-xs font-medium text-dark-text">先生の方</p>
            <p className="text-xs text-muted-text mt-1">管理機能にアクセスできます</p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link href="/" className="text-sm text-muted-text hover:text-primary transition-colors">
            ← トップページへ戻る
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
