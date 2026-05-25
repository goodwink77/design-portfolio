'use client'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
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

const cards = [
  {
    index: '01',
    title: 'Design Systems',
    body: 'Building the shared language teams actually use: tokens, components, documentation, governance. Currently at Salesforce leading Design Systems.',
  },
  {
    index: '02',
    title: 'Product Design',
    body: 'End-to-end UX from discovery to shipped. Translating ambiguous problems into clear interaction patterns that scale across platforms and teams.',
  },
  {
    index: '03',
    title: 'Brand & Identity',
    body: 'Where it all started. Visual systems with real consistency, not just a logo but the foundations that hold everything together over time.',
  },
  {
    index: '04',
    title: 'AI Workflows',
    body: 'Designing for AI-powered products and embedding AI into the design process itself. Faster iteration, smarter documentation, better outcomes.',
  },
  {
    index: '05',
    title: 'Design Leadership',
    body: 'Aligning designers, engineers, and product leaders around shared systems and outcomes. The job is translation: turning strategy into something teams can actually execute.',
  },
  {
    index: '06',
    title: 'Accessibility',
    body: 'Inclusive design as a core practice, not an afterthought. WCAG compliance, keyboard navigation, and accessible tokens baked in from the start.',
  },
]

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">

        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pt-32 pb-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left: name + intro */}
            <div className="flex-1 max-w-xl">
              <motion.p
                className="text-[11px] font-sans font-600 uppercase tracking-[0.2em] text-mid-gray mb-5"
                variants={fadeUp}
                custom={0}
                initial="hidden"
                animate="show"
              >
                Design Leader
              </motion.p>

              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-ink leading-[1.02] mb-8"
                variants={fadeUp}
                custom={0.1}
                initial="hidden"
                animate="show"
              >
                Kyle<br />Goodwin
              </motion.h1>

              <motion.div
                className="h-px bg-rule mb-8"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              />

              <motion.p
                className="text-[15px] font-light text-ink/70 leading-relaxed mb-10"
                variants={fadeUp}
                custom={0.3}
                initial="hidden"
                animate="show"
              >
                I build design systems and lead design teams at the intersection of visual
                craft and engineering reality. Currently Principal Product Designer at
                Salesforce, where I work on Design Systems.
              </motion.p>

              <motion.div
                className="flex items-center gap-4"
                variants={fadeUp}
                custom={0.4}
                initial="hidden"
                animate="show"
              >
                <Link
                  href="/portfolio"
                  className="text-[11px] font-sans font-600 uppercase tracking-[0.16em] bg-ink text-cream px-5 py-2.5 hover:bg-terracotta transition-colors"
                >
                  View Work
                </Link>
                <Link
                  href="/about"
                  className="text-[11px] font-sans font-600 uppercase tracking-[0.16em] border border-rule text-mid-gray px-5 py-2.5 hover:border-ink hover:text-ink transition-colors"
                >
                  About Me
                </Link>
              </motion.div>
            </div>

            {/* Right: hero image */}
            <motion.div
              className="w-full lg:w-[420px] shrink-0"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              <div className="aspect-[4/5] overflow-hidden bg-parchment">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/home/hero.jpg"
                  alt="Kyle Goodwin portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Rule + section label ──────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center gap-5 mb-12">
            <h2 className="shrink-0 text-lg font-bold tracking-[0.08em] uppercase text-ink">
              Areas of Focus
            </h2>
            <div className="flex-1 h-px bg-rule" />
          </div>
        </div>

        {/* ── Career cards ─────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 md:px-10 pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-rule">
            {cards.map((card, i) => (
              <motion.div
                key={card.index}
                className="bg-cream p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.4 + i * 0.07,
                }}
              >
                <p className="text-[10px] font-sans font-700 uppercase tracking-[0.2em] text-terracotta-dark mb-4">
                  {card.index}
                </p>
                <h3 className="text-base font-bold text-ink mb-3">{card.title}</h3>
                <p className="text-[13px] font-light text-ink/60 leading-relaxed">{card.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
