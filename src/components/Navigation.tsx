'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '/progetti', label: 'Proyectos' },
  { href: '/reel', label: 'Reel' },
  { href: '/rd', label: 'R&D' },
  { href: '/contatti', label: 'Contacto' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Desktop Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* White bar background on hover */}
        <nav className="group/nav relative">
          <div className="absolute inset-0 bg-white/0 group-hover/nav:bg-white transition-colors duration-300" />
          <div className="relative flex items-center justify-between px-8 py-5">
            <Link
              href="/"
              className="text-xl font-medium tracking-tight transition-colors duration-300
                         text-white group-hover/nav:text-black"
            >
              MANUEL GUILLIN
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors duration-300
                    ${pathname === link.href
                      ? 'text-white group-hover/nav:text-black font-medium'
                      : 'text-white/70 group-hover/nav:text-black/60 hover:!text-black'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-sm tracking-wide transition-colors duration-300
                         text-white group-hover/nav:text-black"
            >
              {isOpen ? 'CERRAR' : 'MENU'}
            </button>
          </div>
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
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-3xl font-light tracking-wide hover:opacity-70 transition-opacity"
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
