'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { FileText, Brain, Zap, Lock, BarChart3, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function FeaturesPage() {
  const features = [
    {
      icon: FileText,
      title: 'Multi-Format Support',
      description: 'Upload and process documents in PDF, DOCX, XLSX, TXT, and more. Our intelligent parser extracts text and structure automatically.',
      details: [
        'Handles 5+ document formats',
        'Automatic text extraction',
        'Preserves document structure',
        'Batch upload capability',
      ],
    },
    {
      icon: Brain,
      title: 'AI-Powered Understanding',
      description: 'Advanced language models powered by Hugging Face understand context and nuance in your documents.',
      details: [
        'State-of-the-art embeddings',
        'Semantic search capabilities',
        'Context-aware responses',
        'Multi-language support',
      ],
    },
    {
      icon: Zap,
      title: 'Lightning Fast Responses',
      description: 'Get answers instantly from your documents. Optimized vector search ensures quick retrieval.',
      details: [
        'Sub-second response times',
        'Efficient vector indexing',
        'Real-time search',
        'Optimized caching',
      ],
    },
    {
      icon: Lock,
      title: 'Enterprise Security',
      description: 'Your data stays private. Local processing, encrypted storage, and no data sharing with third parties.',
      details: [
        'End-to-end encryption',
        'Local data processing',
        'No third-party sharing',
        'GDPR compliant',
      ],
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track usage patterns and get insights from your chat history. Understand how your team interacts with documents.',
      details: [
        'Usage analytics',
        'Search patterns',
        'Popular queries',
        'Performance metrics',
      ],
    },
    {
      icon: Settings,
      title: 'Easy Integration',
      description: 'Simple API and webhooks for seamless integration into your existing workflows and applications.',
      details: [
        'RESTful API',
        'Webhook support',
        'SDK available',
        'Detailed documentation',
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
              Powerful Features for <span className="text-primary">Smart Document</span> Interaction
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Discover the comprehensive set of features that make DocChat the most intelligent document-based chatbot platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-lg border border-border bg-card hover:bg-secondary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  <ul className="space-y-2">
                    {feature.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose DocChat?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Superior to traditional document search and Q&A solutions
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">Feature</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">DocChat</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Traditional Search</th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">Manual Review</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Semantic Understanding', docchat: '✓', traditional: '✗', manual: '✓' },
                  { feature: 'Instant Answers', docchat: '✓', traditional: '✓', manual: '✗' },
                  { feature: 'Contextual Responses', docchat: '✓', traditional: '✗', manual: '✓' },
                  { feature: 'Multi-Document Search', docchat: '✓', traditional: '✓', manual: '✗' },
                  { feature: 'Natural Language Queries', docchat: '✓', traditional: '✗', manual: '✓' },
                  { feature: 'Source Attribution', docchat: '✓', traditional: '✗', manual: '✓' },
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-4 px-4 text-foreground font-medium">{row.feature}</td>
                    <td className="py-4 px-4 text-center text-primary">{row.docchat}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">{row.traditional}</td>
                    <td className="py-4 px-4 text-center text-muted-foreground">{row.manual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Ready to Experience These Features?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start using DocChat today and revolutionize how you interact with your documents.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              asChild
            >
              <Link href="/chat">Get Started Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
