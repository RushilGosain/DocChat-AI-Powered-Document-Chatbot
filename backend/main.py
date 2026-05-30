"""
DocChat - RAG Chatbot using LangChain and Hugging Face
Main FastAPI Application with Proper Response Formatting
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import os
from dotenv import load_dotenv
from datetime import datetime

from document_processor import DocumentProcessor
from rag_pipeline import RAGPipeline

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="DocChat API",
    description="RAG Chatbot using LangChain and Hugging Face with Mistral-7B",
    version="2.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, restrict this to specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize components
document_processor = DocumentProcessor()
rag_pipeline = RAGPipeline()

# ==================== Pydantic Models ====================

class SourceDocument(BaseModel):
    """Source document reference"""
    source: str = Field(..., description="Name of the source document")
    relevance: float = Field(default=0.8, description="Relevance score 0-1")

class ChatRequest(BaseModel):
    """Chat request model"""
    query: str = Field(..., description="User's question or query")
    document_ids: List[str] = Field(default=[], description="Document IDs to query against")

class ChatResponse(BaseModel):
    """Formatted chat response"""
    success: bool = Field(default=True, description="Whether the request was successful")
    response: str = Field(..., description="AI-generated response")
    sources: List[SourceDocument] = Field(default=[], description="Source documents used")
    query: str = Field(..., description="Original query")
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())
    model: str = Field(default="groq/llama-3.3-70b-versatile", description="Model used")

class DocumentInfo(BaseModel):
    """Document information"""
    id: str = Field(..., description="Unique document ID")
    name: str = Field(..., description="Original filename")
    status: str = Field(..., description="Processing status")
    size: Optional[int] = Field(default=None, description="File size in bytes")
    created_at: Optional[str] = Field(default=None, description="Creation timestamp")

class ErrorResponse(BaseModel):
    """Error response model"""
    success: bool = Field(default=False)
    error: str = Field(..., description="Error message")
    details: Optional[str] = Field(default=None, description="Additional error details")
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())

@app.on_event("startup")
async def startup_event():
    """Initialize the RAG pipeline on startup"""
    print("[v0] Initializing RAG Pipeline...")
    try:
        rag_pipeline.initialize()
        print("[v0] RAG Pipeline initialized successfully")
    except Exception as e:
        print(f"[v0] Error initializing RAG Pipeline: {e}")

@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "DocChat API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "rag_pipeline_ready": rag_pipeline.is_initialized()
    }

@app.post("/api/upload-document", response_model=DocumentInfo)
async def upload_document(file: UploadFile = File(...)):
    """
    Upload and process a document for RAG indexing.
    
    Supported formats: PDF, DOCX, TXT, XLSX, DOC
    
    Returns document info including:
    - Document ID (for querying)
    - Original filename
    - Processing status
    - File size
    - Timestamp
    """
    try:
        print(f"[v0] ========== UPLOAD REQUEST ==========")
        print(f"[v0] Filename: {file.filename}")
        print(f"[v0] Content Type: {file.content_type}")
        
        # Read file content
        content = await file.read()
        file_size = len(content)
        
        print(f"[v0] File size: {file_size} bytes")
        
        # Validate file size (100MB max)
        if file_size > 100 * 1024 * 1024:
            raise ValueError("File size exceeds 100MB limit")
        
        # Process document
        print(f"[v0] Extracting text from document...")
        doc_id = document_processor.process_document(
            filename=file.filename,
            content=content,
            file_type=file.content_type
        )
        
        # Add to RAG pipeline
        print(f"[v0] Adding to vector database...")
        rag_pipeline.add_document(doc_id, file.filename)
        
        print(f"[v0] Document processed: {doc_id}")
        print(f"[v0] ====================================")
        
        return DocumentInfo(
            id=doc_id,
            name=file.filename,
            status="processed",
            size=file_size,
            created_at=datetime.now().isoformat()
        )
    
    except ValueError as e:
        print(f"[v0] Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"[v0] Error processing document: {e}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with uploaded documents using RAG with Mistral-7B.
    
    Returns a properly formatted response with:
    - AI-generated answer
    - Source documents
    - Metadata (timestamp, model used)
    """
    try:
        # Validation
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        if not request.document_ids:
            raise HTTPException(status_code=400, detail="No documents selected")
        
        print(f"[v0] ========== CHAT REQUEST ==========")
        print(f"[v0] Query: {request.query}")
        print(f"[v0] Documents: {request.document_ids}")
        
        # Get response from RAG pipeline
        response_text, sources_list = rag_pipeline.query(
            query=request.query,
            document_ids=request.document_ids
        )
        
        # Format sources with relevance scores
        formatted_sources = [
            SourceDocument(source=source, relevance=0.85)
            for source in sources_list
        ]
        
        print(f"[v0] Response generated successfully")
        print(f"[v0] Sources found: {len(formatted_sources)}")
        print(f"[v0] ================================")
        
        # Return formatted response
        return ChatResponse(
            success=True,
            response=response_text.strip(),
            sources=formatted_sources,
            query=request.query,
            model="groq/llama-3.3-70b-versatile"
        )
    
    except HTTPException:
        raise
    except Exception as e:
        print(f"[v0] Error processing query: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Error processing query: {str(e)}"
        )

@app.get("/api/documents", response_model=List[DocumentInfo])
async def get_documents():
    """
    Get list of all uploaded and processed documents.
    
    Returns array of document metadata including:
    - ID (for querying)
    - Name
    - Status
    - Size
    - Creation timestamp
    """
    try:
        print(f"[v0] Retrieving documents list...")
        documents = document_processor.get_documents()
        print(f"[v0] Found {len(documents)} documents")
        return documents
    except Exception as e:
        print(f"[v0] Error retrieving documents: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/documents/{document_id}")
async def delete_document(document_id: str):
    """
    Delete a document and remove it from vector database.
    
    This removes both the original file and embeddings.
    """
    try:
        print(f"[v0] ========== DELETE REQUEST ==========")
        print(f"[v0] Document ID: {document_id}")
        
        # Remove from RAG pipeline
        rag_pipeline.remove_document(document_id)
        
        # Remove from document processor
        document_processor.delete_document(document_id)
        
        print(f"[v0] Document deleted: {document_id}")
        print(f"[v0] ====================================")
        
        return {
            "success": True,
            "message": f"Document {document_id} deleted successfully",
            "document_id": document_id,
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        print(f"[v0] Error deleting document: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/chat-history")
async def get_chat_history():
    """
    Get chat history
    """
    try:
        # This would be implemented based on your storage solution
        return {
            "messages": [],
            "count": 0
        }
    except Exception as e:
        print(f"[v0] Error retrieving chat history: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )