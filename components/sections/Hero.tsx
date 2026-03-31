'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

/** Decorative piano keys strip — mirrors the top of the concert program */
function PianoKeysStrip() {
  // white key indices where a black key appears to the right
  const blackAfter = new Set([0, 1, 3, 4, 5, 7, 8, 10, 11, 12]);
  const whites = Array.from({ length: 14 });

  return (
    <div className="flex gap-[3px] opacity-25 select-none">
      {whites.map((_, i) => (
        <div key={i} className="relative">
          {/* white key */}
          <div className="w-10 h-28 sm:w-12 sm:h-36 bg-white/80 rounded-b-lg border border-white/40" />
          {/* black key */}
          {blackAfter.has(i) && (
            <div className="absolute top-0 right-0 translate-x-1/2 w-6 sm:w-7 h-16 sm:h-20 bg-gray-900/80 rounded-b-md z-10" />
          )}
        </div>
      ))}
    </div>
  );
}

/** Botanical flourish — mustard-coloured branches, echoing the 2025 program cover */
function BotanicalAccent() {
  return (
    <svg
      viewBox="0 0 120 200"
      className="w-20 sm:w-28 opacity-60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* main stem */}
      <path d="M 60,200 Q 55,140 58,80 Q 60,40 62,10" stroke="#C9A840" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* branches + buds */}
      <path d="M 58,150 Q 30,130 18,110" stroke="#C9A840" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="18" cy="110" r="8" fill="#C9A840" opacity="0.8" />
      <path d="M 60,120 Q 90,98 100,82" stroke="#C9A840" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="100" cy="82" r="7" fill="#C9A840" opacity="0.8" />
      <path d="M 59,88 Q 32,70 24,54" stroke="#C9A840" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="24" cy="54" r="6.5" fill="#C9A840" opacity="0.8" />
      <path d="M 61,60 Q 88,44 96,28" stroke="#C9A840" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="96" cy="28" r="6" fill="#C9A840" opacity="0.8" />
      <circle cx="62" cy="10" r="7" fill="#C9A840" opacity="0.9" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Teal gradient background
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-dark via-primary to-[#5BBCBC]" />

      {/* Subtle noise texture (mimics print stock) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px 200px',
        }}
      />

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Piano keys — top centre (like the program cover)
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute top-14 left-1/2 -translate-x-1/2 flex justify-center overflow-visible pointer-events-none">
        <PianoKeysStrip />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Botanical accent — bottom right
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute bottom-24 right-8 sm:right-16 pointer-events-none">
        <BotanicalAccent />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Main content
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 pb-40 pt-24">

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xs tracking-[0.35em] text-white/50 uppercase font-sans mb-6 flex items-center gap-3"
        >
          <span className="inline-block w-8 h-px bg-white/30" />
          Minami-Nagareyama TANABE Piano School
          <span className="inline-block w-8 h-px bg-white/30" />
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          <p className="font-serif text-sm text-white/70 tracking-wider mb-2">南流山</p>
          <h1 className="font-serif font-light text-white leading-tight">
            <span className="block text-6xl sm:text-7xl md:text-8xl tracking-widest">TANABE</span>
            <span className="block text-3xl sm:text-4xl md:text-5xl tracking-[0.2em] mt-1">ピアノ教室</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif italic text-white/60 text-lg mt-6 mb-10 tracking-wide"
        >
          〜 家族と過ごす日常に、音楽を 〜
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/contact" className="btn-primary-inv">
            体験レッスン申し込み
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/courses" className="btn-outline-inv">
            コースを見る
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="mt-14 flex gap-10 sm:gap-16"
        >
          {[
            { value: '2歳半〜', label: '小さなお子様から' },
            { value: '駅1分', label: '南流山駅北口' },
            { value: '5コース', label: '充実のラインナップ' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-2xl font-light text-white">{s.value}</p>
              <p className="text-[10px] text-white/50 mt-1 tracking-wider">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Wave transition → cream section
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg
          viewBox="0 0 1440 130"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full block"
        >
          <path
            d="M0,60 C240,120 480,20 720,70 C960,120 1200,30 1440,80 L1440,130 L0,130 Z"
            fill="#F5EDD8"
          />
        </svg>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          Bach mascot — peeking from behind the wave (bottom left)
          overflow:hidden clips everything below the wave line
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute bottom-0 left-8 sm:left-16 z-20 pointer-events-none"
        style={{ height: 122, overflow: 'hidden' }}
      >
        <motion.div
          animate={{ y: [0, -9, 0, -4, 0] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.28, 0.55, 0.75, 1],
          }}
        >
          <Image
            src="/bach-bluehair.png"
            alt="ひょっこりバッハ"
            width={176}
            height={132}
            priority
            style={{ display: 'block', mixBlendMode: 'multiply' }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-36 right-8 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-[10px] tracking-widest rotate-90">SCROLL</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

    </section>
  );
}
