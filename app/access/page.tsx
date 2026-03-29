import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { MapPin, Clock, Train, ChevronRight, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'アクセス',
  description: '南流山TANABEピアノ教室のアクセス情報。南流山駅北口より徒歩1分。',
};

const hours = [
  { day: '月曜日', time: '13:00〜21:00', open: true },
  { day: '火曜日', time: '13:00〜21:00', open: true },
  { day: '水曜日', time: '13:00〜21:00', open: true },
  { day: '木曜日', time: '13:00〜21:00', open: true },
  { day: '金曜日', time: '13:00〜21:00', open: true },
  { day: '土曜日', time: '9:00〜19:00', open: true },
  { day: '日曜日', time: '9:00〜19:00', open: true },
];

export default function AccessPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-gradient-to-br from-cream to-teal-light py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 text-6xl text-teal/10 font-serif">♪</div>
          <div className="absolute bottom-10 left-10 text-5xl text-primary/10 font-serif">♫</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-widest text-teal uppercase font-sans mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-8 h-px bg-teal"></span>
            Access
            <span className="inline-block w-8 h-px bg-teal"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            アクセス
          </h1>
          <p className="mt-4 text-muted-text">
            南流山駅北口より徒歩1分の好立地です。
          </p>
        </div>
      </div>

      {/* Map and Info */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-md h-96 lg:h-auto">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.7!2d139.9!3d35.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c4000000001%3A0x1!2z5Y2X5rW35bGx!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="南流山TANABEピアノ教室の地図"
              />
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif font-medium text-dark-text mb-6">
                  教室情報
                </h2>
              </div>

              <div className="bg-warm-bg rounded-3xl p-6 space-y-5">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1">住所</p>
                    <p className="text-muted-text">
                      〒270-0163<br />
                      千葉県流山市南流山4丁目1-7（3階）
                    </p>
                    <a
                      href="https://maps.google.com/?q=千葉県流山市南流山4丁目1-7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline mt-1 inline-block"
                    >
                      Google マップで開く →
                    </a>
                  </div>
                </div>

                <div className="border-t border-white pt-5 flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-light flex items-center justify-center shrink-0">
                    <Train className="w-6 h-6 text-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1">最寄り駅</p>
                    <p className="text-muted-text">
                      JR武蔵野線・つくばエクスプレス<br />
                      <span className="font-medium text-dark-text">南流山駅</span>
                      北口より
                      <span className="text-primary font-bold">徒歩1分</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <div className="flex items-center gap-2 p-5 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium text-dark-text">レッスン時間</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {hours.map((hour) => (
                    <div
                      key={hour.day}
                      className="flex justify-between items-center px-5 py-3"
                    >
                      <span className="text-sm text-dark-text">{hour.day}</span>
                      <span className={`text-sm font-medium ${hour.open ? 'text-teal' : 'text-muted-text'}`}>
                        {hour.open ? hour.time : '休講'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="p-4 bg-warm-bg/50 text-xs text-muted-text">
                  ※ 祝日や長期休暇中は変更になる場合があります
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direction guide */}
      <section className="py-24 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Direction" title="道順案内" centered />

          <div className="bg-white rounded-3xl p-8 md:p-12">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="w-0.5 h-full bg-teal/20 mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="font-medium text-dark-text mb-2">南流山駅に到着</h3>
                  <p className="text-muted-text text-sm leading-relaxed">
                    JR武蔵野線またはつくばエクスプレスを利用して「南流山駅」で下車してください。
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="w-0.5 h-full bg-teal/20 mt-2" />
                </div>
                <div className="pb-8">
                  <h3 className="font-medium text-dark-text mb-2">北口から出る</h3>
                  <p className="text-muted-text text-sm leading-relaxed">
                    駅の<span className="text-teal font-medium">北口</span>から外に出てください。
                    改札を出たら右手（北）方向に進みます。
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-dark-text mb-2">徒歩約1分で到着</h3>
                  <p className="text-muted-text text-sm leading-relaxed">
                    北口を出てすぐ、<span className="text-primary font-medium">南流山4丁目1-7のビル3階</span>が教室です。
                    駅からわずか<span className="text-primary font-bold">徒歩1分</span>で到着できます。
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-muted-text text-sm text-center">
                ご不明な点はお気軽にお問い合わせください
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal to-teal-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-white mb-4">
            体験レッスンのお申し込みはこちら
          </h2>
          <p className="text-white/80 mb-8">
            まずはお気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-teal px-10 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              お問い合わせフォーム
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://line.me/R/ti/p/@tanabepiano"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-10 py-4 rounded-full font-medium hover:bg-[#05b04d] transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              LINEで連絡する
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
