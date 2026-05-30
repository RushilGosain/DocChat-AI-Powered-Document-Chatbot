'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Mail, ArrowRight } from 'lucide-react'

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-8 flex justify-center"
        >
          <div className="p-4 rounded-full bg-primary/10 border border-primary/30">
            <Mail className="text-primary" size={40} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">Check Your Email</h1>
          <p className="text-muted-foreground text-lg">
            We&apos;ve sent a confirmation link to your email address. Click the link to verify your account and get started.
          </p>
        </div>

        {/* Info Box */}
        <div className="mb-8 p-4 rounded-lg border border-border bg-secondary/30">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Didn&apos;t receive the email?</span>
            {' '}Check your spam folder or try signing up again.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium" asChild>
              <Link href="/auth/login">
                Back to Sign In
                <ArrowRight size={18} />
              </Link>
            </Button>
          </motion.div>

          <Button variant="outline" className="w-full border-border hover:bg-secondary" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground mt-8">
          Once verified, you&apos;ll be able to sign in and access the full chat experience.
        </p>
      </motion.div>
    </div>
  )
}
