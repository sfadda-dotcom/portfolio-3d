'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/progetti', label: 'Work' },
  { href: '/studio', label: 'About Me' },
  { href: '/reel', label: 'Reel' },
  { href: '/rd', label: 'R&D' },
  { href: '/contatti', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-[var(--section-padding-x)] h-16">
          {/* Left — Nav links (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[11px] tracking-[0.15em] uppercase transition-opacity duration-300
                  ${pathname === link.href
                    ? 'text-white opacity-100'
                    : 'text-white opacity-50 hover:opacity-100'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile — Menu button (left) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[11px] tracking-[0.15em] uppercase text-white"
          >
            {isOpen ? 'CLOSE' : 'MENU'}
          </button>

          {/* Right — Logo */}
          <Link
            href="/"
            className="text-[11px] font-medium tracking-[0.25em] uppercase text-white hover:opacity-70 transition-opacity"
          >
            MANUEL GUILLIN
          </Link>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black flex items-center justify-center md:hidden"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-2xl font-extralight tracking-[0.1em] uppercase hover:opacity-60 transition-opacity"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
