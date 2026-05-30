'use client'

import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Lightbulb, Users } from 'lucide-react'

export default function SolutionsSection() {
  const solutions = [
    {
      icon: Briefcase,
      title: 'Enterprise',
      description: 'Streamline document processing for large organizations with team collaboration features.',
    },
    {
      icon: GraduationCap,
      title: 'Education',
      description: 'Help students and researchers quickly find information from academic papers and textbooks.',
    },
    {
      icon: Lightbulb,
      title: 'Research',
      description: 'Accelerate research by querying multiple documents simultaneously and finding patterns.',
    },
    {
      icon: Users,
      title: 'Content Teams',
      description: 'Enable your content teams to create better materials with instant document insights.',
    },
  ]

  return (
    <section id="solutions" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Solutions for Every Use Case
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re in business, education, or research, DocChat adapts to your needs
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((solution, i) => {
            const Icon = solution.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-lg border border-border bg-gradient-to-br from-secondary/50 to-secondary/20 hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
