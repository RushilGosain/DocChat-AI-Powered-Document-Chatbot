'use client'

import { useState } from 'react'
import { useDocumentStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Upload, FileText, X } from 'lucide-react'
import { motion } from 'framer-motion'
import axios from 'axios'

export default function DocumentUpload() {
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { addDocument, setError, setLoading } = useDocumentStore()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    await uploadFiles(files)
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files) {
      await uploadFiles(files)
    }
  }

  const uploadFiles = async (files: FileList) => {
    setIsUploading(true)
    setLoading(true)
    setError(null)

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        
        // Validate file size (50MB max)
        if (file.size > 50 * 1024 * 1024) {
          throw new Error(`File ${file.name} is too large. Maximum size is 50MB.`)
        }

        // Create FormData
        const formData = new FormData()
        formData.append('file', file)

        try {
          // Upload to backend
          const response = await axios.post(
            'http://localhost:8000/api/upload-document',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              timeout: 30000, // 30 second timeout
            }
          )

          // Add to store
          addDocument({
            id: response.data.id || file.name,
            name: file.name,
            size: file.size,
            uploadedAt: new Date(),
          })
        } catch (uploadError: any) {
          if (uploadError.response?.status === 400) {
            throw new Error(`Invalid file format: ${file.name}. Supported formats: PDF, DOCX, TXT, XLSX`)
          } else if (uploadError.response?.status === 413) {
            throw new Error(`File ${file.name} is too large`)
          } else if (uploadError.code === 'ECONNREFUSED') {
            throw new Error('Cannot connect to server. Make sure the backend is running on http://localhost:8000')
          } else {
            throw new Error(uploadError.response?.data?.detail || `Failed to upload ${file.name}`)
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to upload documents'
      setError(errorMessage)
      console.error('[v0] Upload error:', error)
    } finally {
      setIsUploading(false)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <motion.div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? 'var(--color-primary)' : 'var(--color-border)',
          backgroundColor: isDragging ? 'var(--color-secondary)' : 'transparent',
        }}
        className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer transition-all"
      >
        <input
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt,.xlsx,.xls"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer block">
          <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">
            {isUploading ? 'Uploading...' : 'Drag files here or click to select'}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, DOCX, TXT, XLSX supported (Max 50MB)
          </p>
        </label>
      </motion.div>

      {/* Upload Button */}
      <Button
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isUploading}
        asChild
      >
        <label htmlFor="file-upload" className="cursor-pointer">
          {isUploading ? 'Uploading...' : 'Select Files'}
        </label>
      </Button>

      {/* File Format Info */}
      <div className="p-3 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground">
          Supported formats: PDF, DOCX, DOC, TXT, XLSX, XLS
        </p>
      </div>
    </div>
  )
}
