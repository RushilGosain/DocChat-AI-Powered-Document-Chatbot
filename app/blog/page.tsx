'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const blogPosts = [
    {
      id: 'getting-started-with-rag',
      slug: 'getting-started-with-rag',
      title: 'Getting Started with RAG: A Beginner\'s Guide',
      excerpt: 'Learn the fundamentals of Retrieval-Augmented Generation and how it powers smarter AI. Discover what RAG is, why it matters, and how DocChat implements it.',
      content: `Retrieval-Augmented Generation (RAG) is revolutionizing how we interact with AI systems. Unlike traditional language models that rely solely on their training data, RAG systems combine the power of large language models with retrieval capabilities to access external knowledge sources.

## What is RAG?

RAG works by retrieving relevant documents or passages from a knowledge base and then using them to augment the prompt given to a language model. This allows the AI to provide answers based on specific, up-to-date information rather than relying on training data that may be outdated or incomplete.

## Why RAG Matters

1. **Accuracy**: By retrieving relevant documents, RAG systems provide more accurate answers grounded in actual data.
2. **Currency**: Your data is always current since the system references live documents.
3. **Transparency**: Users can see which documents the AI used to formulate its response.
4. **Cost-Effective**: You don't need to fine-tune expensive large models.

## How DocChat Uses RAG

DocChat implements a sophisticated RAG pipeline:

1. **Document Processing**: Your documents are processed and split into manageable chunks.
2. **Embedding**: Each chunk is converted to a semantic embedding using Hugging Face models.
3. **Storage**: Embeddings are stored in ChromaDB for fast retrieval.
4. **Retrieval**: When you ask a question, similar documents are retrieved.
5. **Generation**: The retrieved documents are used to generate accurate responses.

## Getting Started

1. Upload your documents (PDF, DOCX, TXT, XLSX)
2. Ask questions in natural language
3. Get answers grounded in your documents
4. See source attribution for transparency

RAG is the future of AI-powered document interaction, and DocChat makes it accessible to everyone.`,
      date: 'Mar 15, 2026',
      author: 'Sarah Chen',
      readTime: '5 min read',
      category: 'Technology',
      featured: true,
    },
    {
      id: 'choose-right-documents',
      slug: 'choose-right-documents',
      title: 'How to Choose the Right Documents for Your AI',
      excerpt: 'Best practices for preparing and organizing documents for optimal chat results. Learn what makes documents work well with AI systems.',
      content: `Preparing your documents correctly is crucial for getting the best results from DocChat. In this guide, we'll explore best practices for document selection and organization.

## Document Quality Matters

The quality of your documents directly impacts the quality of responses you get. Here's what to look for:

### Clear Structure
- Well-organized documents with clear headings
- Logical flow and hierarchy
- Consistent formatting

### Relevant Content
- Focus on documents relevant to your use case
- Remove irrelevant or outdated sections
- Ensure information is accurate and current

## Optimal Document Size

The ideal document size depends on your use case:

- **Small documents (1-10 pages)**: Perfect for specific guides or FAQs
- **Medium documents (10-50 pages)**: Good for comprehensive manuals
- **Large documents (50+ pages)**: Break into sections or topics

## Organization Best Practices

1. **Use consistent naming**: Clear, descriptive filenames help with organization
2. **Group related documents**: Organize by topic or category
3. **Version control**: Keep track of document versions
4. **Regular updates**: Keep documents current and relevant

## Document Types That Work Best

- **Manuals and Guides**: Excellent for technical support
- **FAQ Documents**: Perfect for customer service
- **Reports**: Great for data and insights
- **Contracts**: Useful for legal and compliance
- **Educational Materials**: Ideal for learning platforms

## Common Mistakes to Avoid

1. **Uploading too much irrelevant data**: Quality over quantity
2. **Using outdated documents**: Keep information current
3. **Poor document structure**: Ensure clear organization
4. **Mixing multiple topics**: Keep documents focused

## Optimization Tips

- Add metadata and summaries
- Use tables of contents
- Include clear section breaks
- Use consistent terminology
- Remove unnecessary images or graphics

By following these practices, you'll maximize the effectiveness of DocChat for your use case.`,
      date: 'Mar 10, 2026',
      author: 'Alex Kumar',
      readTime: '7 min read',
      category: 'Best Practices',
    },
    {
      id: 'enterprise-security-privacy',
      slug: 'enterprise-security-privacy',
      title: 'Enterprise Security & Privacy in AI Systems',
      excerpt: 'Understanding data protection, compliance, and security in document-based AI applications. Ensure your AI solution is secure.',
      content: `Security and privacy are paramount in enterprise applications. This guide explores how DocChat ensures your data remains protected.

## Data Protection Principles

### Encryption
- End-to-end encryption for data in transit
- Encrypted storage at rest
- Industry-standard encryption protocols (AES-256)

### Access Control
- Role-based access control (RBAC)
- Multi-factor authentication
- Audit logging for all access

### Data Isolation
- Your data is isolated from other users
- No data sharing between tenants
- Dedicated databases per organization

## Compliance Standards

DocChat adheres to multiple compliance frameworks:

- **GDPR**: General Data Protection Regulation compliance
- **HIPAA**: Healthcare data protection (available)
- **SOC 2**: Security and availability standards
- **ISO 27001**: Information security management

## Privacy Features

1. **Local Processing**: Option to process documents locally
2. **Data Minimization**: We collect only necessary data
3. **Right to Deletion**: Easy data removal compliance
4. **Privacy Controls**: Granular privacy settings

## Security Best Practices for Your Organization

1. **User Management**: Control who has access
2. **Document Classification**: Mark sensitive documents
3. **Regular Audits**: Monitor access logs
4. **Backup Strategy**: Maintain secure backups
5. **Incident Response**: Have a response plan

## Enterprise Deployment

For enterprise customers, DocChat offers:

- On-premise deployment options
- Private cloud infrastructure
- Dedicated support team
- Custom security configurations
- Regular security assessments

## Compliance Checklist

- ✓ Data encryption enabled
- ✓ Access logs monitoring
- ✓ Regular security updates
- ✓ Compliance certifications
- ✓ Privacy policy reviewed
- ✓ User agreement accepted

Your data security is our priority. DocChat is built with enterprise-grade security at its core.`,
      date: 'Mar 5, 2026',
      author: 'Jordan Smith',
      readTime: '6 min read',
      category: 'Security',
    },
    {
      id: 'advanced-rag-techniques',
      slug: 'advanced-rag-techniques',
      title: 'Advanced RAG Techniques for Power Users',
      excerpt: 'Master advanced techniques to extract maximum value from your RAG system. Learn prompt engineering and chunking strategies.',
      content: `Take your RAG usage to the next level with these advanced techniques designed for power users.

## Advanced Prompt Engineering

### Few-Shot Prompting
Use examples in your prompt to guide the model:

"Given the following example, answer similar questions:
Q: What is our return policy?
A: Our return policy allows 30 days for returns..."

### Chain-of-Thought Prompting
Request step-by-step reasoning:

"Let me think through this step by step..."

### Role-Based Prompting
Assign the AI a role for better responses:

"You are a technical support specialist. Answer this question..."

## Optimal Chunking Strategies

### Content-Based Chunking
- Chunk by sections or chapters
- Respect document structure
- Maintain context coherence

### Size-Based Chunking
- Aim for 256-512 token chunks
- Balance context and specificity
- Consider overlap between chunks

### Semantic Chunking
- Group semantically similar content
- Use natural break points
- Maintain thematic coherence

## Advanced Search Techniques

### Filtering
Narrow results to specific document types or dates

### Reranking
Use secondary ranking to improve result quality

### Query Expansion
Automatically expand queries with related terms

## Performance Optimization

1. **Caching**: Cache frequently asked questions
2. **Batch Processing**: Process multiple queries efficiently
3. **Index Optimization**: Regularly maintain your vector index
4. **Feedback Loop**: Use feedback to improve results

## Monitoring and Analytics

- Track query performance
- Monitor response quality
- Analyze user satisfaction
- Identify trending questions

## Integration Examples

### Slack Integration
Connect DocChat to Slack for instant access

### Webhook Integration
Automate workflows based on queries

### Custom APIs
Build custom integrations for your needs

Master these techniques to become a RAG expert!`,
      date: 'Feb 28, 2026',
      author: 'Emma Rodriguez',
      readTime: '8 min read',
      category: 'Advanced',
    },
    {
      id: 'case-study-enterprise',
      slug: 'case-study-enterprise',
      title: 'Case Study: Enterprise Document Management',
      excerpt: 'See how a Fortune 500 company reduced support tickets by 40% using DocChat for employee training.',
      content: `In this case study, we explore how a major enterprise transformed their internal documentation and support processes using DocChat.

## The Challenge

Our client, a global technology company with 50,000+ employees, faced several challenges:

- Employees spent hours searching through documentation
- Onboarding took weeks due to complex procedures
- Support tickets for internal processes were overwhelming
- Knowledge was siloed across different departments

## The Solution

We implemented DocChat to consolidate all internal documentation:

1. **Document Upload**: Uploaded 10,000+ policy documents, guides, and procedures
2. **Organization**: Structured documents by department and topic
3. **Training**: Trained employees on using DocChat
4. **Integration**: Integrated with existing HR and IT systems

## Results

The implementation yielded impressive results:

- **40% reduction** in support tickets
- **3x faster** employee onboarding
- **60% improvement** in knowledge discovery
- **95% user satisfaction** rate

## Timeline

- Month 1: Planning and document preparation
- Month 2-3: Implementation and integration
- Month 4: Training and adoption
- Month 5+: Optimization and expansion

## Key Success Factors

1. **Executive Support**: Strong leadership backing
2. **Change Management**: Clear communication about benefits
3. **Training Program**: Comprehensive employee training
4. **Feedback Loop**: Regular user feedback and improvements
5. **Continuous Optimization**: Ongoing refinement based on usage

## Measurable Impact

- Reduced support costs by $2M annually
- Improved employee productivity by 25%
- Enhanced knowledge accessibility company-wide
- Enabled better decision-making with instant access to information

## Lessons Learned

1. Start with the most-used documents
2. Involve end-users in the process
3. Provide ongoing support and training
4. Continuously monitor and optimize
5. Celebrate wins and share success stories

This case study demonstrates the transformative potential of intelligent document systems in enterprise environments.`,
      date: 'Feb 20, 2026',
      author: 'Michael Chen',
      readTime: '10 min read',
      category: 'Case Study',
    },
  ]

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
              Latest Articles & <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Learn from industry experts on RAG, AI, document management, and best practices.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-lg border-border bg-card"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      {filteredPosts.some(p => p.featured) && (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Featured</span>
            </div>
            {filteredPosts.filter(p => p.featured).map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="cursor-pointer group">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-lg text-muted-foreground mb-6">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                      <span className="text-primary font-medium">{post.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                      Read Article
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredPosts.filter(p => !p.featured).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-all duration-300 cursor-pointer group h-full flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col h-full">
                  {/* Meta */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                    <span className="text-primary font-medium text-xs">{post.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors flex-grow">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all mt-auto">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/10 border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get the latest articles and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                type="email"
                className="flex-1 border-border bg-card"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
