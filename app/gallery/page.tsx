import { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'フォトギャラリー',
  description: '南流山TANABEピアノ教室の教室の様子や発表会の写真です。',
};

const galleryCategories = [
  { id: 'classroom', label: '教室の様子', emoji: '🎹' },
  { id: 'recital', label: '発表会', emoji: '🎵' },
  { id: 'lesson', label: 'レッスン風景', emoji: '🎼' },
];

// Placeholder gallery items - in production these would come from a CMS or database
const galleryItems = [
  { id: 1, category: 'classroom', alt: '教室の様子', gradient: 'from-primary-light to-teal-light', emoji: '🎹' },
  { id: 2, category: 'recital', alt: '春の発表会', gradient: 'from-teal-light to-cream', emoji: '🌸' },
  { id: 3, category: 'lesson', alt: 'レッスン風景', gradient: 'from-warm-bg to-primary-light', emoji: '🎵' },
  { id: 4, category: 'classroom', alt: 'グランドピアノ', gradient: 'from-primary-light to-cream', emoji: '🎼' },
  { id: 5, category: 'recital', alt: '発表会の様子', gradient: 'from-teal-light to-primary-light', emoji: '⭐' },
  { id: 6, category: 'lesson', alt: '子供のレッスン', gradient: 'from-cream to-teal-light', emoji: '🌟' },
  { id: 7, category: 'classroom', alt: '教室入口', gradient: 'from-warm-bg to-teal-light', emoji: '🏢' },
  { id: 8, category: 'recital', alt: 'ステージ演奏', gradient: 'from-primary-light to-warm-bg', emoji: '🎤' },
  { id: 9, category: 'lesson', alt: '大人のレッスン', gradient: 'from-teal-light to-warm-bg', emoji: '🎵' },
];

export default function GalleryPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-gradient-to-br from-cream via-teal-light to-primary-light py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 text-6xl text-teal/10 font-serif">♪</div>
          <div className="absolute bottom-10 left-10 text-5xl text-primary/10 font-serif">♫</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-widest text-teal uppercase font-sans mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-8 h-px bg-teal"></span>
            Gallery
            <span className="inline-block w-8 h-px bg-teal"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            フォトギャラリー
          </h1>
          <p className="mt-4 text-muted-text">
            教室の様子や発表会の写真をご覧ください。
          </p>
        </div>
      </div>

      {/* Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium">
              すべて
            </button>
            {galleryCategories.map((cat) => (
              <button
                key={cat.id}
                className="px-5 py-2 rounded-full border border-gray-200 text-muted-text text-sm font-medium hover:border-primary hover:text-primary transition-colors"
              >
                {cat.emoji} {cat.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-2xl md:rounded-3xl overflow-hidden aspect-square cursor-pointer"
              >
                <div
                  className={`w-full h-full bg-gradient-to-br ${item.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}
                >
                  <div className="text-center">
                    <div className="text-5xl md:text-7xl mb-2">{item.emoji}</div>
                    <p className="text-xs text-muted-text opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.alt}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-dark-text/0 group-hover:bg-dark-text/20 transition-all duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-warm-bg rounded-2xl px-8 py-6">
              <p className="text-muted-text text-sm leading-relaxed">
                ♪ 実際の教室の写真は準備中です。<br />
                教室の雰囲気は体験レッスンでご確認いただけます。
              </p>
              <Link href="/contact" className="mt-4 btn-primary text-sm px-6 py-2.5 inline-flex">
                体験レッスンを申し込む
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recital section */}
      <section className="py-24 bg-warm-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm tracking-widest text-primary uppercase font-sans mb-3 flex items-center justify-center gap-2">
              <span className="inline-block w-8 h-px bg-primary"></span>
              Recital
            </p>
            <h2 className="text-3xl font-serif font-medium text-dark-text">発表会について</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                emoji: '🎵',
                title: '年1回の発表会',
                description: '毎年春に発表会を開催。生徒さん全員が参加でき、練習の成果を披露します。',
              },
              {
                emoji: '👨‍👩‍👧‍👦',
                title: 'ご家族も歓迎',
                description: '保護者の方やご家族も観覧できます。お子様の成長を一緒に喜びましょう。',
              },
              {
                emoji: '🏆',
                title: '努力賞の表彰も',
                description: '発表会では、2ヶ月ごとの努力賞の表彰も行います。頑張りを全員の前で称えます。',
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 text-center shadow-sm">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="font-serif font-medium text-dark-text mb-2">{item.title}</h3>
                <p className="text-sm text-muted-text leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
