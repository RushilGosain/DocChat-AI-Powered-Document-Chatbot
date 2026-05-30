'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="p-4 rounded-full bg-destructive/10 border border-destructive/30">
            <AlertCircle className="text-destructive" size={40} />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-3">Authentication Error</h1>
          <p className="text-muted-foreground">
            Something went wrong during the authentication process. Please try again.
          </p>
        </div>

        {/* Error Details */}
        <div className="mb-8 p-4 rounded-lg border border-destructive/20 bg-destructive/5">
          <p className="text-sm text-muted-foreground">
            If you continue to experience issues, please contact our support team.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium" asChild>
              <Link href="/auth/login">
                <ArrowLeft size={18} />
                Try Again
              </Link>
            </Button>
          </motion.div>

          <Button variant="outline" className="w-full border-border hover:bg-secondary" asChild>
            <Link href="/">
              <Home size={18} />
              Back to Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
