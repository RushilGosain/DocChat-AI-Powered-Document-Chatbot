'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, FileText, MessageSquare, Zap, Users, BookOpen, Share2 } from 'lucide-react'
import Navbar from '@/components/navbar'
import HeroSection from '@/components/hero-section'
import FeaturesSection from '@/components/features-section'
import SolutionsSection from '@/components/solutions-section'
import TestimoniesSection from '@/components/testimonies-section'
import BlogSection from '@/components/blog-section'
import CTASection from '@/components/cta-section'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <SolutionsSection />
      <TestimoniesSection />
      <BlogSection />
      <CTASection />
      <Footer />
    </main>
  )
}
