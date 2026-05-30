'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { BookOpen, Briefcase, Building2, Users, Zap, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SolutionsPage() {
  const solutions = [
    {
      icon: BookOpen,
      title: 'Education & Learning',
      description: 'Transform how students and educators interact with course materials and research documents.',
      benefits: [
        'Instant homework help from textbooks',
        'Research paper summarization',
        'Course material Q&A',
        'Study guide generation',
      ],
      useCases: [
        'Student learning assistants',
        'Course material navigation',
        'Research documentation',
        'Exam preparation',
      ],
    },
    {
      icon: Briefcase,
      title: 'Business Intelligence',
      description: 'Extract insights from reports, contracts, and business documents in seconds.',
      benefits: [
        'Contract analysis and review',
        'Report insights extraction',
        'Competitive analysis',
        'Market research',
      ],
      useCases: [
        'Legal document review',
        'Financial report analysis',
        'Proposal evaluation',
        'Business intelligence',
      ],
    },
    {
      icon: Building2,
      title: 'Enterprise Support',
      description: 'Provide instant support to employees and customers using internal documentation.',
      benefits: [
        'Self-service knowledge base',
        'Internal policy guidance',
        'Customer support automation',
        'HR documentation access',
      ],
      useCases: [
        'Customer support chatbot',
        'Employee handbook assistant',
        'Company policy guide',
        'Technical documentation',
      ],
    },
    {
      icon: Briefcase,
      title: 'Legal & Compliance',
      description: 'Accelerate legal document analysis and ensure regulatory compliance.',
      benefits: [
        'Contract clause analysis',
        'Compliance checking',
        'Risk identification',
        'Document comparison',
      ],
      useCases: [
        'Contract reviews',
        'Regulatory compliance',
        'Due diligence',
        'Legal research',
      ],
    },
    {
      icon: Users,
      title: 'Customer Service',
      description: 'Empower your support team with instant access to knowledge and documentation.',
      benefits: [
        'Instant answer resolution',
        'Consistent responses',
        'Reduced support time',
        'Improved satisfaction',
      ],
      useCases: [
        'FAQ automation',
        'Ticket resolution',
        'Knowledge management',
        'Self-service support',
      ],
    },
    {
      icon: TrendingUp,
      title: 'Data Analysis & Research',
      description: 'Streamline analysis of large datasets and research documents.',
      benefits: [
        'Data insights extraction',
        'Pattern identification',
        'Trend analysis',
        'Report generation',
      ],
      useCases: [
        'Market research analysis',
        'Scientific paper review',
        'Data visualization',
        'Trend forecasting',
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Solutions for Every <span className="text-primary">Industry</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              DocChat adapts to your specific needs, whether you&apos;re in education, business, legal, or any other field.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, i) => {
              const Icon = solution.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">
                        {solution.title}
                      </h3>
                      <p className="text-muted-foreground mt-1">
                        {solution.description}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-sm">Key Benefits</h4>
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 text-sm">Use Cases</h4>
                      <ul className="space-y-2">
                        {solution.useCases.map((useCase, j) => (
                          <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {useCase}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Implementation Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to get your solution up and running
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Upload Documents', desc: 'Add your documents to the system' },
              { step: '2', title: 'Index & Process', desc: 'AI automatically processes and indexes' },
              { step: '3', title: 'Ask Questions', desc: 'Get instant answers from your docs' },
              { step: '4', title: 'Scale & Integrate', desc: 'Deploy across your organization' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold text-primary text-lg">{item.step}</span>
                </div>
                <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Solution
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              See how DocChat can transform your industry. Start with a free trial today.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              asChild
            >
              <Link href="/chat">Start Free Trial</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
