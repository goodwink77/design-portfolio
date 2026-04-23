'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Experience from './components/Experience'
import Footer from './components/Footer'

export default function Home() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main className="relative">
      <Navigation />
      <Hero opacity={opacity} />
      <Work />
      <About />
      <Experience />
      <Footer />
    </main>
  )
}
