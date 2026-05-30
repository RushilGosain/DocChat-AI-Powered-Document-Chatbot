'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Users, Lightbulb, Target, Heart } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what is possible with AI and document processing.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'We believe in building a strong community of users who share our vision.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We are committed to delivering the highest quality service to our users.',
    },
    {
      icon: Heart,
      title: 'Trust',
      description: 'Your privacy and security are our top priorities in everything we do.',
    },
  ]

  const team = [
    {
      name: 'Rushil Gosain',
      role: 'Co-Founder & CEO',
      bio: 'Full-stack engineer passionate about building scalable systems.',
    },
    {
      name: 'Khushi Gupta',
      role: 'Co-Founder & CTO',
      bio: 'AI researcher with 10+ years of experience in machine learning.',
    },
    
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Link */}
      <div className="border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            About DocChat
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            We're revolutionizing how organizations interact with their documents through intelligent AI-powered conversations.
          </p>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-8 rounded-lg border border-border bg-secondary/30"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To empower organizations of all sizes to unlock the value hidden in their documents through intelligent, conversational AI. We believe that everyone should have access to powerful document analysis tools without needing to be a data scientist.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-8 rounded-lg border border-border bg-secondary/30"
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create a world where documents are not just stored but actively utilized through intelligent conversations. We envision a future where every document becomes a knowledgeable assistant, making information accessible to everyone.
            </p>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-6 rounded-lg border border-border bg-secondary/30"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground text-center mb-1">{member.name}</h3>
                <p className="text-sm text-primary text-center mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-20"
        >
         
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-center"
        >
          <p className="text-muted-foreground mb-6">Ready to experience the future of document analysis?</p>
          <Link
            href="/chat"
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all"
          >
            Start Free Trial
          </Link>
        </motion.div>
      </div>
    </main>
  )
}
