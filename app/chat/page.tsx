'use client'

import { useState, useEffect } from 'react'
import ChatInterface from '@/components/chat-interface'
import DocumentUpload from '@/components/document-upload'
import Navbar from '@/components/navbar'
import { useDocumentStore } from '@/lib/store'
import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export default function ChatPage() {
  const [activeTab, setActiveTab] = useState<'chat' | 'upload'>('chat')
  const documents = useDocumentStore((state) => state.documents)
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 animate-pulse mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex pt-16">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r border-border bg-secondary/30 flex flex-col">
        <div className="p-4 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">DocChat</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-Powered Document Chat</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'chat'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === 'upload'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Upload
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === 'upload' ? (
            <DocumentUpload />
          ) : (
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-4">Documents</h3>
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No documents yet. Upload one to get started!
                </p>
              ) : (
                <div className="space-y-2">
                  {documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3 rounded-lg bg-secondary border border-border text-sm hover:border-primary transition-colors cursor-pointer"
                    >
                      <p className="font-medium text-foreground truncate">{doc.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(doc.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <ChatInterface />
      </div>
      </div>
    </>
  )
}
