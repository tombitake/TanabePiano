import { Metadata } from 'next';
import { SectionTitle } from '@/components/ui/SectionTitle';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '教室・講師紹介 | 南流山TANABEピアノ教室',
  description: '南流山TANABEピアノ教室の教室案内と講師プロフィールをご紹介します。代表講師・田辺いつ美をはじめ、4名の講師が在籍しています。',
};

const teachers = [
  {
    id: 'tanabe',
    kana: 'たなべ いつみ',
    name: '田辺 いつ美',
    role: '代表講師',
    days: '駅前教室｜月曜日・火曜日・水曜日',
    photo: '/teacher_itsumi.avif',
    career: [
      '桐朋学園大学音楽学部ピアノ専攻卒業、同大学研究科（研究生）',
      '卒業演奏会に出演（成績優秀者による演奏会）',
      '第３回ヨーロッパ国際ピアノコンクール in Japan 大学・一般A1部門 金賞・グランプリ',
      '第９回ルーマニア国際音楽コンクール ピアノ部門 奨励賞・ルーマニア作曲家音楽学協会賞',
      'ロゼピアノコンクール２０１４最高位 など多数受賞',
      'ピアノを大迫千恵美、加藤恭子、加藤一郎、佐藤俊、上野久子の各氏に師事',
      'ソルフェージュを多田栄一、室内楽を藤井一興、斎木隆の各氏に師事',
      'K・ケナー、K・ゲキチ、K・ドラフィ、P・ドヴァイヨン、M・ヴォスクレセンスキー、I・イーティン各氏のマスタークラス受講',
      '国内・海外でのマスタークラスやリサイタル出演、大規模音楽イベントでの出演経験あり（「ラ・フォル・ジュルネ・オ・ジャポン」「ART PIANO IN MARUNOUCHI」等）',
      '現在、国内コンクールの審査員も務める',
    ],
    message:
      '生徒さんと一緒にレッスンを楽しむ事を大切にしています。特に導入期の生徒さんのレッスンはコミュニケーションを多く取ることを心がけております。何よりも、子供たちには一生懸命に取り組むことにより達成感を味わい、自信を持って音楽を楽しんでもらいたいと思っています。私も生徒さんと共に日々音楽を勉強させていただいております♪',
  },
  {
    id: 'okamoto',
    kana: 'おかもと ありす',
    name: '岡本 有珠',
    role: '講師',
    days: '駅前教室｜木曜日　第2教室｜火曜日・水曜日',
    photo: '/teacher_arisu.avif',
    career: [
      '聖徳大学附属女子中学校、高等学校（音楽科）を経て、東京音楽大学ピアノ演奏家コース、同大学大学院音楽研究科卒業',
      '第26回ちば音楽コンクール F部門 第2位',
      '第17回日本演奏家コンクール ピアノ部門 特別賞',
      '第8回東京国際ピアノコンクール 審査員賞',
      '第31回日本クラシック音楽コンクール 全国大会入選',
      '石井克典、稲田潤子、佐藤俊、渚智佳、石岡千弘、紫垣英二、池谷雅子の各氏に師事',
      '現在、演奏活動を行うとともに、幅広い年齢層を対象に後進の指導にあたる',
    ],
    message:
      '音楽と向き合い、ひとつひとつ積み重ねることで可能性が広がる楽しさ、自分自身が奏でる音で感情表現できること、芸術と共に生きる喜びをお伝えできるよう、常に心がけています。ピアノを通じて、心地よい空間を過ごしましょう♪',
  },
  {
    id: 'arakawa',
    kana: 'あらかわ ちひろ',
    name: '荒川 知愛',
    role: '講師',
    days: '駅前教室｜金曜日・土曜日・日曜日　第2教室｜木曜日',
    photo: '/teacher_chihiro.avif',
    career: [
      '4歳よりピアノを始める',
      '東京音楽大学付属高等学校を経て、東京音楽大学音楽学部器楽専攻（ピアノ）卒業',
      '東京音楽大学大学院音楽教育専攻ソルフェージュ研究領域修士課程を修了',
      '大学院修了後、東京音楽大学ソルフェージュ部会非常勤助手を3年間勤める',
      'ピアノ学内卒業演奏会に出演',
    ],
    message:
      '音楽を通して生まれる人と人との絆や、新たな出会いを大切にし、教室に来られる全ての皆様が笑顔になっていただけるようなレッスンを心がけております。「音楽って楽しいな！」「レッスンに行きたい！」とたくさんの生徒さんに思っていただけるように日々努力してまいります。どうぞよろしくお願い致します！',
  },
  {
    id: 'onozato',
    kana: 'おのざと ゆうか',
    name: '小野里 優香',
    role: '講師',
    days: '第2教室｜金曜日',
    photo: '/teacher_yuuka.avif',
    career: [
      '4歳よりピアノを始める',
      '武蔵野音楽大学演奏学科ピアノ専攻卒業',
      '平成29年度福井直秋記念奨学金奨学生',
      '在学中、選抜学生コンサートに出演',
      '第25回ちば音楽コンクール E部門入賞',
      '第36回全日本ジュニアクラシック音楽コンクール 大学生部門入賞',
      'ウィーン国立音楽大学マスタークラス修了、ディプロマ取得',
      '鈴木直美、鹿目純子、重松聡、新井和子の各氏に師事',
      '小笠原智子、ケマル・ゲキチ、マンフレッド・アウスト、故 ペーター・エフラーの各氏のレッスンを受ける',
      '現在は金管楽器を主としたアンサンブルピアニストとして研鑽を積むほか後進の指導にあたる',
    ],
    message:
      '音楽は私たちの毎日を豊かにしてくれます。ピアノを弾くことで生まれる「楽しい！」の感情を大切に、「できた！」の瞬間から生まれる喜びを一緒に分かち合うことができれば幸いです。皆さんの「これがしたい！」「こうなりたい！」と向き合い、一人一人の個性を生かしたレッスンを行います♪',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">

      {/* ── Page header ── */}
      <div className="relative bg-[#2C1F1C] py-24 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] flex pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => {
            const pos = i % 12;
            const isBlack = [1, 3, 6, 8, 10].includes(pos);
            return (
              <div key={i} className="flex-1 h-full"
                style={{ background: isBlack ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.18)' }} />
            );
          })}
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p className="text-[10px] tracking-[0.45em] text-white/35 uppercase font-sans mb-6 flex items-center justify-center gap-3">
            <span className="w-5 h-px bg-white/25 inline-block" />
            About
            <span className="w-5 h-px bg-white/25 inline-block" />
          </p>
          <h1 className="text-3xl md:text-4xl font-serif font-light text-white mb-3">
            教室・講師紹介
          </h1>
          <p className="font-serif italic text-white/40 text-sm tracking-wide">
            〜 家族と過ごす日常に、音楽を 〜
          </p>
        </div>
      </div>

      {/* ── Studio introduction ── */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Studio" title="レッスン室のご案内" />
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div className="space-y-5 text-muted-text leading-relaxed text-sm">
              <p>
                レッスン室の広さは約<strong className="text-dark-text font-medium">25畳</strong>あります。
                狭い防音室の中でのレッスンとは違い、大きな音での演奏も圧迫感を感じずに行えます。
              </p>
              <p>
                防音室にありがちな音による疲れなどもなく、伸び伸びとレッスンをお受けいただけます。
                そのため、<strong className="text-dark-text font-medium">グランドピアノの響きも十分にお楽しみいただけます。</strong>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎹', label: 'グランドピアノ完備', desc: '豊かな音色で本格的なレッスンを' },
                { icon: '🏠', label: '約25畳の広さ', desc: '圧迫感のない広々とした空間' },
                { icon: '🚉', label: '駅から徒歩1分', desc: '南流山駅北口すぐ（3階）' },
                { icon: '📅', label: '月〜日レッスン', desc: '13:00〜21:00（土日は9:00〜）' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-5 border border-warm-bg hover:shadow-sm transition-shadow">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="font-medium text-dark-text text-xs mb-1">{item.label}</p>
                  <p className="text-muted-text text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Teacher profiles ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle subtitle="Teachers" title="講師紹介" />

          <div className="mt-14 space-y-20">
            {teachers.map((teacher, idx) => (
              <div
                key={teacher.id}
                className="grid md:grid-cols-5 gap-10 items-start"
              >
                {/* Photo column (1/5) — alternates side */}
                <div className={`md:col-span-1 ${idx % 2 === 1 ? 'md:order-last' : ''}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-md bg-warm-bg aspect-[4/5]">
                    {teacher.photo ? (
                      <Image
                        src={teacher.photo}
                        alt={teacher.name}
                        fill
                        className="object-cover object-top"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-text/30">
                        <span className="text-5xl mb-3">🎹</span>
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#2C1F1C]/80 to-transparent p-5">
                      <p className="font-serif text-xl font-light text-white">{teacher.name}</p>
                      <p className="text-white/50 text-xs tracking-widest mt-0.5">{teacher.kana}</p>
                    </div>
                  </div>
                  <div className="mt-3 px-4 py-2.5 bg-primary-light/40 border border-primary/15 rounded-lg">
                    <p className="text-xs text-primary-dark tracking-wide leading-relaxed">{teacher.days}</p>
                  </div>
                </div>

                {/* Text column (4/5) */}
                <div className={`md:col-span-4 ${idx % 2 === 1 ? 'md:order-first' : ''}`}>
                  <p className="text-[10px] tracking-[0.4em] text-muted-text uppercase font-sans mb-2 flex items-center gap-2">
                    <span className="w-4 h-px bg-primary/50 inline-block" />
                    {teacher.role}
                  </p>
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-dark-text mb-1">
                    {teacher.name}
                  </h2>
                  <p className="text-muted-text text-xs tracking-widest mb-6">{teacher.kana}</p>

                  <div className="mb-6">
                    <h3 className="text-xs tracking-widest text-primary uppercase font-sans mb-3 flex items-center gap-2">
                      <span className="w-3 h-px bg-primary inline-block" />
                      経歴
                    </h3>
                    <ul className="space-y-1.5">
                      {teacher.career.map((item, i) => (
                        <li key={i} className="flex gap-2.5 text-xs text-muted-text leading-relaxed">
                          <span className="text-primary/50 shrink-0 mt-0.5">―</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-cream rounded-xl p-5 border-l-2 border-primary/40">
                    <h3 className="text-xs tracking-widest text-primary uppercase font-sans mb-3 flex items-center gap-2">
                      <span className="w-3 h-px bg-primary inline-block" />
                      大切にしていること
                    </h3>
                    <p className="text-sm text-muted-text leading-relaxed">{teacher.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── YouTube & CTA ── */}
      <section className="py-20 bg-[#2C1F1C] relative overflow-hidden">
        {/* ひょっこりバッハ — さりげなく右隅に */}
        <div
          className="absolute bottom-0 right-6 sm:right-10 pointer-events-none opacity-[0.10]"
          style={{ height: 52, overflow: 'hidden' }}
        >
          <Image
            src="/bach-bluehair.png"
            alt=""
            aria-hidden="true"
            width={100}
            height={75}
            style={{ display: 'block' }}
          />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[2px] flex pointer-events-none">
          {Array.from({ length: 80 }).map((_, i) => {
            const pos = i % 12;
            const isBlack = [1, 3, 6, 8, 10].includes(pos);
            return <div key={i} className="flex-1 h-full"
              style={{ background: isBlack ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)' }} />;
          })}
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase mb-8">Connect</p>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-white mb-4">
            教室の演奏をYouTubeで公開中
          </h2>
          <p className="text-white/50 text-sm mb-8 leading-relaxed">
            発表会の演奏や教室の様子を動画でご紹介しています。<br />
            ぜひチャンネルをご覧ください。
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://www.youtube.com/channel/UC_JB3L-y4TXRfSGVS3rPWCg"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FF0000] text-white px-7 py-2.5 rounded-full text-sm font-medium hover:bg-[#CC0000] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              教室YouTubeチャンネル
            </a>
            <Link href="/contact" className="btn-outline-inv">
              体験レッスンを申し込む
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
