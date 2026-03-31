import { Hero } from '@/components/sections/Hero';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Image from 'next/image';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { Award, Music, MapPin, Heart, ChevronRight, Clock, Train } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: '努力賞制度',
    description: '2ヶ月ごとに努力賞を発表。生徒さんの頑張りを数字で可視化し、モチベーションアップをサポートします。',
    color: 'primary',
  },
  {
    icon: Music,
    title: 'ソルフェージュレッスン',
    description: 'ピアノの演奏技術だけでなく、音楽を読み書きする力を育む総合的なレッスンを行います。',
    color: 'mustard',
  },
  {
    icon: Heart,
    title: '提案型レッスン',
    description: '生徒さんの気持ちを大切に、弾きたい曲や目標に合わせた提案型のレッスンスタイルです。',
    color: 'primary',
  },
  {
    icon: Train,
    title: '駅から徒歩1分',
    description: 'JR武蔵野線・つくばエクスプレス 南流山駅北口より徒歩1分の好立地です。',
    color: 'mustard',
  },
];

const courses = [
  {
    name: 'ぷれびあのコース',
    age: '2歳半〜3歳',
    frequency: '月3回20分',
    price: '¥6,000',
    icon: '🎹',
    accent: '#C5E8E8',
  },
  {
    name: '幼児コース',
    age: '4〜6歳',
    frequency: '月3回30分',
    price: '¥7,000',
    icon: '🌸',
    accent: '#F3E6A8',
  },
  {
    name: '小学生コース',
    age: '小学生',
    frequency: '月3回45分',
    price: '¥8,000',
    icon: '⭐',
    accent: '#C5E8E8',
  },
  {
    name: '大人コース',
    age: '大人',
    frequency: '月2回45分',
    price: '¥8,000',
    icon: '🎵',
    accent: '#EDE0C4',
  },
  {
    name: 'オンラインコース',
    age: '全年齢',
    frequency: '月2回45分',
    price: '¥7,500',
    icon: '💻',
    accent: '#C5E8E8',
  },
];

async function getRecentPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts();

  return (
    <>
      <Hero />

      {/* ── Features ── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Features"
            title="TANABEピアノ教室の特徴"
            description="温かみのある環境で、お子様から大人まで音楽の楽しさを伝えます。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 text-center border border-warm-bg"
              >
                <div
                  className={`w-14 h-14 rounded-xl mx-auto mb-4 flex items-center justify-center ${
                    feature.color === 'primary' ? 'bg-primary-light' : 'bg-mustard-light'
                  }`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${
                      feature.color === 'primary' ? 'text-primary-dark' : 'text-mustard-dark'
                    }`}
                  />
                </div>
                <h3 className="font-serif text-base font-medium text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-text leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/features" className="btn-outline">
              詳しく見る
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Greeting ── */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative teal blob */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary/5 pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-mustard/5 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm tracking-widest text-primary uppercase font-sans mb-3 flex items-center gap-2">
                <span className="inline-block w-8 h-px bg-primary" />
                Greeting
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-dark-text mb-6">
                ごあいさつ
              </h2>
              <div className="space-y-4 text-muted-text leading-relaxed text-sm">
                <p>
                  従来のピアノ教室のイメージは、先生に言われた事を1から10まできちんと守らなくてはいけないというような<em>have to</em>のイメージをお持ちの親御様もいらっしゃるかも知れません。
                </p>
                <p>
                  勿論それも一理ありますが、生徒さんの意見に耳を傾け自発的に「こうしたら綺麗になる！」「この曲はこうしたい！」と、たくさんの案を<strong className="text-dark-text font-medium">"考える力"</strong>を養って欲しいと願っております。
                </p>
                <p>
                  普段のピアノレッスンにもピアノを演奏するにおいて重要となるソルフェージュを取り入れ、机上の勉強にならないようソルフェージュを楽しく演奏に活かせるようにしているのが特徴です。
                </p>
                <p>
                  ピアノの楽しさをお伝えして生徒さんを通してご家族の日常の中に音楽が色を添え、素敵な日々をおくれるようお手伝いさせていただきたいと思います。
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about" className="btn-primary">
                  講師プロフィール
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Teacher photo card */}
            <div className="relative flex justify-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden shadow-xl bg-[#1C3030]">
                {/* Photo */}
                <div className="relative h-72 w-full overflow-hidden">
                  <Image
                    src="/IMG-6049_edited_edited_edited.avif"
                    alt="田辺 いつ美"
                    fill
                    className="object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C3030] via-transparent to-transparent" />
                </div>
                {/* Info overlay */}
                <div className="px-7 pb-7 -mt-6 relative">
                  <p className="font-serif text-2xl font-light text-white">田辺 いつ美</p>
                  <p className="text-white/50 text-xs tracking-widest mt-1 mb-4">代表講師 / Piano Teacher</p>
                  <div className="flex flex-wrap gap-2">
                    {['提案型レッスン', 'ソルフェージュ', '全年齢対応'].map((tag) => (
                      <span key={tag} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full border border-white/15">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-blush/15 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Courses ── */}
      <section className="py-24 bg-warm-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Courses"
            title="コース一覧"
            description="お子様の年齢や目標に合わせて、最適なコースをお選びいただけます。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {courses.map((course) => (
              <div
                key={course.name}
                className="rounded-2xl bg-white p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 border-t-4"
                style={{ borderTopColor: course.accent.includes('E8') ? '#4AADAD' : '#C9A840' }}
              >
                <div className="text-3xl mb-3">{course.icon}</div>
                <h3 className="font-serif text-sm font-medium text-dark-text mb-3">{course.name}</h3>
                <div className="space-y-1 text-xs text-muted-text">
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
                    {course.age}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-mustard inline-block" />
                    {course.frequency}
                  </p>
                </div>
                <p className="text-xl font-serif font-medium text-primary-dark mt-4">
                  {course.price}
                  <span className="text-xs text-muted-text font-sans">/月</span>
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/courses" className="btn-outline">
              コースの詳細を見る
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Blog ── */}
      {recentPosts.length > 0 && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              subtitle="Blog"
              title="最新のお知らせ"
              description="教室からのお知らせやピアノ情報をお届けします。"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-cream rounded-2xl overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-warm-bg"
                >
                  <div className="h-44 bg-gradient-to-br from-primary to-teal-dark flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex gap-1 opacity-20">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-white rounded-b-md h-20 self-end" />
                      ))}
                    </div>
                    <span className="text-4xl relative z-10">🎵</span>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-muted-text mb-2">{formatDate(post.createdAt.toISOString())}</p>
                    <h3 className="font-serif font-medium text-dark-text group-hover:text-primary-dark transition-colors line-clamp-2 mb-2 text-sm">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-xs text-muted-text line-clamp-3">{post.excerpt}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/blog" className="btn-outline">
                ブログをもっと見る
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Access ── */}
      <section className="py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Access"
            title="アクセス"
            description="南流山駅北口より徒歩1分の好立地です。"
          />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-white rounded-2xl p-8 space-y-6 border border-warm-bg">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1 text-sm">住所</p>
                    <p className="text-muted-text text-sm">
                      〒270-0163<br />千葉県流山市南流山4丁目1-7（3階）
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-mustard-light flex items-center justify-center shrink-0">
                    <Train className="w-5 h-5 text-mustard-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1 text-sm">最寄り駅</p>
                    <p className="text-muted-text text-sm">
                      JR武蔵野線・つくばエクスプレス<br />
                      南流山駅北口より<span className="text-primary-dark font-medium">徒歩1分</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1 text-sm">レッスン時間</p>
                    <div className="text-muted-text text-sm space-y-1">
                      <p>月〜金：13:00〜21:00</p>
                      <p>土・日：9:00〜19:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/access" className="btn-primary w-full justify-center">
                  アクセス詳細を見る
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-md h-80 md:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3235.7!2d139.9!3d35.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c4000000001%3A0x1!2z5Y2X5rW35bGx!5e0!3m2!1sja!2sjp!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="南流山TANABEピアノ教室の地図"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-gradient-to-br from-teal-dark via-primary to-teal relative overflow-hidden">
        {/* Piano key deco */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex gap-1 opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="w-8 h-16 bg-white rounded-b-md" />
          ))}
        </div>
        {/* Botanical right corner */}
        <div className="absolute bottom-0 right-0 w-40 opacity-20 pointer-events-none">
          <svg viewBox="0 0 120 160" xmlns="http://www.w3.org/2000/svg">
            <path d="M60,160 Q55,100 58,40 Q60,10 62,0" stroke="#C9A840" strokeWidth="3" fill="none" />
            <path d="M58,120 Q20,95 8,70" stroke="#C9A840" strokeWidth="2.5" fill="none" />
            <circle cx="8" cy="70" r="9" fill="#C9A840" />
            <path d="M60,80 Q95,60 108,42" stroke="#C9A840" strokeWidth="2.5" fill="none" />
            <circle cx="108" cy="42" r="8" fill="#C9A840" />
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <p className="text-white/50 text-xs tracking-[0.3em] uppercase mb-4">Trial Lesson</p>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-white mb-4">
            まずは体験レッスンへ
          </h2>
          <p className="text-white/70 mb-10 text-sm leading-relaxed">
            教室の雰囲気を感じていただけるよう、体験レッスンを行っています。<br />
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary-inv">
              体験レッスン申し込みはこちら
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://line.me/R/ti/p/@tanabepiano"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-7 py-2.5 rounded-full font-medium hover:bg-[#05b04d] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-sm"
            >
              LINEで相談する
            </a>
            <a
              href="https://www.youtube.com/channel/UC_JB3L-y4TXRfSGVS3rPWCg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] text-white px-7 py-2.5 rounded-full font-medium hover:bg-[#CC0000] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 text-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              教室YouTube
            </a>
          </div>

        </div>
      </section>
    </>
  );
}
