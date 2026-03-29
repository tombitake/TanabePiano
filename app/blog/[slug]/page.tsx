import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { ChevronLeft, Calendar } from 'lucide-react';

interface Props {
  params: { slug: string };
}

async function getPost(slug: string) {
  try {
    return await prisma.blogPost.findUnique({
      where: { slug, published: true },
    });
  } catch {
    return null;
  }
}

async function getRelatedPosts(currentSlug: string) {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true, slug: { not: currentSlug } },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: '記事が見つかりません' };
  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 150),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const relatedPosts = await getRelatedPosts(params.slug);

  // Convert markdown-like content to HTML paragraphs
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="text-2xl font-serif font-medium text-primary mt-8 mb-4 pb-2 border-b-2 border-primary-light">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="text-xl font-serif font-medium text-dark-text mt-6 mb-3">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ')) {
        const listItems: string[] = [];
        while (i < lines.length && lines[i].startsWith('- ')) {
          listItems.push(lines[i].replace('- ', ''));
          i++;
        }
        elements.push(
          <ul key={i} className="my-4 space-y-2">
            {listItems.map((item, j) => (
              <li key={j} className="flex items-start gap-2 text-muted-text">
                <span className="text-primary mt-0.5 shrink-0">♪</span>
                <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>') }} />
              </li>
            ))}
          </ul>
        );
        continue;
      } else if (line.trim() !== '') {
        elements.push(
          <p key={i} className="text-muted-text leading-relaxed mb-4"
            dangerouslySetInnerHTML={{
              __html: line
                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-primary font-semibold">$1</strong>')
                .replace(/♪/g, '<span class="text-primary">♪</span>')
            }}
          />
        );
      }
      i++;
    }

    return elements;
  };

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-cream to-primary-light py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-5 right-10 text-5xl text-primary/10 font-serif">♪</div>
          <div className="absolute bottom-5 left-10 text-4xl text-teal/10 font-serif">♫</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-text hover:text-primary transition-colors text-sm mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            ブログ一覧へ戻る
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-medium text-dark-text mb-4 leading-snug">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-text text-sm">
            <Calendar className="w-4 h-4" />
            {formatDate(post.createdAt.toISOString())}
          </div>
        </div>
      </div>

      {/* Content */}
      <article className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-sm p-8 md:p-12">
                <div className="prose-pink">
                  {renderContent(post.content)}
                </div>
              </div>

              {/* Share/CTA */}
              <div className="mt-8 bg-gradient-to-r from-primary-light to-teal-light rounded-3xl p-8 text-center">
                <p className="font-serif text-dark-text text-lg mb-2">体験レッスン受付中</p>
                <p className="text-muted-text text-sm mb-4">
                  TANABEピアノ教室では随時体験レッスンを受け付けています。
                </p>
                <Link
                  href="/contact"
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  体験レッスンを申し込む
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* About the school */}
              <div className="bg-warm-bg rounded-3xl p-6">
                <h3 className="font-serif font-medium text-dark-text mb-3">教室について</h3>
                <p className="text-sm text-muted-text leading-relaxed mb-4">
                  南流山TANABEピアノ教室では、2歳半から大人まで、一人ひとりのペースに合わせたレッスンを行っています。
                </p>
                <Link href="/about" className="text-primary text-sm hover:underline">
                  講師プロフィール →
                </Link>
              </div>

              {/* Related posts */}
              {relatedPosts.length > 0 && (
                <div className="bg-white rounded-3xl border border-gray-100 p-6">
                  <h3 className="font-serif font-medium text-dark-text mb-4">その他の記事</h3>
                  <div className="space-y-4">
                    {relatedPosts.map((relPost) => (
                      <Link
                        key={relPost.id}
                        href={`/blog/${relPost.slug}`}
                        className="group block"
                      >
                        <p className="text-xs text-muted-text mb-1">
                          {formatDate(relPost.createdAt.toISOString())}
                        </p>
                        <p className="text-sm font-medium text-dark-text group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                          {relPost.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                  <Link href="/blog" className="mt-4 block text-primary text-sm hover:underline">
                    全ての記事を見る →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
