import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Message {
  id: string
  content: string
  sender: 'user' | 'assistant'
  timestamp: string
  sources?: Array<{ source: string; relevance?: number }>
}

export interface Document {
  id: string
  name: string
  size: number
  uploadedAt: string
}

interface DocumentStore {
  documents: Document[]
  messages: Message[]
  isLoading: boolean
  error: string | null
  
  // Document actions
  addDocument: (document: Document) => void
  removeDocument: (id: string) => void
  clearDocuments: () => void
  
  // Message actions
  addMessage: (message: Message) => void
  clearMessages: () => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // Utility
  loadFromStorage: () => void
}

export const useDocumentStore = create<DocumentStore>()(
  persist(
    (set, get) => ({
      documents: [],
      messages: [],
      isLoading: false,
      error: null,

      addDocument: (document) =>
        set((state) => ({
          documents: [...state.documents, document],
        })),

      removeDocument: (id) =>
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id),
        })),

      clearDocuments: () =>
        set({
          documents: [],
        }),

      addMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),

      clearMessages: () =>
        set({
          messages: [],
          error: null,
        }),

      setLoading: (loading) =>
        set({
          isLoading: loading,
        }),

      setError: (error) =>
        set({
          error,
        }),

      loadFromStorage: () => {
        try {
          const stored = localStorage.getItem('document-store')
          if (stored) {
            const parsed = JSON.parse(stored)
            set({
              documents: parsed.state?.documents || [],
              messages: parsed.state?.messages || [],
            })
          }
        } catch (error) {
          console.error('[v0] Error loading from localStorage:', error)
        }
      },
    }),
    {
      name: 'document-store',
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name)
          return item ? JSON.parse(item) : null
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
      partialize: (state) => ({
        documents: state.documents,
        messages: state.messages,
      }),
    }
  )
)
