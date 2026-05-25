import Navigation from '@/app/components/Navigation'
import CaseStudyGrid from '@/app/components/CaseStudyGrid'
import Footer from '@/app/components/Footer'
import { getSortedWork } from '@/lib/mdx'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio | Kyle Goodwin',
  description: 'Selected work spanning design systems, product design, brand, and identity.',
}

export default function PortfolioPage() {
  const work = getSortedWork()

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16">
          <CaseStudyGrid work={work} />
        </div>
      </main>
      <Footer />
    </>
  )
}
