'use client'

import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { motion } from 'framer-motion'
import { Calendar, Clock, ArrowLeft, Share2, ThumbsUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { useParams } from 'next/navigation'

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const [liked, setLiked] = useState(false)

  // Blog posts data
  const blogPosts: Record<string, any> = {
    'getting-started-with-rag': {
      title: 'Getting Started with RAG: A Beginner\'s Guide',
      author: 'Sarah Chen',
      date: 'Mar 15, 2026',
      readTime: '5 min read',
      category: 'Technology',
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
    },
    'choose-right-documents': {
      title: 'How to Choose the Right Documents for Your AI',
      author: 'Alex Kumar',
      date: 'Mar 10, 2026',
      readTime: '7 min read',
      category: 'Best Practices',
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
    },
    'enterprise-security-privacy': {
      title: 'Enterprise Security & Privacy in AI Systems',
      author: 'Jordan Smith',
      date: 'Mar 5, 2026',
      readTime: '6 min read',
      category: 'Security',
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
    },
    'advanced-rag-techniques': {
      title: 'Advanced RAG Techniques for Power Users',
      author: 'Emma Rodriguez',
      date: 'Feb 28, 2026',
      readTime: '8 min read',
      category: 'Advanced',
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
    },
    'case-study-enterprise': {
      title: 'Case Study: Enterprise Document Management',
      author: 'Michael Chen',
      date: 'Feb 20, 2026',
      readTime: '10 min read',
      category: 'Case Study',
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
    },
  }

  const post = blogPosts[slug]

  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
            <Button asChild>
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Back Button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            {/* Category Badge */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{post.author.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm">{post.author}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-invert max-w-none"
          >
            <article className="text-foreground leading-relaxed">
              {post.content.split('\n\n').map((paragraph: string, i: number) => {
                if (paragraph.startsWith('##')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace('##', '').trim()}
                    </h2>
                  )
                }
                if (paragraph.startsWith('###')) {
                  return (
                    <h3 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">
                      {paragraph.replace('###', '').trim()}
                    </h3>
                  )
                }
                if (paragraph.startsWith('-') || paragraph.startsWith('1.')) {
                  const items = paragraph.split('\n')
                  return (
                    <ul key={i} className="list-disc list-inside space-y-2 mb-4 text-muted-foreground">
                      {items.map((item, j) => (
                        <li key={j} className="ml-2">{item.replace(/^[-*•1-9.]\s+/, '')}</li>
                      ))}
                    </ul>
                  )
                }
                return (
                  <p key={i} className="mb-4 text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                )
              })}
            </article>
          </motion.div>

          {/* Actions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12 pt-8 border-t border-border flex flex-wrap items-center gap-4"
          >
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                liked 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              {liked ? 'Helpful' : 'Mark as helpful'}
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </motion.div>

          {/* Related Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16 pt-12 border-t border-border"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {['getting-started-with-rag', 'choose-right-documents', 'advanced-rag-techniques', 'enterprise-security-privacy']
                .filter(s => s !== slug)
                .slice(0, 2)
                .map((relatedSlug) => {
                  const relatedPost = blogPosts[relatedSlug]
                  return (
                    <Link key={relatedSlug} href={`/blog/${relatedSlug}`}>
                      <div className="p-4 rounded-lg border border-border hover:border-primary bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group">
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                          Read More
                          <ArrowLeft className="w-3 h-3 rotate-180" />
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </motion.div>
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
              Ready to get started?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Put what you&apos;ve learned into practice with DocChat.
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
              asChild
            >
              <Link href="/chat">Try DocChat Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
