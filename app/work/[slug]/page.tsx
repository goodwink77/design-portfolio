import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getWorkBySlug, getAllWorkSlugs } from '@/lib/mdx'
import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import Gallery from '@/app/components/Gallery'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllWorkSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const work = getWorkBySlug(params.slug)
  if (!work) return {}
  return {
    title: `${work.title} | Kyle Goodwin`,
    description: work.description,
  }
}

function splitContentAtChallenge(content: string): { overview: string; rest: string } {
  const headingPattern = /^## (?!Overview)/m
  const match = content.match(headingPattern)
  if (!match || match.index === undefined) {
    return { overview: content, rest: '' }
  }
  return {
    overview: content.slice(0, match.index).trim(),
    rest: content.slice(match.index).trim(),
  }
}

export default function CaseStudyPage({ params }: PageProps) {
  const work = getWorkBySlug(params.slug)

  if (!work || work.draft) notFound()

  const { overview, rest } = splitContentAtChallenge(work.content)
  const hasGallery = work.gallery && work.gallery.length > 0

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        {/* Hero image — full bleed */}
        {work.coverImage && (
          <div className="relative w-full aspect-[32/7] overflow-hidden bg-parchment">
            <Image
              src={work.coverImage}
              alt={work.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="max-w-3xl mx-auto px-6 md:px-10 pt-16 pb-16">

          {/* Back */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-[11px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray hover:text-terracotta transition-colors mb-12"
          >
            <span aria-hidden="true">←</span> All work
          </Link>

          {/* Title block */}
          <div className="h-px bg-rule mb-8" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-ink leading-tight mb-4">
            {work.title}
          </h1>
          <p className="text-base font-light text-mid-gray mb-12">{work.description}</p>

          {/* Metadata row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-b border-rule py-6 mb-14">
            <div className="pr-6">
              <p className="text-[10px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray mb-1">Year</p>
              <p className="text-[14px] font-medium text-ink">{work.year}</p>
            </div>
            <div className="pr-6">
              <p className="text-[10px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray mb-1">Role</p>
              <p className="text-[14px] font-medium text-ink">{work.role}</p>
            </div>
            {work.client && (
              <div className="pr-6">
                <p className="text-[10px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray mb-1">Client</p>
                <p className="text-[14px] font-medium text-ink">{work.client}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-sans font-600 uppercase tracking-[0.16em] text-mid-gray mb-1">Tags</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-sans font-500 uppercase tracking-[0.1em] border border-rule text-mid-gray px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Overview */}
          {overview && (
            <article className="prose prose-bauhaus max-w-none mb-14">
              <MDXRemote source={overview} />
            </article>
          )}

          {/* Gallery thumbnails (after Overview, before remaining sections) */}
          {hasGallery && (
            <div className="mb-14">
              <Gallery items={work.gallery!} />
            </div>
          )}

          {/* Remaining sections */}
          {rest && (
            <article className="prose prose-bauhaus max-w-none">
              <MDXRemote source={rest} />
            </article>
          )}

        </div>
      </main>
      <Footer />
    </>
  )
}
