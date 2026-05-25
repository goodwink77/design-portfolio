'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export interface TileItem {
  slug: string
  title: string
  category: string
  coverImage?: string
  placeholderColor: string
  aspectClass: string
}

const imageVariants = {
  rest: { opacity: 1 },
  hover: { opacity: 0.2, transition: { duration: 0.35, ease: 'easeOut' } },
}

const textVariants = {
  rest: { opacity: 0, y: 10 },
  hover: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut', delay: 0.05 } },
}

interface CardInnerProps {
  item: TileItem
}

function CardInner({ item }: CardInnerProps) {
  return (
    <motion.div
      className={`relative w-full overflow-hidden ${item.aspectClass}`}
      style={{ backgroundColor: item.placeholderColor }}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Nature image */}
      {item.coverImage && (
        <motion.img
          src={item.coverImage}
          alt={item.title}
          variants={imageVariants}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Centered title + category — appears on hover */}
      <motion.div
        variants={textVariants}
        className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center"
      >
        <p className="text-[11px] font-sans font-600 uppercase tracking-[0.2em] text-cream/70 mb-2">
          {item.category}
        </p>
        <p className="text-base font-bold text-cream leading-snug">
          {item.title}
        </p>
      </motion.div>
    </motion.div>
  )
}

interface CaseStudyCardProps {
  item: TileItem
  isPlaceholder?: boolean
}

export default function CaseStudyCard({ item, isPlaceholder = false }: CaseStudyCardProps) {
  if (isPlaceholder) {
    return <CardInner item={item} />
  }

  return (
    <Link href={`/work/${item.slug}`} className="block">
      <CardInner item={item} />
    </Link>
  )
}
