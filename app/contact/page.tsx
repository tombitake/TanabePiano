'use client';

import { useState } from 'react';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Button } from '@/components/ui/Button';
import { CheckCircle, Send, MessageCircle } from 'lucide-react';

const subjects = [
  '体験レッスンの申し込み',
  'コースについて',
  '料金について',
  'アクセスについて',
  'その他のご質問',
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '送信に失敗しました');
      }

      setIsSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : '送信に失敗しました。もう一度お試しください。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-gradient-to-br from-cream to-primary-light py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 text-6xl text-primary/10 font-serif">♪</div>
          <div className="absolute bottom-10 left-10 text-5xl text-teal/10 font-serif">♫</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-widest text-primary uppercase font-sans mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-8 h-px bg-primary"></span>
            Contact
            <span className="inline-block w-8 h-px bg-primary"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            お問い合わせ
          </h1>
          <p className="mt-4 text-muted-text">
            体験レッスンのお申し込みや、ご質問はこちらからお気軽にどうぞ。
          </p>
        </div>
      </div>

      {/* Contact options */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <a
              href="https://line.me/R/ti/p/@tanabepiano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-[#06C755]/10 border-2 border-[#06C755]/30 rounded-3xl p-6 hover:border-[#06C755] transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#06C755] flex items-center justify-center shrink-0">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-dark-text group-hover:text-[#06C755] transition-colors">
                  LINEで相談する
                </p>
                <p className="text-sm text-muted-text">友だち追加してお気軽に</p>
              </div>
            </a>

            <div className="flex items-center gap-4 bg-primary-light border-2 border-primary/20 rounded-3xl p-6">
              <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shrink-0">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-medium text-dark-text">フォームで送る</p>
                <p className="text-sm text-muted-text">24時間受け付けています</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {isSuccess ? (
            <div className="bg-teal-light rounded-3xl p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-teal/20 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-teal" />
              </div>
              <h2 className="text-2xl font-serif font-medium text-dark-text mb-3">
                送信完了しました！
              </h2>
              <p className="text-muted-text mb-2">
                お問い合わせありがとうございます。
              </p>
              <p className="text-muted-text text-sm">
                内容を確認の上、数日以内にご連絡いたします。<br />
                しばらくお待ちください。
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 btn-outline text-sm px-6"
              >
                別のお問い合わせをする
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12">
              <h2 className="text-xl font-serif font-medium text-dark-text mb-8 text-center">
                お問い合わせフォーム
              </h2>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      お名前 <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="田辺 花子"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text placeholder-gray-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark-text mb-2">
                      電話番号
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="090-0000-0000"
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text placeholder-gray-300 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    メールアドレス <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text placeholder-gray-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    お問い合わせ種別 <span className="text-primary">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text text-sm bg-white"
                  >
                    <option value="">選択してください</option>
                    {subjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-dark-text mb-2">
                    お問い合わせ内容 <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="ご質問・ご要望などをお書きください。体験レッスンご希望の場合は、ご希望のコース・曜日・時間帯などもお知らせください。"
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-dark-text placeholder-gray-300 text-sm resize-none"
                  />
                </div>

                <p className="text-xs text-muted-text">
                  ご入力いただいた個人情報は、お問い合わせへの回答のみに使用し、第三者への提供は行いません。
                </p>

                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  className="w-full py-4 text-base"
                >
                  <Send className="w-4 h-4" />
                  送信する
                </Button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
