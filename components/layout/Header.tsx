'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, Music, LogIn, LogOut, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'トップ' },
  { href: '/about', label: '教室について' },
  { href: '/courses', label: 'コース' },
  { href: '/blog', label: 'ブログ' },
  { href: '/access', label: 'アクセス' },
  { href: '/contact', label: 'お問い合わせ' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-[#FAF6F0]/96 backdrop-blur-md shadow-sm border-b border-blush'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-dark to-primary flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300">
              <Music className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className={cn('text-[10px] font-sans leading-none tracking-widest', isScrolled ? 'text-muted-text' : 'text-white/50')}>南流山</p>
              <p className={cn('text-base font-serif font-medium leading-tight', isScrolled ? 'text-dark-text' : 'text-white')}>
                TANABEピアノ教室
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 hover:text-primary relative py-1',
                  pathname === link.href
                    ? 'text-primary'
                    : isScrolled ? 'text-dark-text' : 'text-white/80',
                  'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary after:scale-x-0 after:transition-transform after:duration-200 hover:after:scale-x-100',
                  pathname === link.href && 'after:scale-x-100'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* YouTube icon */}
            <a
              href="https://www.youtube.com/channel/UC_JB3L-y4TXRfSGVS3rPWCg"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="教室YouTube"
              className="w-8 h-8 flex items-center justify-center text-muted-text hover:text-[#FF0000] transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* LINE button */}
            <a
              href="https://line.me/R/ti/p/@tanabepiano"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#06C755] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#05b04d] transition-all duration-200 shadow-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINE
            </a>

            {/* Auth button */}
            {session ? (
              <div className="flex items-center gap-2">
                <Link
                  href={session.user.role === 'TEACHER' ? '/teacher' : '/student'}
                  className="flex items-center gap-2 text-sm text-muted-text hover:text-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  {session.user.name}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-1.5 text-sm text-muted-text hover:text-primary transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-all duration-200"
              >
                <LogIn className="w-4 h-4" />
                ログイン
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className={cn('lg:hidden p-2 rounded-lg hover:text-primary transition-colors', isScrolled ? 'text-dark-text' : 'text-white/80')}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="メニューを開く"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block py-3 px-4 rounded-xl text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-primary-light text-primary'
                    : 'text-dark-text hover:bg-warm-bg hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="https://line.me/R/ti/p/@tanabepiano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#06C755] text-white py-3 rounded-xl text-sm font-medium"
              >
                LINEで友だち追加
              </a>
              {session ? (
                <>
                  <Link
                    href={session.user.role === 'TEACHER' ? '/teacher' : '/student'}
                    className="flex items-center justify-center gap-2 bg-primary-light text-primary py-3 rounded-xl text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    マイページ
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center justify-center gap-2 text-muted-text py-3 rounded-xl text-sm font-medium hover:bg-warm-bg"
                  >
                    <LogOut className="w-4 h-4" />
                    ログアウト
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-center gap-2 border-2 border-primary text-primary py-3 rounded-xl text-sm font-medium hover:bg-primary hover:text-white transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  ログイン
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
