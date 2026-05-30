'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

export default function BlogSection() {
  const posts = [
    {
      slug: 'getting-started-with-rag',
      title: 'Getting Started with RAG: A Beginner\'s Guide',
      excerpt: 'Learn the fundamentals of Retrieval-Augmented Generation and how it powers smarter AI.',
      date: 'Mar 15, 2026',
      readTime: '5 min read',
    },
    {
      slug: 'choose-right-documents',
      title: 'How to Choose the Right Documents for Your AI',
      excerpt: 'Best practices for preparing and organizing documents for optimal chat results.',
      date: 'Mar 10, 2026',
      readTime: '7 min read',
    },
    {
      slug: 'enterprise-security-privacy',
      title: 'Enterprise Security & Privacy in AI Systems',
      excerpt: 'Understanding data protection, compliance, and security in document-based AI applications.',
      date: 'Mar 5, 2026',
      readTime: '6 min read',
    },
  ]

  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Learn tips, tricks, and best practices from our blog
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link key={i} href={`/blog/${post.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group h-full"
              >
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <span>{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
