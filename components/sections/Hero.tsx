'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-primary-light to-teal-light">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large circle - top right */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-teal/10 blur-3xl" />
        {/* Large circle - bottom left */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        {/* Floating music notes */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-10 text-6xl text-primary opacity-20 font-serif select-none"
        >
          ♪
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-16 text-5xl text-teal opacity-20 font-serif select-none"
        >
          ♫
        </motion.div>
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute bottom-1/3 left-1/4 text-4xl text-primary opacity-15 font-serif select-none"
        >
          ♩
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/4 text-3xl text-teal opacity-15 font-serif select-none"
        >
          ♬
        </motion.div>
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute bottom-1/4 right-10 text-5xl text-primary opacity-20 font-serif select-none"
        >
          ♪
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-1/4 w-4 h-4 rounded-full bg-teal/30" />
        <div className="absolute top-40 left-1/3 w-3 h-3 rounded-full bg-primary/30" />
        <div className="absolute bottom-32 right-1/3 w-5 h-5 rounded-full bg-teal/20" />
        <div className="absolute bottom-20 left-1/4 w-2 h-2 rounded-full bg-primary/40" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <p className="text-sm tracking-widest text-teal uppercase font-sans mb-6 flex items-center justify-center gap-3">
            <span className="inline-block w-8 h-px bg-teal"></span>
            Minami-Nagareyama TANABE Piano School
            <span className="inline-block w-8 h-px bg-teal"></span>
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-medium text-dark-text mb-4 leading-tight"
        >
          南流山
          <span className="text-primary">TANABE</span>
          <br />
          ピアノ教室
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-xl sm:text-2xl text-muted-text font-serif mb-4"
        >
          〜家族と過ごす日常に音楽を〜
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          className="text-sm text-muted-text mb-10"
        >
          南流山駅北口より徒歩1分 ♪ 2歳半〜大人まで
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/contact"
            className="btn-primary text-base px-10 py-4"
          >
            体験レッスン申し込み
          </Link>
          <Link
            href="/courses"
            className="btn-outline text-base px-10 py-4"
          >
            コースを見る
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: '2歳半〜', label: '小さなお子様から' },
            { value: '駅1分', label: '南流山駅北口から' },
            { value: '5コース', label: '豊富なコース設定' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-serif font-medium text-primary">{stat.value}</p>
              <p className="text-xs text-muted-text mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll down indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-muted-text"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
