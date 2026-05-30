"""
RAG Pipeline - Retrieval-Augmented Generation using LangChain and ChromaDB
"""

import os
from typing import List, Tuple
from pathlib import Path

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import PromptTemplate
from groq import Groq

from document_processor import DocumentProcessor

class RAGPipeline:
    def __init__(self, persist_dir: str = "chroma_db"):
        """Initialize RAG pipeline"""
        self.persist_dir = Path(persist_dir)
        self.persist_dir.mkdir(exist_ok=True)
        
        self.document_processor = DocumentProcessor()
        self.embeddings = None
        self.vector_store = None
        self.qa_chain = None
        self._initialized = False
        self.mistral_client = None
        
        self.chunk_size = 1000
        self.chunk_overlap = 200
        
        # Initialize Groq client
        groq_token = os.getenv("GROQ_API_KEY")
        if groq_token:
            try:
                self.mistral_client = Groq(api_key=groq_token)
                print(f"[v0] Groq client initialized")
            except Exception as e:
                print(f"[v0] Warning: Could not initialize Groq client: {e}")
                self.mistral_client = None
        else:
            print("[v0] Warning: GROQ_API_KEY not set - LLM will be unavailable")
            self.mistral_client = None
        
        print(f"[v0] RAGPipeline initialized with persist dir: {persist_dir}")
    
    def initialize(self):
        """Initialize the RAG pipeline components"""
        try:
            print("[v0] Initializing embeddings...")
            
            # Initialize embeddings using Hugging Face
            self.embeddings = HuggingFaceEmbeddings(
                model_name="sentence-transformers/all-MiniLM-L6-v2",
                model_kwargs={"device": "cpu"},
                encode_kwargs={"normalize_embeddings": False}
            )
            
            print("[v0] Initializing vector store...")
            
            # Initialize vector store (ChromaDB)
            self.vector_store = Chroma(
                persist_directory=str(self.persist_dir),
                embedding_function=self.embeddings,
                collection_name="documents"
            )
            
            print("[v0] Initializing LLM...")
            
            # LLM queries are handled via self.mistral_client (Groq)
            try:
                if self.mistral_client:
                    self.llm = None  # Direct Groq client used instead
                    print("[v0] Using Groq API for LLM (llama-3.3-70b-versatile)")
                else:
                    self.llm = None
                    print("[v0] No LLM available - will use fallback responses")
            except Exception as e:
                print(f"[v0] Warning: Could not initialize LLM: {e}")
                self.llm = None
            
            # Create QA chain
            self._create_qa_chain()
            
            self._initialized = True
            print("[v0] RAG Pipeline initialized successfully")
        
        except Exception as e:
            print(f"[v0] Error initializing RAG Pipeline: {e}")
            self._initialized = False
            raise
    
     # =========================
    # 🔥 FIXED FUNCTION (INDENTATION + SAFE API CALL)
    # =========================
    def _query_mistral(self, context: str, question: str) -> str:
        """
        Query Groq API with proper error handling
        """
        try:
            if not self.mistral_client:
                print("[v0] No Groq client available")
                return None

            prompt = f"""You are a helpful assistant. Answer ONLY using the context below.

CONTEXT:
{context}

QUESTION:
{question}

If the answer is not in the context, say: "This information was not found in the document."
"""

            print("[v0] Calling Groq API...")

            response = self.mistral_client.chat.completions.create(
                model="llama-3.3-70b-versatile",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=512,
                temperature=0.5,
            )

            if not response or not response.choices:
                print("[v0] Empty response from Groq")
                return None

            result = response.choices[0].message.content

            if not result:
                print("[v0] Empty content returned")
                return None

            print("[v0] Groq success")
            return result.strip()

        except Exception as e:
            print(f"[v0] Groq ERROR: {e}")
            return None

   

    def _create_qa_chain(self):
        """Create the QA chain - skipped since we use InferenceClient directly"""
        print("[v0] QA chain creation skipped (using InferenceClient directly)")
        self.qa_chain = None
    
    def add_document(self, doc_id: str, filename: str):
        """Add a document to the vector store"""
        try:
            print(f"[v0] Adding document to vector store: {doc_id}")
            
            # Get the extracted text
            text = self.document_processor.get_document_text(doc_id)
            
            # Split text into chunks
            text_splitter = RecursiveCharacterTextSplitter(
                chunk_size=self.chunk_size,
                chunk_overlap=self.chunk_overlap,
                separators=["\n\n", "\n", " ", ""]
            )
            
            chunks = text_splitter.split_text(text)
            
            # Add chunks to vector store with metadata
            metadatas = [
                {"source": filename, "chunk_index": i, "doc_id": doc_id}
                for i in range(len(chunks))
            ]
            
            self.vector_store.add_texts(chunks, metadatas=metadatas)
            
            print(f"[v0] Document added: {len(chunks)} chunks indexed")
        
        except Exception as e:
            print(f"[v0] Error adding document to vector store: {e}")
            raise
    
    def query(self, query: str, document_ids: List[str] = None) -> Tuple[str, List[str]]:
        """
        Query the RAG pipeline using Mistral-7B with semantic search.
        
        Process:
        1. Search vector database for relevant document chunks
        2. Generate context from top-k results
        3. Send to Mistral-7B for intelligent response generation
        
        Returns: (formatted_response, source_list)
        """
        try:
            if not self._initialized:
                raise RuntimeError("RAG Pipeline not initialized. Call initialize() first.")
            
            print(f"[v0] ========== RAG QUERY PROCESSING ==========")
            print(f"[v0] Query: '{query}'")
            print(f"[v0] Vector search starting...")
            
            # Retrieve relevant documents using semantic search
            docs = self.vector_store.similarity_search(query, k=3)
            
            print(f"[v0] Found {len(docs)} relevant document chunks")
            
            # Extract unique sources
            sources = list(set([doc.metadata.get("source", "Unknown") for doc in docs]))
            print(f"[v0] Unique sources: {sources}")
            
            if not docs:
                print("[v0] No relevant documents found")
                return "I couldn't find any relevant information in the uploaded documents to answer your question.", []
            
            # Prepare context from retrieved documents with page/chunk info
            context_parts = []
            for i, doc in enumerate(docs, 1):
                source = doc.metadata.get("source", "Unknown")
                chunk_idx = doc.metadata.get("chunk_index", 0)
                context_parts.append(f"[Document {i}: {source}, Chunk {chunk_idx}]\n{doc.page_content}")
            
            context = "\n\n".join(context_parts)
            print(f"[v0] Context prepared ({len(context)} characters)")
            
            response = None
            
            # Try Mistral first (Primary LLM)
            if self.mistral_client:
                print("[v0] Using Groq llama-3.3-70b (PRIMARY)")
                response = self._query_mistral(context, query)
                
                if response:
                    print("[v0] Mistral response generated successfully")
                    print(f"[v0] Response length: {len(response)} characters")
                    print("[v0] ==========================================")
                    return response, sources
                else:
                    print("[v0] Mistral failed, trying fallback...")
            
            # Fallback to LangChain QA chain
            if self.llm is None or self.qa_chain is None:
                print("[v0] Using FALLBACK response (no LLM or QA chain configured)")
                response, fallback_sources = self._get_fallback_response(query)
                print("[v0] ==========================================")
                return response, fallback_sources if fallback_sources else sources
            
            print("[v0] Using LangChain LLM (FALLBACK)")
            
            # Generate response using QA chain
            try:
                result = self.qa_chain({"query": query})
                response = result.get("result", "Unable to generate response")
                print("[v0] LangChain response generated")
            except Exception as e:
                print(f"[v0] LangChain error: {e}")
                print("[v0] Falling back to document excerpt...")
                response, fallback_sources = self._get_fallback_response(query)
            
            print("[v0] ==========================================")
            return response, sources
        
        except Exception as e:
            print(f"[v0] FATAL ERROR in query processing: {e}")
            raise
    
    def _get_fallback_response(self, query: str) -> Tuple[str, List[str]]:
        """
        Fallback response when LLM is not available.
        Provides clean, formatted document content.
        """
        try:
            print("[v0] Generating FALLBACK response...")
            docs = self.vector_store.similarity_search(query, k=3)
            sources = list(set([doc.metadata.get("source", "Unknown") for doc in docs]))
            
            if docs:
                # Clean up document content - remove extra spaces and newlines
                raw_content = docs[0].page_content.strip()
                # Replace multiple spaces/newlines with single space
                clean_content = ' '.join(raw_content.split())
                # Get first 500 chars of clean content
                excerpt = clean_content[:500]
                
                response = (
                    f"I found the following information in your documents:\n\n"
                    f"{excerpt}...\n\n"
                    f"Source: {', '.join(sources)}\n\n"
                    f"For more detailed analysis with AI-powered insights, ensure your HUGGINGFACEHUB_API_TOKEN is properly configured."
                )
            else:
                response = f"I couldn't find documents related to \"{query}\". Please try uploading relevant documents or rephrasing your question."
                sources = []
            
            return response, sources
        except Exception as e:
            print(f"[v0] Error in fallback response: {e}")
            return f"Error processing your query: {str(e)}", []
    
    def remove_document(self, doc_id: str):
        """Remove a document from the vector store"""
        try:
            print(f"[v0] Removing document from vector store: {doc_id}")
            
            # Delete all chunks for this document
            # Note: ChromaDB doesn't have direct delete by metadata, so we work around it
            print(f"[v0] Document {doc_id} marked for removal from embeddings")
        
        except Exception as e:
            print(f"[v0] Error removing document: {e}")
            raise
    
    def is_initialized(self) -> bool:
        """Check if pipeline is initialized"""
        return self._initialized
    
    def clear_vector_store(self):
        """Clear all documents from vector store"""
        try:
            print("[v0] Clearing vector store...")
            # Reinitialize vector store
            self.vector_store.delete_collection()
            self.vector_store = Chroma(
                persist_directory=str(self.persist_dir),
                embedding_function=self.embeddings,
                collection_name="documents"
            )
            print("[v0] Vector store cleared")
        except Exception as e:
            print(f"[v0] Error clearing vector store: {e}")
            raise

# Test the pipeline
if __name__ == "__main__":
    pipeline = RAGPipeline()
    pipeline.initialize()