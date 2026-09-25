# 🎓 AI-Powered Academic Knowledge Assistant

An AI-powered academic chatbot for students and teachers that uses
**Retrieval-Augmented Generation (RAG)** to retrieve relevant information
from a predefined academic knowledge base and generate accurate,
context-aware responses.

---

## 📌 Project Overview

Educational institutions contain a large amount of academic information,
including subject notes, syllabi, question papers, student information,
faculty details, timetables, academic calendars, and laboratory manuals.

Finding specific information from these resources manually can be
time-consuming.

This project provides an intelligent **Academic Knowledge Assistant**
that allows students and teachers to interact with the academic knowledge
base using natural-language questions.

The system uses **RAG (Retrieval-Augmented Generation)** to retrieve
relevant information from the knowledge base before generating an answer
using a Large Language Model (LLM).

---

## 🎯 Objectives

- Provide an intelligent academic question-answering system.
- Allow students and teachers to access academic information through
  natural-language queries.
- Retrieve relevant information from academic documents using semantic
  search.
- Reduce the need for manually searching through multiple documents.
- Generate context-aware answers using a local LLM.
- Reduce hallucinations by grounding responses in the retrieved
  academic information.
- Provide source references for retrieved information.

---

## ✨ Key Features

### 👨‍🎓 Student Module

- Ask questions from academic study materials.
- Get explanations of difficult concepts in simple language.
- Generate summaries of academic content.
- Generate important examination questions.
- Generate short and revision notes.
- Generate viva questions.
- Ask syllabus-related questions.
- Retrieve subject information.
- Retrieve faculty information.
- View section-related academic information.
- Access timetable and academic calendar information.

### 👨‍🏫 Teacher Module

- Generate question banks.
- Generate quizzes.
- Generate assignments.
- Generate model question papers.
- Summarize course materials.
- Generate important questions from modules.
- Generate learning outcomes.
- Retrieve section-wise student information.
- Retrieve subject and faculty allocation information.
- Access academic schedules.

---

## 🧠 What is RAG?

**RAG stands for Retrieval-Augmented Generation.**

Instead of asking the Large Language Model to answer a question only
from its pre-trained knowledge, RAG first retrieves relevant information
from a specific knowledge base and provides that information to the LLM.

### RAG Process

```text
User Question
      ↓
Convert Query into Embedding
      ↓
Semantic Search
      ↓
Retrieve Relevant Information
      ↓
ChromaDB
      ↓
Retrieved Context + User Query
      ↓
Llama 3 via Ollama
      ↓
Generated Answer
      ↓
Answer + Source Reference


System Workflow
1. Knowledge Base Preparation

Academic documents are preloaded into the backend.

Examples include:

Subject Notes
Module Notes
Laboratory Manuals
Previous Year Question Papers
Syllabus Documents
Reference Materials
Student Information
Faculty Information
Subject Information
Section Information
Timetable Information
Academic Calendar
Department Information

Users do not upload documents.

2. Document Processing

The documents are loaded and processed using LangChain.

Large documents are divided into smaller chunks so that relevant
information can be efficiently retrieved.

3. Embedding Generation

Each document chunk is converted into a numerical vector using:

sentence-transformers/all-MiniLM-L6-v2

These embeddings represent the semantic meaning of the text.

4. Vector Storage

The generated embeddings are stored in ChromaDB.

ChromaDB acts as the vector database for the project.

5. Query Processing

When a student or teacher asks a question, the question is also converted
into an embedding.

The system compares the query embedding with the stored document
embeddings and retrieves the most relevant information.

6. Context Retrieval

The most relevant document chunks are selected and provided as context
to the Large Language Model.

7. Response Generation

The retrieved context and the user's question are passed to:

Llama 3 → Ollama

Llama 3 generates a natural-language answer based on the retrieved
academic context.

project/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
├── backend/
│   ├── api/
│   ├── rag/
│   ├── embeddings/
│   ├── services/
│   ├── models/
│   └── utils/
│
├── docs/
│   ├── notes/
│   ├── syllabus/
│   ├── question_papers/
│   ├── faculty/
│   ├── students/
│   └── academic_information/
│
├── chroma_db/
│
├── requirements.txt
│
├── package.json
│
└── README.md



# Run and deploy your AI Studio app
This contains everything you need to run your app locally.
View your app in AI Studio: https://ai.studio/apps/drive/12EGhcCrUxxp2gUFJrU6azrubvH5lfFZy

## Run Locally
**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
