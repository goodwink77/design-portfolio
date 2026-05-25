'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import CaseStudyCard, { TileItem } from './CaseStudyCard'
import { CaseStudyFrontmatter } from '@/lib/mdx'

const PLACEHOLDER_COLORS = [
  '#C4633A',
  '#4A6B7C',
  '#7A8C6E',
  '#9B4E3D',
  '#8B6F5E',
  '#5C7A5C',
  '#6B5B73',
  '#B8956A',
]

const NATURE_SEEDS = [
  'forest',
  'mountain',
  'ocean',
  'river',
  'valley',
  'canyon',
  'meadow',
  'lake',
]

const ASPECT_CLASSES = [
  'aspect-[3/4]',
  'aspect-[4/5]',
  'aspect-[1/1]',
  'aspect-[3/4]',
  'aspect-[4/3]',
  'aspect-[2/3]',
  'aspect-[1/1]',
  'aspect-[4/5]',
]

function buildTiles(work: CaseStudyFrontmatter[]): TileItem[] {
  return work.map((item, i) => ({
    slug: item.slug,
    title: item.title,
    category: (item.category ?? item.tags[0] ?? 'Work') as string,
    coverImage: item.coverImage || `https://picsum.photos/seed/${NATURE_SEEDS[i % NATURE_SEEDS.length]}/800/800`,
    placeholderColor: PLACEHOLDER_COLORS[i % PLACEHOLDER_COLORS.length],
    aspectClass: ASPECT_CLASSES[i % ASPECT_CLASSES.length],
  }))
}

function collectCategories(work: CaseStudyFrontmatter[]): string[] {
  const seen = new Set<string>()
  const ordered: string[] = []
  for (const item of work) {
    const cats = [item.category, ...item.tags].filter(Boolean) as string[]
    for (const cat of cats) {
      if (!seen.has(cat)) {
        seen.add(cat)
        ordered.push(cat)
      }
    }
  }
  return ordered
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const tileVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

interface CaseStudyGridProps {
  work: CaseStudyFrontmatter[]
}

export default function CaseStudyGrid({ work }: CaseStudyGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('All')

  const categories = useMemo(() => ['All', ...collectCategories(work)], [work])
  const tiles = useMemo(() => buildTiles(work), [work])

  const filtered = activeFilter === 'All'
    ? tiles
    : tiles.filter((t, i) => {
        const item = work[i]
        if (!item) return false
        return (
          item.category === activeFilter ||
          item.tags.includes(activeFilter)
        )
      })

  if (tiles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-[13px] font-light text-mid-gray">
          No case studies yet. Add a row to the Google Sheet and run <code className="font-mono text-ink">npm run content:build</code>.
        </p>
      </div>
    )
  }

  return (
    <div>
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`text-[11px] font-sans font-600 uppercase tracking-[0.16em] px-3 py-1.5 border transition-colors ${
                activeFilter === cat
                  ? 'border-terracotta bg-terracotta text-cream'
                  : 'border-rule text-mid-gray hover:border-ink hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <motion.div
        key={activeFilter}
        className="columns-2 md:columns-3 gap-3 md:gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {filtered.map((tile) => (
          <motion.div
            key={tile.slug}
            variants={tileVariants}
            className="break-inside-avoid mb-4 md:mb-5"
          >
            <CaseStudyCard item={tile} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
