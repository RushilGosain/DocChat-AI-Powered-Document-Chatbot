# DocChat - AI-Powered Document Chatbot

A full-stack Retrieval-Augmented Generation (RAG) chatbot application that allows users to upload documents and ask intelligent questions about their content. Built with Next.js, FastAPI, LangChain, and Hugging Face.

## Features

- 📄 **Multi-Format Support**: Upload PDF, DOCX, TXT, XLSX files
- 🤖 **AI-Powered Responses**: Intelligent answers powered by LangChain and Hugging Face
- 🔍 **Semantic Search**: Fast retrieval using vector embeddings
- 🎨 **Modern UI**: Dark theme with smooth animations
- 🌐 **Responsive Design**: Works on desktop and mobile
- 📊 **Document Management**: Upload, manage, and delete documents easily
- 💬 **Real-time Chat**: Interactive chat interface with source attribution

## Tech Stack

### Frontend
- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS (Dark Theme)
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Type Safety**: TypeScript

### Backend
- **Framework**: FastAPI (Python)
- **AI/ML**: LangChain, Hugging Face
- **Vector Database**: ChromaDB
- **Embeddings**: Sentence Transformers
- **Document Processing**: PyPDF, python-docx, openpyxl
- **Server**: Uvicorn

## Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js application
│   ├── page.tsx                 # Landing page
│   ├── chat/
│   │   └── page.tsx            # Chat interface
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
│
├── components/                   # React components
│   ├── navbar.tsx              # Navigation bar
│   ├── hero-section.tsx        # Hero section
│   ├── features-section.tsx    # Features showcase
│   ├── solutions-section.tsx   # Solutions section
│   ├── testimonies-section.tsx # User testimonials
│   ├── blog-section.tsx        # Blog posts
│   ├── cta-section.tsx         # Call-to-action
│   ├── footer.tsx              # Footer
│   ├── chat-interface.tsx      # Chat window
│   ├── document-upload.tsx     # File upload
│   └── ui/                     # shadcn/ui components
│
├── lib/
│   ├── store.ts                # Zustand state store
│   └── utils.ts                # Utility functions
│
├── backend/                     # FastAPI server
│   ├── main.py                 # FastAPI app
│   ├── document_processor.py  # Document extraction
│   ├── rag_pipeline.py        # RAG implementation
│   ├── .env.example           # Environment template
│   ├── pyproject.toml         # Python dependencies
│   └── .venv/                 # Virtual environment
│
├── public/                      # Static assets
├── package.json                # Frontend dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
├── next.config.mjs            # Next.js config
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Python 3.10+
- A Hugging Face account (free tier available)

### Step 1: Clone or Setup the Project

```bash
# Navigate to project directory
cd /path/to/project
```

### Step 2: Setup Frontend (Next.js)

```bash
# Install frontend dependencies
pnpm install

# Create .env.local file in root (if needed)
touch .env.local

# Start development server
pnpm dev
```

The frontend will be available at `http://localhost:3000`

### Step 3: Setup Backend (FastAPI)

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (if not already created)
# The uv tool already created a .venv directory

# Create .env file from template
cp .env.example .env

# Edit .env and add your Hugging Face API token
nano .env
# OR on Windows
notepad .env
```

### Step 4: Configure Hugging Face API

1. **Get your API token**:
   - Go to [Hugging Face Settings](https://huggingface.co/settings/tokens)
   - Create a new token (read access is sufficient)
   - Copy the token

2. **Add to backend/.env**:
   ```
   HUGGINGFACEHUB_API_TOKEN=hf_your_token_here
   ```

3. **Accept Model License**:
   - Visit [Mistral-7B-Instruct](https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.2)
   - Click "Agree and access repository"
   - This allows the app to use the model via the API

### Step 5: Start the Backend Server

```bash
# From the backend directory
uv run main.py

# OR manually
uv run uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The backend API will be available at `http://localhost:8000`

### Step 6: Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Explore the landing page with features, solutions, testimonies, and blog sections
3. Click "Get Started" or navigate to `/chat` to access the chat interface
4. Upload a document
5. Ask questions about your document!

## API Documentation

### Backend Endpoints

#### 1. Upload Document
```
POST /api/upload-document
Content-Type: multipart/form-data

Response:
{
  "id": "doc_id",
  "name": "filename.pdf",
  "status": "processed"
}
```

#### 2. Chat with Document
```
POST /api/chat
Content-Type: application/json

Request:
{
  "query": "What is the main topic?",
  "document_ids": ["doc_id_1", "doc_id_2"]
}

Response:
{
  "response": "The main topic is...",
  "sources": ["filename.pdf"]
}
```

#### 3. Get Documents
```
GET /api/documents

Response:
[
  {
    "id": "doc_id",
    "name": "filename.pdf",
    "status": "processed"
  }
]
```

#### 4. Delete Document
```
DELETE /api/documents/{document_id}

Response:
{
  "message": "Document deleted successfully",
  "document_id": "doc_id"
}
```

#### 5. Health Check
```
GET /health

Response:
{
  "status": "healthy",
  "rag_pipeline_ready": true
}
```

## Environment Variables

### Frontend (.env.local)
```
# Optional - for API endpoint configuration
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```
# Required
HUGGINGFACEHUB_API_TOKEN=your_token_here

# Optional - defaults provided
FASTAPI_ENV=development
DEBUG=true
HOST=0.0.0.0
PORT=8000
DOCUMENTS_PATH=documents
CHROMA_DB_PATH=chroma_db
```

## Installation Guide for VS Code

### 1. Install Prerequisites

**Windows:**
```powershell
# Install Node.js from https://nodejs.org/ (LTS version)
# Install Python from https://www.python.org/downloads/ (3.10+)
# Install Git from https://git-scm.com/

# Verify installations
node --version
python --version
```

**macOS:**
```bash
# Using Homebrew
brew install node python@3.11
node --version
python3 --version
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs python3 python3-pip
node --version
python3 --version
```

### 2. Open Project in VS Code

```bash
# Open VS Code
code /path/to/v0-project

# Or open VS Code and use File > Open Folder
```

### 3. Install pnpm (if not installed)

```bash
npm install -g pnpm
pnpm --version
```

### 4. Terminal Setup in VS Code

**Windows (PowerShell - Recommended):**
- Press `Ctrl + `` ` to open terminal
- If needed, change to PowerShell: `Terminal > Default Profile > PowerShell`

**macOS/Linux:**
- Press `Ctrl + `` ` to open terminal
- Default should be bash/zsh

### 5. Install Frontend Dependencies

```bash
# In VS Code terminal
pnpm install

# Wait for all dependencies to be installed
```

### 6. Install Backend Dependencies

```bash
# Navigate to backend
cd backend

# Install dependencies using uv
uv sync

# Create .env file
cp .env.example .env
```

### 7. Configure Environment Variables

**Backend Configuration:**
1. Open `backend/.env` in VS Code
2. Get API token from https://huggingface.co/settings/tokens
3. Add your token: `HUGGINGFACEHUB_API_TOKEN=hf_xxxxx`
4. Save the file

### 8. Start Development Servers

**Terminal 1 - Frontend (from project root):**
```bash
pnpm dev
# Output: ▲ Next.js 16.x.x
# Local: http://localhost:3000
```

**Terminal 2 - Backend (from backend directory):**
```bash
cd backend
uv run main.py
# Output: Uvicorn running on http://0.0.0.0:8000
```

### 9. Test the Application

1. Open browser to `http://localhost:3000`
2. Click "Get Started" → navigate to chat
3. Upload a document (PDF, DOCX, TXT, XLSX)
4. Ask a question about the document
5. Get AI-powered response with source attribution

## Troubleshooting

### Issue: "Cannot find module 'xyz'"
**Solution:**
```bash
# Frontend
pnpm install

# Backend
cd backend && uv sync
```

### Issue: "Connection refused" to backend
**Check:**
- Is backend running? (Terminal shows "Uvicorn running on...")
- Is it on port 8000? (default)
- Check firewall isn't blocking port 8000

### Issue: "HUGGINGFACEHUB_API_TOKEN not set"
**Solution:**
1. Get token from https://huggingface.co/settings/tokens
2. Add to `backend/.env`: `HUGGINGFACEHUB_API_TOKEN=hf_xxxxx`
3. Restart backend server

### Issue: "Document upload fails"
**Check:**
- File size under 50MB
- Format is supported (PDF, DOCX, TXT, XLSX)
- Backend is running
- Check browser console for error details

### Issue: "No LLM available" message
**Solution:**
1. Verify Hugging Face token is set correctly
2. Check you've accepted the Mistral model license
3. Ensure internet connection is stable
4. Restart backend server

## Performance Tips

1. **Use smaller documents** initially (< 10 pages)
2. **For faster embeddings**, first query might take 30-60 seconds (model download)
3. **Enable Chrome DevTools** (F12) to see API calls
4. **Clear ChromaDB** if experiencing issues: Delete `chroma_db/` folder and restart

## Development Notes

### Adding New Features

1. **Frontend Components**: Add to `/components`
2. **Chat Functionality**: Modify `/components/chat-interface.tsx`
3. **Backend Routes**: Add to `/backend/main.py`
4. **Document Processing**: Update `/backend/document_processor.py`

### Code Quality

- TypeScript for type safety (frontend)
- Type hints in Python (backend)
- Proper error handling and logging
- Clean component architecture

## Deployment

### Frontend Deployment (Vercel)
```bash
# Push to GitHub first
git push origin main

# Then deploy via Vercel dashboard
# https://vercel.com/new
```

### Backend Deployment Options
- **Heroku**: Easy Python deployment
- **Railway**: Modern cloud platform
- **Render**: Free tier available
- **AWS**: EC2 or App Runner
- **DigitalOcean**: Affordable VPS

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions:
1. Check the Troubleshooting section
2. Review API documentation
3. Open an issue on GitHub
4. Check Hugging Face documentation

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [LangChain Documentation](https://python.langchain.com/)
- [Hugging Face Hub](https://huggingface.co/)
- [ChromaDB Documentation](https://docs.trychroma.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Acknowledgments

- Built with LangChain for RAG capabilities
- Embeddings powered by Hugging Face Transformers
- Vector storage with ChromaDB
- UI components from shadcn/ui
- Animations with Framer Motion

---

**Happy Chatting! 🚀**

For the latest updates and community discussions, visit the GitHub repository.
