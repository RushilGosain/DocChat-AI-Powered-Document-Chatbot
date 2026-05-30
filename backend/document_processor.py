"""
Document Processor - Handles document extraction and preprocessing
"""

import os
import hashlib
from typing import Dict, List, Optional, Tuple
from pathlib import Path
import json
from datetime import datetime

from pypdf import PdfReader
from docx import Document as DocxDocument
import openpyxl

class DocumentProcessor:
    def __init__(self, storage_path: str = "documents"):
        """Initialize document processor"""
        self.storage_path = Path(storage_path)
        self.storage_path.mkdir(exist_ok=True)
        
        # Metadata file to track documents
        self.metadata_file = self.storage_path / "metadata.json"
        self.metadata = self._load_metadata()
        
        print(f"[v0] DocumentProcessor initialized with storage path: {storage_path}")
    
    def _load_metadata(self) -> Dict:
        """Load metadata from file"""
        if self.metadata_file.exists():
            with open(self.metadata_file, 'r') as f:
                return json.load(f)
        return {}
    
    def _save_metadata(self):
        """Save metadata to file"""
        with open(self.metadata_file, 'w') as f:
            json.dump(self.metadata, f, indent=2)
    
    def process_document(self, filename: str, content: bytes, file_type: str) -> str:
        """
        Process and extract text from document.
        
        Steps:
        1. Generate unique document ID
        2. Extract text from document (PDF/DOCX/TXT/XLSX)
        3. Save extracted text and original file
        4. Store metadata for tracking
        
        Returns: document_id (use for queries)
        """
        try:
            print(f"[v0] Document processing started: {filename}")
            
            # Generate document ID
            doc_id = self._generate_doc_id(filename)
            print(f"[v0] Generated document ID: {doc_id}")
            
            # Extract text based on file type
            print(f"[v0] Extracting text from {Path(filename).suffix} file...")
            text = self._extract_text(filename, content, file_type)
            
            text_lines = len(text.split('\n'))
            print(f"[v0] Extraction complete: {len(text)} chars, {text_lines} lines")
            
            # Save extracted text
            text_file = self.storage_path / f"{doc_id}.txt"
            with open(text_file, 'w', encoding='utf-8') as f:
                f.write(text)
            print(f"[v0] Saved extracted text: {text_file}")
            
            # Save original file
            original_file = self.storage_path / f"{doc_id}_original{Path(filename).suffix}"
            with open(original_file, 'wb') as f:
                f.write(content)
            print(f"[v0] Saved original file: {original_file}")
            
            # Update metadata
            self.metadata[doc_id] = {
                "original_filename": filename,
                "document_id": doc_id,
                "file_type": file_type,
                "created_at": datetime.now().isoformat(),
                "file_size": len(content),
                "text_length": len(text),
                "status": "processed",
                "lines": text_lines
            }
            self._save_metadata()
            print(f"[v0] Metadata saved")
            
            print(f"[v0] ✓ Document processed successfully!")
            print(f"[v0] ID: {doc_id} | Size: {len(content)} bytes | Text: {len(text)} chars")
            
            return doc_id
        
        except Exception as e:
            print(f"[v0] ERROR processing document {filename}: {e}")
            raise
    
    def _generate_doc_id(self, filename: str) -> str:
        """Generate unique document ID"""
        timestamp = datetime.now().isoformat()
        hash_input = f"{filename}_{timestamp}".encode()
        doc_id = hashlib.md5(hash_input).hexdigest()[:12]
        return doc_id
    
    def _extract_text(self, filename: str, content: bytes, file_type: str) -> str:
        """Extract text from different file formats"""
        
        file_ext = Path(filename).suffix.lower()
        
        try:
            if file_ext == '.pdf' or 'pdf' in file_type:
                return self._extract_from_pdf(content)
            
            elif file_ext in ['.docx', '.doc'] or 'word' in file_type or 'document' in file_type:
                return self._extract_from_docx(content)
            
            elif file_ext == '.txt' or 'text' in file_type:
                return content.decode('utf-8', errors='ignore')
            
            elif file_ext in ['.xlsx', '.xls'] or 'sheet' in file_type or 'excel' in file_type:
                return self._extract_from_excel(content)
            
            else:
                # Try as text by default
                return content.decode('utf-8', errors='ignore')
        
        except Exception as e:
            print(f"[v0] Error extracting text from {filename}: {e}")
            raise
    
    def _extract_from_pdf(self, content: bytes) -> str:
        """Extract text from PDF with proper formatting and spacing cleanup"""
        try:
            from io import BytesIO
            pdf_reader = PdfReader(BytesIO(content))
            
            total_pages = len(pdf_reader.pages)
            print(f"[v0] PDF has {total_pages} pages")
            
            text_parts = []
            extracted_pages = 0
            
            for page_num, page in enumerate(pdf_reader.pages):
                text = page.extract_text()
                if text and text.strip():
                    # Clean up spacing issues in PDF text
                    # Remove spaces between single characters (A I T o o l s -> AI Tools)
                    cleaned_text = self._clean_pdf_text(text)
                    text_parts.append(f"--- Page {page_num + 1} ---\n{cleaned_text.strip()}")
                    extracted_pages += 1
            
            print(f"[v0] Extracted text from {extracted_pages}/{total_pages} pages")
            
            return "\n\n".join(text_parts)
        
        except Exception as e:
            print(f"[v0] Error extracting PDF: {e}")
            raise
    
    def _clean_pdf_text(self, text: str) -> str:
        """
        Clean up PDF text that has been extracted with spacing issues.
        Handles patterns like "A I T o o l s" -> "AI Tools"
        """
        import re
        
        # Pattern: Single letter followed by space, repeated (like "A I T o o l s")
        # Replace with just the letters
        cleaned = re.sub(r'([A-Za-z])\s+(?=[A-Za-z]\s)', r'\1', text)
        
        # Clean up extra spaces
        cleaned = re.sub(r'\s+', ' ', cleaned)
        
        # Clean up line breaks
        cleaned = re.sub(r'\n\s*\n', '\n\n', cleaned)
        
        return cleaned.strip()
    
    def _extract_from_docx(self, content: bytes) -> str:
        """Extract text from DOCX with formatting"""
        try:
            from io import BytesIO
            doc = DocxDocument(BytesIO(content))
            
            text_parts = []
            para_count = 0
            table_count = 0
            
            # Extract paragraphs
            for para in doc.paragraphs:
                if para.text.strip():
                    text_parts.append(para.text.strip())
                    para_count += 1
            
            # Extract tables
            for table_idx, table in enumerate(doc.tables, 1):
                table_count += 1
                text_parts.append(f"\n--- Table {table_idx} ---")
                for row_idx, row in enumerate(table.rows):
                    row_text = " | ".join(cell.text.strip() for cell in row.cells)
                    if row_text.strip():
                        text_parts.append(row_text)
            
            print(f"[v0] DOCX extraction: {para_count} paragraphs, {table_count} tables")
            
            return "\n".join(text_parts)
        
        except Exception as e:
            print(f"[v0] Error extracting DOCX: {e}")
            raise
    
    def _extract_from_excel(self, content: bytes) -> str:
        """Extract text from Excel with sheet information"""
        try:
            from io import BytesIO
            workbook = openpyxl.load_workbook(BytesIO(content))
            
            text_parts = []
            total_sheets = len(workbook.sheetnames)
            print(f"[v0] Excel has {total_sheets} sheets")
            
            for sheet_idx, sheet_name in enumerate(workbook.sheetnames, 1):
                sheet = workbook[sheet_name]
                text_parts.append(f"\n=== Sheet {sheet_idx}: {sheet_name} ===")
                
                row_count = 0
                for row in sheet.iter_rows(values_only=True):
                    row_text = " | ".join(str(cell).strip() if cell else "" for cell in row)
                    if row_text.strip():
                        text_parts.append(row_text)
                        row_count += 1
                
                print(f"[v0] Sheet '{sheet_name}': {row_count} rows extracted")
            
            return "\n".join(text_parts)
        
        except Exception as e:
            print(f"[v0] Error extracting Excel: {e}")
            raise
    
    def get_document_text(self, doc_id: str) -> str:
        """Get extracted text for a document"""
        text_file = self.storage_path / f"{doc_id}.txt"
        if text_file.exists():
            with open(text_file, 'r', encoding='utf-8') as f:
                return f.read()
        raise ValueError(f"Document {doc_id} not found")
    
    def get_documents(self) -> List[Dict]:
        """Get list of all documents"""
        documents = []
        for doc_id, meta in self.metadata.items():
            documents.append({
                "id": doc_id,
                "name": meta.get("original_filename"),
                "status": meta.get("status")
            })
        return documents
    
    def delete_document(self, doc_id: str):
        """Delete a document"""
        try:
            # Remove text file
            text_file = self.storage_path / f"{doc_id}.txt"
            if text_file.exists():
                text_file.unlink()
            
            # Remove original file
            original_files = list(self.storage_path.glob(f"{doc_id}_original.*"))
            for f in original_files:
                f.unlink()
            
            # Remove metadata
            if doc_id in self.metadata:
                del self.metadata[doc_id]
                self._save_metadata()
            
            print(f"[v0] Document deleted: {doc_id}")
        
        except Exception as e:
            print(f"[v0] Error deleting document {doc_id}: {e}")
            raise

# Test the processor
if __name__ == "__main__":
    processor = DocumentProcessor()
    print(processor.metadata)
