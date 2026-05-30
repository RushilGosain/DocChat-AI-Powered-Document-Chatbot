'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using DocChat, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: '2. Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on DocChat for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:',
      points: [
        'Modifying or copying the materials',
        'Using the materials for any commercial purpose or for any public display',
        'Attempting to decompile or reverse engineer any software contained on DocChat',
        'Removing any copyright or other proprietary notations from the materials',
        'Transferring the materials to another person or "mirroring" the materials on any other server',
      ],
    },
    {
      title: '3. Disclaimer',
      content:
        'The materials on DocChat are provided on an "as is" basis. DocChat makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: '4. Limitations',
      content:
        'In no event shall DocChat or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on DocChat, even if DocChat or an authorized representative has been notified orally or in writing of the possibility of such damage.',
    },
    {
      title: '5. Accuracy of Materials',
      content:
        'The materials appearing on DocChat could include technical, typographical, or photographic errors. DocChat does not warrant that any of the materials on its website are accurate, complete, or current. DocChat may make changes to the materials contained on its website at any time without notice.',
    },
    {
      title: '6. Links',
      content:
        'DocChat has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by DocChat of the site. Use of any such linked website is at the user\'s own risk.',
    },
    {
      title: '7. Modifications',
      content:
        'DocChat may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    },
    {
      title: '8. Governing Law',
      content:
        'These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which DocChat operates, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.',
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation Link */}
      <div className="border-b border-border bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="text-sm text-primary hover:text-primary/80 transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Last Updated: March 2026
          </p>
        </motion.div>

        {/* Quick Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 p-6 rounded-lg border border-border bg-secondary/30"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary" />
            Quick Summary
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms of Service govern your use of DocChat and our services. By accessing and using DocChat, you agree to these Terms. If you don't agree with any part of these Terms, you should not use our service. We encourage you to read these Terms carefully and contact us if you have any questions.
          </p>
        </motion.div>

        {/* Main Terms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 mb-12"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="p-6 rounded-lg border border-border bg-secondary/30"
            >
              <h3 className="text-lg font-semibold text-foreground mb-4">{section.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{section.content}</p>
              {section.points && (
                <ul className="space-y-2 text-muted-foreground">
                  {section.points.map((point, i) => (
                    <li key={i} className="flex gap-3 ml-4">
                      <XCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* User Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Your Responsibilities</h2>
          <div className="space-y-4">
            {[
              'You are responsible for maintaining the confidentiality of your account information and password.',
              'You agree to accept responsibility for all activities that occur under your account.',
              'You agree not to use the service for any illegal or unauthorized purpose.',
              'You agree not to transmit any content that infringes any intellectual property rights.',
              'You agree not to attempt to gain unauthorized access to the service.',
              'You agree to comply with all applicable laws and regulations.',
            ].map((responsibility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                className="flex gap-4 p-4 rounded-lg border border-border/50 bg-secondary/20"
              >
                <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{responsibility}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Limitation of Liability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-12 p-6 rounded-lg border border-border bg-secondary/30"
        >
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-primary" />
            Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            To the fullest extent permitted by applicable law, in no event shall DocChat, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex gap-2">
              <span>•</span>
              <span>Your use or inability to use the service</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Any unauthorized access to or alteration of your transmissions or data</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Any statement or conduct of any third party</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Any other matter relating to the service</span>
            </li>
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="p-6 rounded-lg border border-border bg-secondary/30"
        >
          <h2 className="text-xl font-bold text-foreground mb-4">Questions About These Terms?</h2>
          <p className="text-muted-foreground mb-4">
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <a href="mailto:rushilgosain07@gmail.com" className="text-primary hover:text-primary/80 font-medium transition-colors">
            rushilgosain07@gmail.com
          </a>
        </motion.div>
      </div>
    </main>
  )
}
