import Navigation from '@/app/components/Navigation'
import Footer from '@/app/components/Footer'
import AboutContent from './AboutContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | Kyle Goodwin',
  description:
    'Driving scalable product outcomes by aligning teams, systems, and strategy into cohesive, execution-ready frameworks.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <AboutContent />
      </main>
      <Footer />
    </>
  )
}
