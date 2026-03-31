'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BACKGROUND — warm dark (深みのある暖褐色)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2C1F1C] via-[#3A2826] to-[#2E2220]" />

      {/* Subtle grain */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          RIGHT PANEL: Piano image with Ken Burns zoom
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute right-0 top-0 w-full md:w-[46%] h-full overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 12, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0"
        >
          <Image
            src="/family-hands-on-piano.png"
            alt="ピアノを弾く家族の手"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        {/* Blend into left panel */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#3A2826] via-[#3A2826]/50 to-transparent md:via-[#3A2826]/20" />
        {/* Bottom fade for wave */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-[#2E2220] to-transparent" />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Thin warm accent line at top
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute top-0 left-0 w-full md:w-[56%] h-[2px] bg-gradient-to-r from-transparent via-[#F28379]/40 to-transparent pointer-events-none z-10" />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          MAIN TEXT — left-aligned
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 sm:px-12 lg:px-20 xl:px-28 pb-40 pt-28 md:w-[58%]">

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-[10px] tracking-[0.45em] text-white/30 uppercase font-sans mb-10 flex items-center gap-3"
        >
          <span className="w-5 h-px bg-white/20 inline-block" />
          Minami-Nagareyama · Piano School
        </motion.p>

        {/* Studio name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12 }}
        >
          <p className="text-white/30 font-serif text-xs tracking-[0.4em] mb-3 uppercase">南流山</p>
          <h1 className="font-serif font-light text-white leading-none">
            <span className="block text-[44px] sm:text-[54px] lg:text-[62px] tracking-[0.12em]">
              TANABE
            </span>
            <span className="block text-[20px] sm:text-[24px] tracking-[0.35em] mt-3 text-white/60">
              ピアノ教室
            </span>
          </h1>
        </motion.div>

        {/* Thin coral rule */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.38 }}
          className="w-14 h-px bg-primary/60 my-7"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.44 }}
          className="font-serif italic text-white/40 text-sm sm:text-base tracking-wide mb-10"
        >
          〜 家族と過ごす日常に、音楽を 〜
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link href="/contact" className="btn-primary-inv">
            体験レッスン申し込み
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/courses" className="btn-outline-inv">
            コースを見る
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.74 }}
          className="mt-14 pt-8 border-t border-white/10 flex gap-10"
        >
          {[
            { value: '2歳半〜', label: '小さなお子様から' },
            { value: '駅1分', label: '南流山駅北口' },
            { value: '5コース', label: '充実のラインナップ' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-xl sm:text-2xl font-light text-white">{s.value}</p>
              <p className="text-[10px] text-white/35 mt-1 tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          WAVE → cream section
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20">
        <svg
          viewBox="0 0 1440 130"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path
            d="M0,60 C240,120 480,20 720,70 C960,120 1200,30 1440,80 L1440,130 L0,130 Z"
            fill="#F2E7C4"
          />
        </svg>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ひょっこりバッハ — さりげなく波の陰から
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute bottom-0 left-8 sm:left-16 z-30 pointer-events-none"
        style={{ height: 110, overflow: 'hidden' }}
      >
        <motion.div
          animate={{ y: [0, -7, 0, -3, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.28, 0.55, 0.75, 1],
          }}
        >
          <Image
            src="/bach-bluehair.png"
            alt="ひょっこりバッハ"
            width={148}
            height={111}
            priority
            style={{ display: 'block', mixBlendMode: 'multiply' }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-36 right-6 z-10 hidden md:flex"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/25"
        >
          <span className="text-[9px] tracking-widest">SCROLL</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </motion.div>

    </section>
  );
}
