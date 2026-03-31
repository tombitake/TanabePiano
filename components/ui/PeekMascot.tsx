'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface PeekMascotProps {
  /** Which side of the page to position the mascot */
  side?: 'left' | 'right';
  /**
   * How many px of the mascot image appear above the boundary line.
   * The image top (curly hair arc) is shown; everything else is clipped below.
   */
  peekPx?: number;
  /** Width of the mascot image in px */
  mascotWidth?: number;
  /** Mirror horizontally */
  flip?: boolean;
  /** Override the edge offset class (defaults depend on `side`) */
  edgeClass?: string;
}

/**
 * PeekMascot — "ひょっこりバッハ"
 *
 * Renders as a zero-height boundary marker between two <section> elements.
 * The mascot is absolutely positioned with its BOTTOM flush with the
 * section boundary, then clipped by overflow:hidden so only the top
 * `peekPx` of the image (curly hair arc) is visible above the line.
 *
 * Usage:
 *   <section>…upper section…</section>
 *   <PeekMascot side="right" />
 *   <section>…lower section…</section>
 */
export function PeekMascot({
  side = 'right',
  peekPx = 58,
  mascotWidth = 160,
  flip = false,
  edgeClass,
}: PeekMascotProps) {
  // Image aspect ratio: bach-bluehair.png is approximately 520×460
  const aspectRatio = 460 / 520;
  const mascotHeight = Math.round(mascotWidth * aspectRatio);

  const defaultEdge =
    side === 'left' ? 'left-8 sm:left-20' : 'right-8 sm:right-20';
  const positionClass = edgeClass ?? defaultEdge;

  return (
    /* Zero-height marker — sits exactly on the boundary between sections */
    <div className="relative z-20 pointer-events-none" style={{ height: 0 }}>
      {/* Clipping box: bottom at boundary, height = peekPx → shows only the hair arc */}
      <div
        className={`absolute ${positionClass}`}
        style={{ bottom: 0, height: peekPx, overflow: 'hidden' }}
      >
        {/* Bob animation — peeks a little more, then settles back */}
        <motion.div
          animate={{ y: [0, -9, 0, -4, 0] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: 'easeInOut',
            times: [0, 0.28, 0.55, 0.75, 1],
          }}
          style={flip ? { transform: 'scaleX(-1)' } : undefined}
        >
          <Image
            src="/bach-bluehair.png"
            alt="ひょっこりバッハ"
            width={mascotWidth}
            height={mascotHeight}
            priority={false}
            style={{
              display: 'block',
              /*
               * multiply blend: the white background of the PNG is blended
               * away against whatever section colour sits beneath, leaving
               * only the teal hair and dark outlines visible.
               */
              mixBlendMode: 'multiply',
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
