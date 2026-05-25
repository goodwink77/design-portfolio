'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { label: 'Home',      href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'About',     href: '/about' },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        <Link href="/" aria-label="Home" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Kyle Goodwin"
            width={30}
            height={30}
            className="h-[30px] w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-8">
          {links.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={label}
                href={href}
                className={`text-[11px] font-sans font-bold uppercase tracking-[0.18em] transition-colors ${
                  isActive
                    ? 'text-terracotta'
                    : 'text-mid-gray hover:text-ink'
                }`}
              >
                {label}
              </Link>
            )
          })}
        </div>
      </nav>
      {/* Structural bottom rule — always visible */}
      <div className="h-px bg-rule w-full" />
    </header>
  )
}
