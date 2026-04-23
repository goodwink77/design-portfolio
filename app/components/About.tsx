'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const expertise = [
  {
    title: 'Design Systems',
    description: 'Component libraries, design tokens, documentation',
  },
  {
    title: 'Product Design',
    description: 'User research, prototyping, interaction design',
  },
  {
    title: 'Design Leadership',
    description: 'Team building, design operations, strategy',
  },
  {
    title: 'AI/ML Interfaces',
    description: 'Conversational UI, generative experiences',
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="about" className="min-h-screen py-32 px-6 bg-gray-900/50" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-gray-400">Design leader, systems thinker, builder</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-lg text-gray-300 leading-relaxed mb-6">
              I'm a design leader passionate about creating scalable design systems and
              thoughtful user experiences. With a background spanning product design,
              design systems, and UX strategy, I help teams build products that are both
              beautiful and functional.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Currently working on design systems and AI-powered experiences, I believe in
              the power of good design to make complex technology accessible and delightful.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <h3 className="text-xl font-bold mb-6">Areas of Expertise</h3>
            <div className="space-y-4">
              {expertise.map((item) => (
                <motion.div key={item.title} variants={itemVariants} className="flex items-start">
                  <motion.div
                    className="w-2 h-2 bg-primary rounded-full mt-2 mr-4"
                    whileHover={{ scale: 1.5 }}
                  />
                  <div>
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
