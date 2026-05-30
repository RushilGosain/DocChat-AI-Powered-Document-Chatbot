'use client'

import { motion } from 'framer-motion'
import { FileText, Zap, Shield, BarChart3, RefreshCw, Lock } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: FileText,
      title: 'Multi-Format Support',
      description: 'Upload PDF, DOCX, TXT, XLSX, and more. Process documents instantly with intelligent extraction.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get answers in milliseconds with advanced vector search and retrieval augmentation.',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your documents stay private. No data tracking or unnecessary storage of your content.',
    },
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Track your interactions, document usage, and get insights from your conversations.',
    },
    {
      icon: RefreshCw,
      title: 'Real-time Updates',
      description: 'Update documents on the fly and see changes reflected instantly in your chats.',
    },
    {
      icon: Lock,
      title: 'Enterprise Grade',
      description: 'Built with scalability and reliability. Perfect for teams and organizations.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to interact with your documents intelligently
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
