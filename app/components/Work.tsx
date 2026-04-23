'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    title: 'Design System',
    description: 'Building scalable component libraries and design tokens for enterprise products',
    gradient: 'from-primary/20 to-primary/5',
    icon: '🎨',
  },
  {
    title: 'Product Design',
    description: 'End-to-end product experiences from research to high-fidelity prototypes',
    gradient: 'from-blue-500/20 to-blue-500/5',
    icon: '📱',
  },
  {
    title: 'AI Interfaces',
    description: 'Designing conversational experiences and AI-powered tools',
    gradient: 'from-purple-500/20 to-purple-500/5',
    icon: '🤖',
  },
  {
    title: 'Developer Tools',
    description: 'Creating intuitive interfaces for complex technical workflows',
    gradient: 'from-orange-500/20 to-orange-500/5',
    icon: '⚡',
  },
]

export default function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <section id="work" className="min-h-screen py-32 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Selected Work</h2>
          <p className="text-xl text-gray-400">
            Projects that showcase design thinking and execution
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative overflow-hidden rounded-2xl bg-gray-900 cursor-pointer"
            >
              <div className={`aspect-[4/3] bg-gradient-to-br ${project.gradient} flex items-center justify-center transition-all duration-300`}>
                <motion.div
                  className="text-6xl opacity-20"
                  whileHover={{ scale: 1.1, opacity: 0.3 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.icon}
                </motion.div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <motion.span
                  className="text-primary text-sm font-semibold inline-flex items-center"
                  whileHover={{ x: 4 }}
                >
                  View Case Study →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
