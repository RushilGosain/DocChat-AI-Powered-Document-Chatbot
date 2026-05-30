'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Lock, Eye, Share2, Trash2, User, Database } from 'lucide-react'

export default function PrivacyPage() {
  const sections = [
    {
      icon: Lock,
      title: 'Data Security',
      content: 'We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.',
    },
    {
      icon: Eye,
      title: 'Data Visibility',
      content: 'You have full control over what personal information you share with us and how it is used in your DocChat account.',
    },
    {
      icon: Share2,
      title: 'Data Sharing',
      content: 'We do not sell, trade, or rent your personal information to third parties without your explicit consent.',
    },
    {
      icon: Trash2,
      title: 'Data Deletion',
      content: 'You can request deletion of your personal data at any time. We will process your request within 30 days.',
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
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
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
          <h2 className="text-2xl font-bold text-foreground mb-4">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            DocChat operates the DocChat website and application. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains our online information practices and the choices you can make about the way your information is collected and used.
          </p>
        </motion.div>

        {/* Key Privacy Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-8">Your Privacy Rights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sections.map((section, index) => {
              const Icon = section.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-secondary/30"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{section.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Information Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Information We Collect</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </h3>
              <p className="text-muted-foreground mb-3">We may collect the following personal information:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Name and email address</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Account credentials and authentication information</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Billing information and payment history</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Phone number (optional)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Company or organization name</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Database className="w-5 h-5 text-primary" />
                Usage Data
              </h3>
              <p className="text-muted-foreground mb-3">We automatically collect information about your interactions with our service:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Pages visited and time spent</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Documents uploaded and processed</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Chat queries and interactions</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>IP address and browser information</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* How We Use Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">How We Use Your Information</h2>
          <div className="p-6 rounded-lg border border-border bg-secondary/30">
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>To provide and maintain our service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>To notify you about changes to our service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>To allow you to participate in interactive features</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>To provide customer service and respond to inquiries</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <span>To gather analysis or valuable information to improve our service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">6.</span>
                <span>To monitor the usage of our service</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">7.</span>
                <span>To detect, prevent and address technical and security issues</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Data Protection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Data Protection & Security</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
            <div className="p-6 rounded-lg border border-border bg-secondary/30">
              <h3 className="font-semibold text-foreground mb-4">Our Security Measures Include:</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Encryption of data in transit and at rest</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Secure authentication mechanisms</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Restricted access to personal information</span>
                </li>
                <li className="flex gap-2">
                  <span>•</span>
                  <span>Compliance with international data protection standards</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="p-6 rounded-lg border border-border bg-secondary/30"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">Contact Us</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <a href="mailto:rushilgosain07@gmail.com" className="text-primary hover:text-primary/80 font-medium transition-colors">
            rushilgosain07@gmail.com
          </a>
        </motion.div>
      </div>
    </main>
  )
}
