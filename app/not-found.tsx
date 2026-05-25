'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-cream">
      <video
        className="absolute inset-0 w-full h-full object-cover motion-reduce:hidden"
        src="/videos/mountain-road.mp4"
        poster="/videos/mountain-road-poster.jpg"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      <img
        src="/videos/mountain-road-poster.jpg"
        alt=""
        aria-hidden="true"
        className="hidden motion-reduce:block absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 bg-ink/55"
        aria-hidden="true"
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="text-[11px] font-sans font-700 uppercase tracking-[0.2em] text-terracotta mb-6"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="show"
        >
          Error 404
        </motion.p>

        <motion.h1
          className="text-5xl md:text-7xl font-bold tracking-tight text-cream leading-[1.02] mb-6"
          variants={fadeUp}
          custom={0.1}
          initial="hidden"
          animate="show"
        >
          Took a wrong<br />turn.
        </motion.h1>

        <motion.div
          className="w-16 h-px bg-cream/40 mb-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
        />

        <motion.p
          className="text-[15px] font-light text-cream/85 leading-relaxed max-w-md mb-10"
          variants={fadeUp}
          custom={0.3}
          initial="hidden"
          animate="show"
        >
          The page you were looking for is not on the map. Let's get you back on the road.
        </motion.p>

        <motion.div
          className="flex items-center gap-4"
          variants={fadeUp}
          custom={0.4}
          initial="hidden"
          animate="show"
        >
          <Link
            href="/"
            className="text-[11px] font-sans font-700 uppercase tracking-[0.16em] bg-cream text-ink px-5 py-2.5 hover:bg-terracotta hover:text-cream transition-colors"
          >
            Back Home
          </Link>
          <Link
            href="/portfolio"
            className="text-[11px] font-sans font-700 uppercase tracking-[0.16em] border border-cream/60 text-cream px-5 py-2.5 hover:border-cream hover:bg-cream/10 transition-colors"
          >
            View Work
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
