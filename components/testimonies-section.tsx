'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export default function TestimoniesSection() {
  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Research Lead at TechCorp',
      content: 'DocChat has transformed how our team processes research papers. We save hours every week.',
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'Education Specialist',
      content: 'My students love using DocChat to understand complex materials. It&apos;s a game changer for learning.',
      rating: 5,
    },
    {
      name: 'Emma Thompson',
      role: 'Content Director',
      content: 'The accuracy and speed are incredible. Our content team productivity increased by 40%.',
      rating: 5,
    },
    {
      name: 'James Wilson',
      role: 'CEO at InnovateLabs',
      content: 'Enterprise-grade features with user-friendly interface. Exactly what we were looking for.',
      rating: 5,
    },
  ]

  return (
    <section id="testimonies" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Loved by Users Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what people are saying about DocChat
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-6 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {testimonial.content}
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
