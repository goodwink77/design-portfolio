'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const experiences = [
  {
    period: '2020 - Present',
    title: 'Senior Design Lead',
    company: 'Company Name',
    description:
      'Leading design systems and product design for enterprise-scale applications. Building component libraries, establishing design operations, and mentoring designers.',
    current: true,
  },
  {
    period: '2018 - 2020',
    title: 'Product Designer',
    company: 'Previous Company',
    description:
      'Designed and shipped user-facing features for web and mobile applications. Conducted user research and collaborated with engineering teams.',
    current: false,
  },
  {
    period: '2016 - 2018',
    title: 'UX Designer',
    company: 'Earlier Company',
    description:
      'Created wireframes, prototypes, and high-fidelity designs for client projects. Worked across industries including healthcare, finance, and e-commerce.',
    current: false,
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, 0.01, 0.9],
      },
    },
  }

  return (
    <section id="experience" className="min-h-screen py-32 px-6" ref={ref}>
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-gray-400">Where I've worked and what I've built</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              variants={itemVariants}
              className={`border-l-2 ${
                exp.current ? 'border-primary' : 'border-gray-700'
              } pl-8 ${index !== experiences.length - 1 ? 'pb-12' : ''}`}
              whileHover={{ x: 4 }}
            >
              <motion.div className="mb-2">
                <span
                  className={`text-sm font-semibold ${
                    exp.current ? 'text-primary' : 'text-gray-500'
                  }`}
                >
                  {exp.period}
                </span>
              </motion.div>
              <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
              <p className="text-gray-400 mb-4">{exp.company}</p>
              <p className="text-gray-300 leading-relaxed">{exp.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
