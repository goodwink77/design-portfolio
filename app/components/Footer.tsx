'use client'

import { motion } from 'framer-motion'

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com' },
  { name: 'GitHub', href: 'https://github.com' },
  { name: 'Twitter', href: 'https://twitter.com' },
]

export default function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <div className="text-gray-400 mb-4 md:mb-0">
            © {new Date().getFullYear()} Kyle Goodwin. All rights reserved.
          </div>
          <div className="flex items-center space-x-6">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ y: -2 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
