import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { ChevronRight, Check, Clock, Calendar, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'コース一覧',
  description: 'ぷれびあのコース、幼児コース、小学生コース、大人コース、オンラインコースのご案内です。',
};

const courses = [
  {
    id: 'pre-piano',
    name: 'ぷれびあのコース',
    icon: '🌟',
    age: '2歳半〜3歳',
    frequency: '月3回',
    duration: '20分',
    price: '¥6,000',
    priceNote: '/月（税込）',
    color: 'primary',
    bgGradient: 'from-pink-100 to-primary-light',
    description: 'ピアノに初めて触れる小さなお子様のための入門コースです。音楽の楽しさを遊びながら学びます。',
    features: [
      '音楽に触れる喜びを体験',
      '手指の発達を促す課題',
      '保護者同伴でのレッスン',
      '歌・リズム遊びも取り入れ',
      'ゆっくり丁寧な指導',
    ],
    recommended: '音楽の世界に入門したいお子様に',
  },
  {
    id: 'kindergarten',
    name: '幼児コース',
    icon: '🌸',
    age: '4〜6歳',
    frequency: '月3回',
    duration: '30分',
    price: '¥7,000',
    priceNote: '/月（税込）',
    color: 'teal',
    bgGradient: 'from-teal-light to-cream',
    description: '幼稚園・保育園のお子様向けコース。基礎的なピアノ技術と音楽の基礎を楽しく学びます。',
    features: [
      '楽譜の読み方を学ぶ',
      'バイエルなど基礎教材',
      'ソルフェージュの導入',
      '発表会への参加機会',
      '手指の使い方・姿勢指導',
    ],
    recommended: '幼稚園・保育園に通うお子様に',
  },
  {
    id: 'elementary',
    name: '小学生コース',
    icon: '⭐',
    age: '小学生',
    frequency: '月3回',
    duration: '45分',
    price: '¥8,000',
    priceNote: '/月（税込）',
    color: 'primary',
    bgGradient: 'from-warm-bg to-primary-light',
    isPopular: true,
    description: '小学生のお子様向けコース。技術の向上とともに、音楽表現の豊かさを育みます。',
    features: [
      'バイエル〜上級テキストまで対応',
      'ソルフェージュ・聴音',
      '弾きたい曲にも挑戦',
      '発表会・コンテスト対応',
      '努力賞制度で継続を応援',
    ],
    recommended: '本格的にピアノを学びたい小学生に',
  },
  {
    id: 'adult',
    name: '大人コース',
    icon: '🎵',
    age: '大人（中学生以上）',
    frequency: '月2回',
    duration: '45分',
    price: '¥8,000',
    priceNote: '/月（税込）',
    color: 'teal',
    bgGradient: 'from-teal-light to-warm-bg',
    description: '大人の方向けコース。初心者から経験者まで、弾きたい曲を中心に楽しく学べます。',
    features: [
      '初心者から経験者まで歓迎',
      '弾きたい曲・ジャンルに対応',
      'マイペースで継続できる',
      '基礎から丁寧に指導',
      '忙しい方に優しい月2回',
    ],
    recommended: 'ピアノを始めたい・再開したい大人の方に',
  },
  {
    id: 'online',
    name: 'オンラインコース',
    icon: '💻',
    age: '全年齢対応',
    frequency: '月2回',
    duration: '45分',
    price: '¥7,500',
    priceNote: '/月（税込）',
    color: 'primary',
    bgGradient: 'from-primary-light to-teal-light',
    description: '自宅からZoomでレッスンが受けられるオンラインコース。遠方の方や忙しい方に最適です。',
    features: [
      'Zoomを使用したビデオレッスン',
      '全国どこからでも受講可能',
      '通学の必要なし',
      '録画でレッスン内容を復習可能',
      '通常より少しお得な料金設定',
    ],
    recommended: '遠方の方・通学が難しい方に',
  },
];

export default function CoursesPage() {
  return (
    <div className="pt-20">
      {/* Page header */}
      <div className="bg-gradient-to-br from-cream via-primary-light to-teal-light py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-20 text-7xl text-primary/10 font-serif">♪</div>
          <div className="absolute bottom-10 left-10 text-5xl text-teal/10 font-serif">♫</div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm tracking-widest text-primary uppercase font-sans mb-3 flex items-center justify-center gap-2">
            <span className="inline-block w-8 h-px bg-primary"></span>
            Courses
            <span className="inline-block w-8 h-px bg-primary"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            コース一覧
          </h1>
          <p className="mt-4 text-muted-text max-w-2xl mx-auto">
            年齢・目標・ライフスタイルに合わせて5つのコースからお選びいただけます。
          </p>
        </div>
      </div>

      {/* Courses */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {courses.map((course, index) => (
              <div
                key={course.id}
                className={`grid md:grid-cols-2 gap-10 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
                }`}
              >
                {/* Visual card */}
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div
                    className={`rounded-3xl bg-gradient-to-br ${course.bgGradient} p-10 relative overflow-hidden`}
                  >
                    {course.isPopular && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                        人気コース
                      </div>
                    )}
                    <div className="text-6xl mb-4">{course.icon}</div>
                    <h3 className="font-serif text-2xl font-medium text-dark-text mb-2">
                      {course.name}
                    </h3>
                    <p className="text-muted-text text-sm mb-6">{course.description}</p>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-white/70 rounded-2xl p-3 text-center">
                        <Users className="w-5 h-5 mx-auto mb-1 text-muted-text" />
                        <p className="text-xs text-muted-text">対象</p>
                        <p className="text-xs font-medium text-dark-text mt-0.5">{course.age}</p>
                      </div>
                      <div className="bg-white/70 rounded-2xl p-3 text-center">
                        <Calendar className="w-5 h-5 mx-auto mb-1 text-muted-text" />
                        <p className="text-xs text-muted-text">頻度</p>
                        <p className="text-xs font-medium text-dark-text mt-0.5">{course.frequency}</p>
                      </div>
                      <div className="bg-white/70 rounded-2xl p-3 text-center">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-muted-text" />
                        <p className="text-xs text-muted-text">時間</p>
                        <p className="text-xs font-medium text-dark-text mt-0.5">{course.duration}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/50">
                      <p className="text-3xl font-serif font-medium text-primary">
                        {course.price}
                        <span className="text-sm text-muted-text font-sans">{course.priceNote}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <p className={`text-sm font-medium mb-2 ${course.color === 'primary' ? 'text-primary' : 'text-teal'}`}>
                    ♪ {course.recommended}
                  </p>
                  <h2 className="text-2xl md:text-3xl font-serif font-medium text-dark-text mb-4">
                    {course.name}
                  </h2>
                  <p className="text-muted-text text-sm mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="font-medium text-dark-text mb-3">コースの特徴</h3>
                    <ul className="space-y-2">
                      {course.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-text">
                          <Check
                            className={`w-4 h-4 shrink-0 ${
                              course.color === 'primary' ? 'text-primary' : 'text-teal'
                            }`}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-full font-medium transition-all duration-300 text-sm ${
                      course.color === 'primary'
                        ? 'bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg'
                        : 'bg-teal text-white hover:bg-teal-dark shadow-md hover:shadow-lg'
                    }`}
                  >
                    体験レッスンを申し込む
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price comparison table */}
      <section className="py-24 bg-warm-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Price" title="料金一覧" />
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary to-primary-dark text-white">
                  <th className="py-4 px-6 text-left font-medium">コース</th>
                  <th className="py-4 px-4 text-center font-medium">対象</th>
                  <th className="py-4 px-4 text-center font-medium">頻度・時間</th>
                  <th className="py-4 px-6 text-right font-medium">月謝</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, index) => (
                  <tr
                    key={course.id}
                    className={`border-t border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-warm-bg/50'}`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{course.icon}</span>
                        <span className="font-medium text-dark-text text-sm">{course.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center text-sm text-muted-text">{course.age}</td>
                    <td className="py-4 px-4 text-center text-sm text-muted-text">
                      {course.frequency} {course.duration}
                    </td>
                    <td className="py-4 px-6 text-right font-serif font-medium text-primary">
                      {course.price}
                      <span className="text-xs text-muted-text font-sans">/月</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-text text-center mt-4">
            ※ 料金は全て税込みです。別途、教材費・発表会参加費が必要な場合があります。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-white mb-4">
            どのコースか迷ったら、まずご相談ください
          </h2>
          <p className="text-white/80 mb-8">
            お子様の年齢や目標に合わせて、最適なコースをご提案します。
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary px-10 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 inline-flex items-center gap-2"
          >
            お問い合わせ・体験申し込み
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
