<img width="846" height="457" alt="Screenshot 2026-05-30 at 2 21 28 PM" src="https://github.com/user-attachments/assets/87553452-f527-49f5-92d8-25e52b8fabd4" /><img width="846" height="457" alt="Screenshot 2026-05-30 at 2 21 28 PM" src="https://github.com/user-attachments/assets/5f5610ce-8e80-4e64-a1d7-101e0d3bb843" /># 📄 DocChat – AI-Powered Document Chatbot

An intelligent Retrieval-Augmented Generation (RAG) application that enables users to upload documents and interact with them through natural language conversations. Built with Next.js, FastAPI, LangChain, Hugging Face, and ChromaDB, DocChat delivers accurate, context-aware responses by combining semantic search with modern AI technologies.

---

## ✨ Features

* 📄 **Multi-Format Document Support** – Upload and analyze PDF, DOCX, TXT, and XLSX files.
* 🤖 **AI-Powered Question Answering** – Get accurate responses generated using Retrieval-Augmented Generation (RAG).
* 🔍 **Semantic Search** – Retrieve relevant document content using vector embeddings.
* 📚 **Source Attribution** – Responses include document references for transparency.
* ⚡ **Fast Processing Pipeline** – Efficient document ingestion and retrieval with ChromaDB.
* 🎨 **Modern User Interface** – Clean and responsive design built with Next.js and Tailwind CSS.
* 📱 **Cross-Platform Experience** – Optimized for desktop, tablet, and mobile devices.
* 🔒 **Scalable Backend Architecture** – FastAPI-powered backend for document processing and AI interactions.

---

## 🛠️ Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios
* Zustand
* Framer Motion

### Backend

* FastAPI
* Python
* LangChain
* Hugging Face
* ChromaDB
* Sentence Transformers

### AI & Data Processing

* Retrieval-Augmented Generation (RAG)
* Vector Embeddings
* Semantic Search
* Document Parsing

---

## 📸 Screenshots

| Section         | Preview        |
| --------------- | -------------- |
| Landing Page    | <img width="846" height="457" alt="Screenshot 2026-05-30 at 2 20 58 PM" src="https://github.com/user-attachments/assets/196bd8ac-1f82-4f91-bc98-7597dd30e2cd" /> |
| Chat Interface  | <img width="846" height="457" alt="Screenshot 2026-05-30 at 2 21 10 PM" src="https://github.com/user-attachments/assets/42b75224-62c1-4c2c-9b02-a67be1a57d42" /> |
| Features Overview | <img width="846" height="457" alt="Screenshot 2026-05-30 at 2 21 28 PM" src="https://github.com/user-attachments/assets/6f3306e5-316d-4e2d-9570-283f583fe3ce" /> |
| Solution Overview     | <img width="846" height="445" alt="Screenshot 2026-05-30 at 2 21 46 PM" src="https://github.com/user-attachments/assets/3742101a-54e8-435e-acb4-4ff47373c0a1" /> |
| Articles & Insights   | <img width="846" height="445" alt="Screenshot 2026-05-30 at 2 21 57 PM" src="https://github.com/user-attachments/assets/7001855c-da44-4a8b-b16a-4797528073d1" /> |


---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/docchat.git
cd docchat
```

### 2. Install Frontend Dependencies

```bash
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Create a `.env` file inside the backend folder:

```env
HUGGINGFACEHUB_API_TOKEN=your_huggingface_token
```

### 4. Start the Frontend

```bash
pnpm dev
```

### 5. Start the Backend

```bash
cd backend
uv sync
uv run main.py
```

---

## 📂 Project Structure

```text
docchat/
│
├── app/
├── components/
├── lib/
├── public/
│
├── backend/
│   ├── main.py
│   ├── document_processor.py
│   ├── rag_pipeline.py
│   └── .env
│
├── package.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

---

## 💡 How It Works

1. User uploads a document.
2. The backend extracts and processes document content.
3. Text is converted into vector embeddings using Hugging Face models.
4. Embeddings are stored in ChromaDB.
5. User asks a question.
6. Relevant document chunks are retrieved through semantic search.
7. LangChain generates a context-aware response using the retrieved information.
8. The answer is displayed with source attribution.

---

## 🎯 Key Highlights

* Implemented a complete Retrieval-Augmented Generation (RAG) pipeline.
* Integrated Hugging Face embeddings for semantic document retrieval.
* Built scalable APIs using FastAPI.
* Developed a responsive frontend with Next.js and TypeScript.
* Enabled intelligent document-based conversations with source references.

---

## 🔮 Future Enhancements

* Multi-document chat support
* User authentication and document history
* PDF highlighting for referenced sources
* Streaming AI responses
* Cloud storage integration
* Team collaboration features

---

## 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to GitHub
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Rushil Gosain**

Passionate Software Developer focused on Full-Stack Development, AI Applications, and Building Scalable Web Solutions.

📧 Email: [rushilgosain10@gmail.com]

🔗 LinkedIn: [https://www.linkedin.com/in/rushil-gosain-434b57285/]

💻 GitHub: [https://github.com/RushilGosain]

---

⭐ If you found this project useful, consider giving it a star on GitHub!
