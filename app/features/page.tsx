import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { Award, Music, Heart, MapPin, ChevronRight, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '教室の特徴',
  description: '南流山TANABEピアノ教室の4つの特徴：努力賞制度、ソルフェージュ、提案型レッスン、駅徒歩1分。',
};

const features = [
  {
    icon: Award,
    number: '01',
    title: '2ヶ月ごとの努力賞制度',
    subtitle: '頑張りを数字で可視化',
    description: `当教室独自の「努力賞制度」では、2ヶ月ごとに生徒さんの頑張りを評価し、特に努力した生徒さんを表彰しています。

練習回数、曲の習得数、レッスンへの積極性など、様々な面から評価することで、「自分は頑張っている」という自信と達成感を育みます。

ピアノの上達は目に見えにくいことがありますが、この制度によって自分の成長を実感できます。継続することの喜びを、子どもたちと一緒に感じていきます。`,
    points: [
      '練習回数・曲習得数などを総合評価',
      '2ヶ月ごとに表彰式を開催',
      '成長の見える化で継続力アップ',
      '自信と達成感を育む',
    ],
    color: 'primary',
    bgGradient: 'from-primary-light to-cream',
  },
  {
    icon: Music,
    number: '02',
    title: 'ソルフェージュを取り入れたレッスン',
    subtitle: '音楽を深く理解する力を育む',
    description: `ソルフェージュとは、音楽の読み書きや聴音などの基礎的な音楽訓練です。TANABEピアノ教室では、ピアノ演奏と並行してソルフェージュを学びます。

楽譜を見て歌う「視唱」、聞いた音を楽譜に書く「聴音」、リズムの練習など、総合的な音楽力を身につけることで、どんな曲でも自分で楽譜を読んで弾けるようになります。

年齢や習熟度に合わせて、楽しくソルフェージュを学べるよう工夫しています。`,
    points: [
      '視唱・聴音・リズム練習を取り入れ',
      '楽譜が読めるようになる',
      '豊かな音感を育む',
      '年齢・レベルに合わせた指導',
    ],
    color: 'teal',
    bgGradient: 'from-teal-light to-cream',
  },
  {
    icon: Heart,
    number: '03',
    title: '提案型レッスン',
    subtitle: '生徒さんの気持ちを大切に',
    description: `「弾きたい曲がある」「この部分が難しい」「発表会に向けて頑張りたい」など、生徒さんの気持ちや目標を大切にしたレッスンを行います。

先生が一方的に教えるのではなく、生徒さんと対話しながら、「今何を目指すか」「どうすれば楽しく上達できるか」を一緒に考えます。

自分の意見を言える環境を作ることで、音楽への主体性と探求心を育みます。`,
    points: [
      '弾きたい曲を尊重',
      '生徒さんとの対話を重視',
      '目標を一緒に設定',
      '主体性と探求心を育む',
    ],
    color: 'primary',
    bgGradient: 'from-warm-bg to-primary-light',
  },
  {
    icon: MapPin,
    number: '04',
    title: '駅から徒歩1分の好立地',
    subtitle: '通いやすさへのこだわり',
    description: `JR武蔵野線・つくばエクスプレス 南流山駅北口より徒歩わずか1分。駅近なので雨の日も安心して通えます。

月・火・水・木・金は13:00〜21:00、土・日は9:00〜19:00と幅広い時間帯でレッスンを行っています。

学校や仕事の後でも通いやすい時間帯に対応しており、忙しいご家族の方にも好評いただいています。`,
    points: [
      '南流山駅北口から徒歩1分',
      '月〜日曜日レッスン対応',
      '平日は13:00〜21:00まで',
      '雨の日も安心の駅近立地',
    ],
    color: 'teal',
    bgGradient: 'from-teal-light to-warm-bg',
  },
];

export default function FeaturesPage() {
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
            Features
            <span className="inline-block w-8 h-px bg-teal"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            教室の特徴
          </h1>
          <p className="mt-4 text-muted-text max-w-2xl mx-auto">
            TANABEピアノ教室が大切にしている4つの特徴をご紹介します。
          </p>
        </div>
      </div>

      {/* Features detail */}
      <div className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {features.map((feature, index) => (
            <div
              key={feature.number}
              className={`grid md:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'md:grid-flow-col-dense' : ''
              }`}
            >
              {/* Visual */}
              <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                <div
                  className={`rounded-3xl bg-gradient-to-br ${feature.bgGradient} p-12 relative overflow-hidden min-h-64 flex items-center justify-center`}
                >
                  <div className="text-center">
                    <div
                      className={`w-24 h-24 rounded-3xl mx-auto mb-6 flex items-center justify-center ${
                        feature.color === 'primary' ? 'bg-primary' : 'bg-teal'
                      } shadow-lg`}
                    >
                      <feature.icon className="w-12 h-12 text-white" />
                    </div>
                    <p
                      className={`text-6xl font-serif font-bold ${
                        feature.color === 'primary' ? 'text-primary/20' : 'text-teal/20'
                      }`}
                    >
                      {feature.number}
                    </p>
                  </div>
                  {/* Decorative */}
                  <div className="absolute top-4 right-4 text-3xl opacity-20 font-serif">♪</div>
                  <div className="absolute bottom-4 left-4 text-2xl opacity-20 font-serif">♫</div>
                </div>
              </div>

              {/* Content */}
              <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                <p
                  className={`text-sm font-medium mb-2 ${
                    feature.color === 'primary' ? 'text-primary' : 'text-teal'
                  }`}
                >
                  Feature {feature.number}
                </p>
                <h2 className="text-2xl md:text-3xl font-serif font-medium text-dark-text mb-2">
                  {feature.title}
                </h2>
                <p className="text-muted-text text-sm mb-4">{feature.subtitle}</p>
                <div className="text-muted-text leading-relaxed text-sm space-y-3 mb-6">
                  {feature.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <ul className="space-y-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-sm text-dark-text">
                      <CheckCircle
                        className={`w-5 h-5 shrink-0 ${
                          feature.color === 'primary' ? 'text-primary' : 'text-teal'
                        }`}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-teal to-teal-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-white mb-4">
            実際にレッスンを体験してみませんか？
          </h2>
          <p className="text-white/80 mb-8">
            百聞は一見にしかず。体験レッスンで、TANABEピアノ教室の魅力を感じてください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-teal px-10 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              体験レッスンを申し込む
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link
              href="/courses"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-teal transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              コースを見る
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
