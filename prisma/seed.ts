import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clean existing data
  await prisma.contactMessage.deleteMany();
  await prisma.schedule.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.user.deleteMany();

  // Create teacher
  const teacherPassword = await bcrypt.hash('teacher123', 12);
  const teacher = await prisma.user.create({
    data: {
      name: '田辺 いつ美',
      email: 'teacher@tanabepiano.com',
      password: teacherPassword,
      role: 'TEACHER',
    },
  });
  console.log('Created teacher:', teacher.email);

  // Create sample students
  const student1Password = await bcrypt.hash('student1', 12);
  const student1 = await prisma.user.create({
    data: {
      name: '山田 花子',
      email: 'hanako@example.com',
      password: student1Password,
      role: 'STUDENT',
    },
  });

  const student2Password = await bcrypt.hash('student2', 12);
  const student2 = await prisma.user.create({
    data: {
      name: '鈴木 太郎',
      email: 'taro@example.com',
      password: student2Password,
      role: 'STUDENT',
    },
  });
  console.log('Created students:', student1.email, student2.email);

  // Create sample schedules
  const schedules = [
    {
      title: '山田さん レッスン',
      date: '2024-04-08',
      startTime: '15:00',
      endTime: '15:45',
      description: 'ソナタ練習',
      studentId: student1.id,
      isPublic: false,
    },
    {
      title: '山田さん レッスン',
      date: '2024-04-15',
      startTime: '15:00',
      endTime: '15:45',
      description: 'バッハ インベンション',
      studentId: student1.id,
      isPublic: false,
    },
    {
      title: '山田さん レッスン',
      date: '2024-04-22',
      startTime: '15:00',
      endTime: '15:45',
      description: 'ショパン ノクターン',
      studentId: student1.id,
      isPublic: false,
    },
    {
      title: '鈴木さん レッスン',
      date: '2024-04-09',
      startTime: '16:00',
      endTime: '16:30',
      description: 'バイエル 練習',
      studentId: student2.id,
      isPublic: false,
    },
    {
      title: '鈴木さん レッスン',
      date: '2024-04-16',
      startTime: '16:00',
      endTime: '16:30',
      studentId: student2.id,
      isPublic: false,
    },
    {
      title: '発表会準備',
      date: '2024-04-20',
      startTime: '10:00',
      endTime: '12:00',
      description: '春の発表会のリハーサル',
      isPublic: true,
    },
    {
      title: '春の発表会',
      date: '2024-04-27',
      startTime: '13:00',
      endTime: '17:00',
      description: '年1回の発表会です。ご家族の方もぜひご参加ください。',
      isPublic: true,
    },
  ];

  for (const schedule of schedules) {
    await prisma.schedule.create({ data: schedule });
  }
  console.log('Created schedules');

  // Create sample blog posts
  const blogPosts = [
    {
      title: '春のピアノ発表会を開催しました！',
      slug: 'spring-recital-2024',
      content: `先日、春の発表会を無事に開催することができました。

生徒さんたちは、この日のために何ヶ月も練習を重ねてきました。緊張しながらも、それぞれが全力で演奏してくれた姿に、私も感動しました。

今年は特に、小さなお子さんたちの成長が目覚ましく、昨年とは比べものにならないくらい上達していました。ピアノを弾くことへの情熱と喜びが、演奏から伝わってきました。

参加してくださった保護者の皆様、応援ありがとうございました。次の発表会も、また素晴らしい演奏をお届けできるよう、レッスンに励んでいきます。

♪ 音楽は心の栄養です ♪`,
      excerpt: '春の発表会を無事に開催しました。生徒さんたちの成長に感動！',
      published: true,
    },
    {
      title: 'ソルフェージュって何？',
      slug: 'what-is-solfege',
      content: `「ソルフェージュ」という言葉を聞いたことがありますか？

ソルフェージュとは、音楽の読み書きや聴音などの基礎的な音楽訓練のことです。TANABEピアノ教室では、ピアノの演奏技術だけでなく、このソルフェージュを取り入れたレッスンを行っています。

## ソルフェージュの内容

- **視唱（しかん）**: 楽譜を見て歌う練習
- **聴音（ちょうおん）**: 聞いた音を楽譜に書き取る練習
- **リズム練習**: 正確なリズム感を身につける

## なぜソルフェージュが大切？

ピアノを弾くだけでなく、「音楽を理解する力」を身につけることで、より豊かな演奏ができるようになります。また、どんな曲でも自分で楽譜を読んで弾けるようになるため、音楽の楽しみが広がります。

当教室では、年齢や習熟度に合わせて、楽しくソルフェージュを学べるよう工夫しています。`,
      excerpt: 'ソルフェージュとは何か、当教室でのレッスン内容を紹介します。',
      published: true,
    },
    {
      title: '努力賞制度について',
      slug: 'effort-award-system',
      content: `TANABEピアノ教室では、2ヶ月ごとに「努力賞」を発表しています。

## 努力賞とは？

生徒さんの頑張りを「数字で可視化」する制度です。練習回数、曲の習得数、レッスンへの積極性などを総合的に評価し、特に頑張った生徒さんを表彰します。

## なぜこの制度を作ったの？

ピアノの上達は、短期間では見えにくいことがあります。毎日少しずつ練習を積み重ねることが大切ですが、子どもたちにとっては「自分がどれだけ頑張っているか」が見えにくいこともあります。

努力賞制度を通じて、子どもたちが「自分は頑張っている」という自信を持ち、さらに音楽を楽しんでもらえることを願っています。

## 先日の努力賞受賞者

先日の表彰では、3名の生徒さんが努力賞を受賞しました。おめでとうございます！これからも一緒に頑張りましょう。`,
      excerpt: '2ヶ月ごとに努力賞を発表する制度について詳しく説明します。',
      published: true,
    },
    {
      title: '大人のピアノレッスンを始めませんか？',
      slug: 'adult-piano-lessons',
      content: `「子どもの頃にピアノを弾いていた」「大人になってから憧れている」という方へ。

当教室では、大人の方向けのピアノコースをご用意しています。

## 大人コースの特徴

- **月2回45分**: 忙しい方でも通いやすいペース
- **弾きたい曲を中心に**: 好きな曲、弾きたい曲を大切に
- **初心者歓迎**: 全くの初めての方も丁寧にサポート
- **自分のペースで**: 無理なく、楽しく続けられる

## 大人になってからでも大丈夫？

もちろんです！大人になってから始めた方でも、十分に上達できます。むしろ、大人の方は集中力があり、理解も早いので、短期間で上達される方も多いです。

## まずは体験レッスンを

不安な方は、まず体験レッスンで雰囲気を感じてみてください。お気軽にお問い合わせください。`,
      excerpt: '大人になってからでも遅くない！当教室の大人コースをご紹介します。',
      published: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('Created blog posts');

  // Create sample contact messages
  await prisma.contactMessage.create({
    data: {
      name: '佐藤 めぐみ',
      email: 'megumi@example.com',
      phone: '090-1234-5678',
      subject: '体験レッスンの申し込みについて',
      message: '5歳の娘の体験レッスンを申し込みたいのですが、どのような手続きが必要でしょうか？ピアノは全くの初めてです。',
      read: false,
    },
  });

  await prisma.contactMessage.create({
    data: {
      name: '中村 健一',
      email: 'kenichi@example.com',
      subject: '大人のレッスンについて',
      message: '30代の男性ですが、大人コースに興味があります。料金や時間帯について教えていただけますか？',
      read: true,
    },
  });

  console.log('Created contact messages');
  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
