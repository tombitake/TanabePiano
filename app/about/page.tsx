import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { Award, Music, Heart, Star, GraduationCap, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '教室・講師紹介',
  description: '南流山TANABEピアノ教室の講師・田辺いつ美のプロフィールと教室についての紹介です。',
};

const achievements = [
  '音楽大学ピアノ専攻卒業',
  '保育士資格取得',
  'ヤマハ認定グレード取得',
  '20年以上の指導経験',
];

const teachingPhilosophy = [
  {
    icon: Heart,
    title: '音楽を好きになってもらうこと',
    description: '何より大切にしているのは、生徒さんに音楽を好きになってもらうことです。レッスンが楽しい時間になるよう、いつも工夫しています。',
  },
  {
    icon: Star,
    title: '一人ひとりに寄り添う指導',
    description: '生徒さんそれぞれの個性や成長スピードを大切に、その子に合ったレッスンプランを作成します。',
  },
  {
    icon: Music,
    title: '音楽の基礎をしっかりと',
    description: 'ソルフェージュを取り入れることで、楽譜を読む力や音感を養い、長く音楽を楽しめる力をつけます。',
  },
  {
    icon: Award,
    title: 'がんばりを認める',
    description: '2ヶ月ごとの努力賞制度で、生徒さんの努力を見える形で認めます。「自分は頑張っている」という自信を育みます。',
  },
];

export default function AboutPage() {
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
            About
            <span className="inline-block w-8 h-px bg-primary"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            教室・講師紹介
          </h1>
        </div>
      </div>

      {/* Teacher Profile */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Profile Image area */}
            <div className="relative">
              <div className="w-full aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-primary-light via-cream to-teal-light flex items-center justify-center shadow-xl">
                <div className="text-center p-12">
                  <div className="w-40 h-40 rounded-full bg-white/70 mx-auto mb-6 flex items-center justify-center text-7xl shadow-inner">
                    🎹
                  </div>
                  <p className="font-serif text-3xl font-medium text-dark-text">田辺 いつ美</p>
                  <p className="text-primary mt-2">代表講師</p>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-teal/15 -z-10" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-primary/15 -z-10" />
              {/* Music notes */}
              <div className="absolute top-4 left-4 text-3xl text-primary/30 font-serif">♪</div>
              <div className="absolute bottom-8 right-4 text-2xl text-teal/30 font-serif">♫</div>
            </div>

            {/* Profile text */}
            <div>
              <p className="text-sm tracking-widest text-primary uppercase font-sans mb-3 flex items-center gap-2">
                <span className="inline-block w-8 h-px bg-primary"></span>
                Teacher Profile
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-dark-text mb-2">
                田辺 いつ美
              </h2>
              <p className="text-primary text-sm mb-6">代表講師 / TANABE Itsumi</p>

              <div className="space-y-4 text-muted-text leading-relaxed">
                <p>
                  幼少期よりピアノを始め、音楽大学ピアノ専攻を卒業後、
                  ピアノ指導者としての道を歩んでまいりました。
                </p>
                <p>
                  「音楽は生涯の宝物」という信念のもと、技術だけでなく
                  音楽を心から楽しむ力を育てることを大切にしています。
                </p>
                <p>
                  お子様が初めてピアノに触れる喜び、大人の方が憧れの曲を弾けた感動。
                  そのような特別な瞬間を一緒に作っていけることが、
                  私の最大の喜びです。
                </p>
              </div>

              {/* Achievements */}
              <div className="mt-8">
                <h3 className="font-serif font-medium text-dark-text mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  経歴・資格
                </h3>
                <ul className="space-y-2">
                  {achievements.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-muted-text text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-24 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Philosophy"
            title="レッスンで大切にしていること"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {teachingPhilosophy.map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-primary-light flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-medium text-dark-text mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Studio"
            title="教室のご案内"
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: '🏢',
                title: '清潔で快適な空間',
                description: '南流山駅北口から徒歩1分のビル3階にある明るく清潔な教室です。駅近なので雨の日も安心です。',
              },
              {
                emoji: '🎹',
                title: 'グランドピアノ完備',
                description: '本格的なグランドピアノを使用したレッスンで、豊かな音の表現力を養います。',
              },
              {
                emoji: '👶',
                title: 'お子様歓迎',
                description: '2歳半からのぷれびあのコースから対応。小さなお子様も安心して通える環境です。',
              },
            ].map((item) => (
              <div key={item.title} className="text-center group">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-light to-teal-light mx-auto mb-4 flex items-center justify-center text-4xl group-hover:shadow-md transition-all duration-300">
                  {item.emoji}
                </div>
                <h3 className="font-serif text-lg font-medium text-dark-text mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-medium text-white mb-4">
            まずは体験レッスンへ
          </h2>
          <p className="text-white/80 mb-8">
            教室の雰囲気を実際に感じていただける体験レッスンを随時受け付けています。
          </p>
          <Link
            href="/contact"
            className="bg-white text-primary px-10 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 inline-flex items-center gap-2"
          >
            体験レッスンを申し込む
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
