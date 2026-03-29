import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatDate } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ブログ',
  description: '南流山TANABEピアノ教室からのお知らせや音楽に関する記事をお届けします。',
};

async function getPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

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
            Blog
            <span className="inline-block w-8 h-px bg-teal"></span>
          </p>
          <h1 className="text-4xl md:text-5xl font-serif font-medium text-dark-text">
            ブログ
          </h1>
          <p className="mt-4 text-muted-text">
            教室からのお知らせや音楽に関する記事をお届けします。
          </p>
        </div>
      </div>

      {/* Blog posts */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-muted-text">まだ記事がありません。</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                >
                  {/* Cover image or gradient */}
                  <div className="h-52 bg-gradient-to-br from-primary-light via-cream to-teal-light flex items-center justify-center relative overflow-hidden">
                    <div className="text-6xl opacity-60">🎵</div>
                    <div className="absolute top-4 left-4 text-3xl text-primary/20 font-serif">♪</div>
                    <div className="absolute bottom-4 right-4 text-2xl text-teal/20 font-serif">♫</div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-muted-text mb-3">
                      {formatDate(post.createdAt.toISOString())}
                    </p>
                    <h2 className="font-serif font-medium text-dark-text group-hover:text-primary transition-colors line-clamp-2 mb-3 text-lg leading-snug">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-sm text-muted-text line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      続きを読む
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
