import Link from 'next/link';
import { MapPin, Clock, Music, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark-text text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-teal flex items-center justify-center">
                <Music className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-400">南流山</p>
                <p className="text-xl font-serif font-medium">TANABEピアノ教室</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              〜家族と過ごす日常に音楽を〜<br />
              2歳半から大人まで、一人ひとりのペースに合わせた<br />
              温かいレッスンをお届けします。
            </p>
            <div className="flex gap-3">
              <a
                href="https://line.me/R/ti/p/@tanabepiano"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#06C755] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#05b04d] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.070 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEで友だち追加
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-serif font-medium text-lg mb-4 text-primary">メニュー</h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: '教室について' },
                { href: '/features', label: '教室の特徴' },
                { href: '/courses', label: 'コース一覧' },
                { href: '/blog', label: 'ブログ' },
                { href: '/gallery', label: 'ギャラリー' },
                { href: '/access', label: 'アクセス' },
                { href: '/contact', label: 'お問い合わせ' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2"
                  >
                    <span className="text-primary text-xs">♪</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-serif font-medium text-lg mb-4 text-teal">アクセス</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                <p>
                  〒270-0163<br />
                  千葉県流山市南流山<br />
                  4丁目1-7（3階）
                </p>
              </div>
              <div className="flex gap-2">
                <Clock className="w-4 h-4 text-teal mt-0.5 shrink-0" />
                <div>
                  <p>月〜金 13:00〜21:00</p>
                  <p>土・日 9:00〜19:00</p>
                </div>
              </div>
              <div className="flex gap-2">
                <svg className="w-4 h-4 text-teal mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <p>JR武蔵野線・TX<br />南流山駅北口より<br />徒歩1分</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} 南流山TANABEピアノ教室. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/contact" className="hover:text-gray-300 transition-colors">
              お問い合わせ
            </Link>
            <Link href="/login" className="hover:text-gray-300 transition-colors">
              生徒ログイン
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
