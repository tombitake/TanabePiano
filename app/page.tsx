import { Hero } from '@/components/sections/Hero';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatDate, truncateText } from '@/lib/utils';
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
    color: 'teal',
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
    color: 'teal',
  },
];

const courses = [
  {
    name: 'ぷれびあのコース',
    age: '2歳半〜3歳',
    frequency: '月3回20分',
    price: '¥6,000',
    icon: '🎹',
    color: 'from-pink-100 to-pink-50',
  },
  {
    name: '幼児コース',
    age: '4〜6歳',
    frequency: '月3回30分',
    price: '¥7,000',
    icon: '🌸',
    color: 'from-primary-light to-teal-light',
  },
  {
    name: '小学生コース',
    age: '小学生',
    frequency: '月3回45分',
    price: '¥8,000',
    icon: '⭐',
    color: 'from-teal-light to-blue-50',
  },
  {
    name: '大人コース',
    age: '大人',
    frequency: '月2回45分',
    price: '¥8,000',
    icon: '🎵',
    color: 'from-warm-bg to-primary-light',
  },
  {
    name: 'オンラインコース',
    age: '全年齢',
    frequency: '月2回45分',
    price: '¥7,500',
    icon: '💻',
    color: 'from-teal-light to-cream',
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

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Features"
            title="TANABEピアノ教室の特徴"
            description="温かみのある環境で、お子様から大人まで音楽の楽しさを伝えます。"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-3xl bg-warm-bg hover:bg-white hover:shadow-lg transition-all duration-300 text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    feature.color === 'primary' ? 'bg-primary-light' : 'bg-teal-light'
                  }`}
                >
                  <feature.icon
                    className={`w-8 h-8 ${
                      feature.color === 'primary' ? 'text-primary' : 'text-teal'
                    }`}
                  />
                </div>
                <h3 className="font-serif text-lg font-medium text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-text leading-relaxed">
                  {feature.description}
                </p>
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

      {/* Greeting Section */}
      <section className="py-24 bg-gradient-to-br from-cream to-primary-light relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 text-6xl text-primary/10 font-serif">♪</div>
          <div className="absolute bottom-10 left-10 text-5xl text-teal/10 font-serif">♫</div>
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-sm tracking-widest text-primary uppercase font-sans mb-3 flex items-center gap-2">
                <span className="inline-block w-8 h-px bg-primary"></span>
                Greeting
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-dark-text mb-6">
                ごあいさつ
              </h2>
              <div className="space-y-4 text-muted-text leading-relaxed">
                <p>
                  南流山TANABEピアノ教室へようこそ。代表講師の田辺 いつ美です。
                </p>
                <p>
                  「音楽を通して、子どもたちの豊かな心を育てたい」という想いでレッスンをしています。
                  ピアノを弾くことの楽しさを伝えながら、音楽の基礎もしっかり学べるよう工夫しています。
                </p>
                <p>
                  お子様のペースに合わせた丁寧なレッスンで、
                  「弾けた！」という喜びをたくさん経験していただきたいと思っています。
                </p>
                <p className="text-primary font-medium">
                  まずは体験レッスンへ、お気軽にお越しください。
                </p>
              </div>
              <div className="mt-6 flex gap-3">
                <Link href="/about" className="btn-primary">
                  講師プロフィール
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="w-full aspect-square rounded-3xl bg-gradient-to-br from-primary-light to-teal-light flex items-center justify-center shadow-xl">
                <div className="text-center p-8">
                  <div className="w-32 h-32 rounded-full bg-white/60 mx-auto mb-4 flex items-center justify-center text-5xl">
                    🎹
                  </div>
                  <p className="font-serif text-2xl font-medium text-dark-text">田辺 いつ美</p>
                  <p className="text-primary text-sm mt-1">代表講師</p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {['丁寧', '楽しい', '温かい'].map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/70 text-primary text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-teal/20 -z-10" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary/20 -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-24 bg-white">
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
                className={`rounded-3xl bg-gradient-to-br ${course.color} p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="text-4xl mb-3">{course.icon}</div>
                <h3 className="font-serif text-base font-medium text-dark-text mb-3">
                  {course.name}
                </h3>
                <div className="space-y-1 text-sm text-muted-text">
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                    {course.age}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal inline-block"></span>
                    {course.frequency}
                  </p>
                </div>
                <p className="text-xl font-serif font-medium text-primary mt-4">
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

      {/* Blog Preview */}
      {recentPosts.length > 0 && (
        <section className="py-24 bg-warm-bg">
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
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 bg-gradient-to-br from-primary-light to-teal-light flex items-center justify-center text-5xl">
                    🎵
                  </div>
                  <div className="p-6">
                    <p className="text-xs text-muted-text mb-2">
                      {formatDate(post.createdAt.toISOString())}
                    </p>
                    <h3 className="font-serif font-medium text-dark-text group-hover:text-primary transition-colors line-clamp-2 mb-2">
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-sm text-muted-text line-clamp-3">
                        {post.excerpt}
                      </p>
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

      {/* Access Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            subtitle="Access"
            title="アクセス"
            description="南流山駅北口より徒歩1分の好立地です。"
          />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="bg-warm-bg rounded-3xl p-8 space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1">住所</p>
                    <p className="text-muted-text text-sm">
                      〒270-0163<br />
                      千葉県流山市南流山4丁目1-7（3階）
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-teal-light flex items-center justify-center shrink-0">
                    <Train className="w-5 h-5 text-teal" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1">最寄り駅</p>
                    <p className="text-muted-text text-sm">
                      JR武蔵野線・つくばエクスプレス<br />
                      南流山駅北口より<span className="text-primary font-medium">徒歩1分</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-dark-text mb-1">レッスン時間</p>
                    <div className="text-muted-text text-sm space-y-1">
                      <p>月〜金：13:00〜21:00</p>
                      <p>土・日：9:00〜19:00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/access" className="btn-teal w-full justify-center">
                  アクセス詳細を見る
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-3xl overflow-hidden shadow-md h-80 md:h-full min-h-[320px]">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/4 text-6xl text-white/10 font-serif">♪</div>
          <div className="absolute top-1/3 right-1/4 text-5xl text-white/10 font-serif">♫</div>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/70 text-sm tracking-widest uppercase mb-3">Trial Lesson</p>
          <h2 className="text-3xl md:text-4xl font-serif font-medium text-white mb-4">
            まずは体験レッスンへ
          </h2>
          <p className="text-white/80 mb-8 leading-relaxed">
            教室の雰囲気を感じていただけるよう、体験レッスンを行っています。<br />
            お気軽にお問い合わせください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary px-10 py-4 rounded-full font-medium hover:bg-cream transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              体験レッスン申し込みはこちら
              <ChevronRight className="w-4 h-4" />
            </Link>
            <a
              href="https://line.me/R/ti/p/@tanabepiano"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#06C755] text-white px-10 py-4 rounded-full font-medium hover:bg-[#05b04d] transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              LINEで相談する
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
