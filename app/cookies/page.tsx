'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Cookie, Shield, Settings } from 'lucide-react'

export default function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function properly.',
      examples: ['Session management', 'Authentication', 'Security features'],
      necessary: true,
    },
    {
      icon: Settings,
      name: 'Performance Cookies',
      description: 'These cookies help us understand how you use DocChat to improve our services.',
      examples: ['Page load times', 'Error tracking', 'User behavior analytics'],
      necessary: false,
    },
    {
      icon: Cookie,
      name: 'Marketing Cookies',
      description: 'These cookies help us track your preferences and deliver targeted content.',
      examples: ['Advertising preferences', 'Retargeting', 'Content personalization'],
      necessary: false,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Link */}
      <div className="border-b border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">
            Last Updated: March 2026
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-4">What Are Cookies?</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cookies are small files that are stored on your device when you visit a website. They help the website remember information about your visit, such as your login status, preferences, and settings. Cookies play an essential role in providing a smooth and personalized web experience.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            At DocChat, we use cookies to enhance your user experience, improve our services, and understand how users interact with our platform. This Cookie Policy explains the types of cookies we use and how you can control them.
          </p>
        </motion.div>

        {/* Cookie Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Types of Cookies We Use</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cookieTypes.map((cookie, index) => {
              const Icon = cookie.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-secondary/30"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{cookie.name}</h3>
                      {cookie.necessary && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                          Always Active
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{cookie.description}</p>
                  <div className="space-y-2">
                    {cookie.examples.map((example, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm text-muted-foreground">{example}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Cookie Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Specific Cookies We Use</h2>
          <div className="space-y-4">
            {[
              {
                name: 'session_id',
                type: 'Essential',
                duration: 'Session',
                purpose: 'Maintains your login session and authenticates your user account.',
              },
              {
                name: 'user_preferences',
                type: 'Essential',
                duration: '1 year',
                purpose: 'Stores your platform preferences and settings.',
              },
              {
                name: 'analytics_token',
                type: 'Performance',
                duration: '2 years',
                purpose: 'Tracks your interactions with the platform to improve user experience.',
              },
              {
                name: 'marketing_id',
                type: 'Marketing',
                duration: '2 years',
                purpose: 'Used for retargeting and personalized content recommendations.',
              },
            ].map((cookie, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
                className="p-4 rounded-lg border border-border bg-secondary/30"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Cookie Name</p>
                    <p className="text-foreground font-mono">{cookie.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Type</p>
                    <p className="text-foreground">{cookie.type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Duration</p>
                    <p className="text-foreground">{cookie.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase">Purpose</p>
                    <p className="text-foreground text-sm">{cookie.purpose}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">How to Control Cookies</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              You have the right to choose whether or not to accept cookies. However, please note that if you choose to refuse cookies, you may not be able to use all of the features of the DocChat platform.
            </p>
            <div className="p-6 rounded-lg border border-border bg-secondary/30">
              <h3 className="font-semibold text-foreground mb-4">Browser Controls</h3>
              <p className="text-muted-foreground mb-4">
                Most browsers allow you to control cookies through their settings. Here's how to manage cookies in popular browsers:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    <strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    <strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    <strong>Safari:</strong> Preferences → Privacy → Manage Website Data
                  </span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>
                    <strong>Edge:</strong> Settings → Privacy → Clear browsing data
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="p-6 rounded-lg border border-border bg-secondary/30"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">Questions About Our Cookie Policy?</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          <a href="mailto:rushilgosain07@gmail.com" className="text-primary hover:text-primary/80 font-medium transition-colors">
            rushilgosain07@gmail.com
          </a>
        </motion.div>
      </div>
    </main>
  )
}
