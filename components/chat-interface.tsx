'use client'

import { useState, useRef, useEffect } from 'react'
import { useDocumentStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Copy, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

export default function ChatInterface() {
  const [inputValue, setInputValue] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, addMessage, clearMessages, isLoading, documents, error } = useDocumentStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleClearChat = () => {
    clearMessages()
    setShowClearConfirm(false)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!inputValue.trim() || isSending || documents.length === 0) {
      if (documents.length === 0) {
        alert('Please upload a document first')
      }
      return
    }

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user' as const,
      timestamp: new Date().toISOString(),
    }

    addMessage(userMessage)
    setInputValue('')
    setIsSending(true)

    try {
      // Send to backend
      const response = await axios.post(
        'http://localhost:8000/api/chat',
        {
          query: inputValue,
          document_ids: documents.map((d) => d.id),
        },
        {
          timeout: 30000, // 30 second timeout
        }
      )

      // Add assistant response
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: response.data.response || response.data.answer || 'No response generated',
        sender: 'assistant' as const,
        timestamp: new Date().toISOString(),
        sources: response.data.sources || response.data.source_documents || [],
      }

      addMessage(assistantMessage)
    } catch (error: any) {
      console.error('[v0] Chat error:', error)
      
      let errorContent = 'Sorry, there was an error processing your request. Please try again.'
      
      if (error.code === 'ECONNREFUSED') {
        errorContent = 'Cannot connect to the backend server. Make sure it\'s running on http://localhost:8000'
      } else if (error.response?.status === 400) {
        errorContent = error.response.data?.detail || 'Invalid request format'
      } else if (error.response?.status === 404) {
        errorContent = 'Document not found. Please upload documents again.'
      } else if (error.response?.status === 500) {
        errorContent = 'Server error. Please try again later.'
      } else if (error.message?.includes('timeout')) {
        errorContent = 'Request timed out. The server took too long to respond. Please try with a simpler question.'
      }
      
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        sender: 'assistant' as const,
        timestamp: new Date().toISOString(),
      }
      addMessage(errorMessage)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-secondary/30 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground">Document Chat</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {documents.length > 0
                ? `Chatting with ${documents.length} document${documents.length !== 1 ? 's' : ''}`
                : 'No documents uploaded'}
            </p>
          </div>
          {messages.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowClearConfirm(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
              title="Clear all messages"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Clear Chat</span>
            </motion.button>
          )}
        </div>

        {/* Clear Confirmation Dialog */}
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 space-y-3"
          >
            <p className="text-sm text-foreground">
              Are you sure you want to clear all messages? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowClearConfirm(false)}
                className="border-border hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleClearChat}
                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Clear All Messages
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && documents.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Welcome to DocChat</h2>
              <p className="text-muted-foreground max-w-sm">
                Upload documents in the sidebar to get started. Then ask questions about your content!
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">
                Documents ready! Ask a question to get started.
              </p>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary border border-border text-foreground'
                  }`}
                >
                  {message.sender === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none dark:prose-invert">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm">{message.content}</p>
                  )}

                  {/* Message Actions */}
                  {message.sender === 'assistant' && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-secondary/50 rounded transition-colors"
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-secondary/50 rounded transition-colors"
                        title="Helpful"
                      >
                        <ThumbsUp className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-1 hover:bg-secondary/50 rounded transition-colors"
                        title="Not helpful"
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </motion.button>
                    </div>
                  )}

                  {/* Sources */}
                  {message.sources && message.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-border/30">
                      <p className="text-xs font-semibold text-muted-foreground mb-2">
                        Sources:
                      </p>
                      <div className="space-y-1">
                       {message.sources.map((source, i) => (
  <div
    key={i}
    className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
  >
    • {typeof source === 'string'
        ? source
        : `${source.source} (${Math.round((source.relevance || 0) * 100)}%)`}
  </div>
))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-border bg-secondary/30 p-4">
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
            {error}
          </div>
        )}
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={documents.length === 0 ? 'Upload a document first...' : 'Ask a question...'}
            disabled={isSending || documents.length === 0}
            className="bg-input border-border text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            disabled={isSending || !inputValue.trim() || documents.length === 0}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isSending ? 'Sending...' : <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}
