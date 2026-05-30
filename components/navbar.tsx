'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    router.push('/')
  }

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/solutions', label: 'Solutions' },
    { href: '/#testimonies', label: 'Testimonies' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <motion.nav 
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-bold text-primary">DC</span>
              </div>
              DocChat
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="w-8 h-8 animate-pulse rounded-full bg-primary/20" />
            ) : user ? (
              <>
                <span className="text-sm text-muted-foreground">{user.email}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </motion.button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href="/chat">Chat</Link>
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-border hover:bg-secondary"
                  asChild
                >
                  <Link href="/auth/login">Sign In</Link>
                </Button>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    size="sm"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="px-4 pt-2 space-y-2">
              {loading ? (
                <div className="w-full h-10 animate-pulse rounded-md bg-primary/20" />
              ) : user ? (
                <>
                  <div className="text-sm text-muted-foreground px-2 py-2">
                    {user.email}
                  </div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="w-full border-border hover:bg-secondary flex gap-2"
                    onClick={handleLogout}
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                  <Button 
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href="/chat" onClick={() => setIsOpen(false)}>Go to Chat</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-border hover:bg-secondary"
                    asChild
                  >
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>Sign In</Link>
                  </Button>
                  <Button 
                    size="sm"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    asChild
                  >
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
