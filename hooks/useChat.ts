

import { useState, useCallback, useEffect } from 'react';
import { Message, Source } from '../types';
import { getRagService } from '../services/ragService';

const CHAT_HISTORY_KEY = 'rag_chat_history';

const initialMessage: Message = {
  id: 'bot-initial',
  sender: 'bot',
  text: `Hello! I'm a specialized RAG assistant.

My knowledge base contains the academic results for the 2021-22 year from the CSE department at Bapuji Institute of Engineering & Technology.

You can also upload your own documents (.txt, .pdf) to ask questions about them.

How can I help you?`,
  sources: [],
};

const getInitialMessages = (): Message[] => {
  try {
    const storedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
    if (storedHistory) {
      const parsedHistory = JSON.parse(storedHistory);
      if (Array.isArray(parsedHistory) && parsedHistory.length > 0) {
        // CRITICAL FIX: Filter out any invalid/corrupted entries from localStorage
        // to prevent rendering crashes from malformed message objects (e.g., nulls).
        const validMessages = parsedHistory.filter(
          (msg): msg is Message =>
            msg &&
            typeof msg === 'object' &&
            typeof msg.id === 'string' &&
            typeof msg.text === 'string' &&
            typeof msg.sender === 'string' &&
            (msg.sender === 'user' || msg.sender === 'bot')
        );
        if (validMessages.length > 0) {
          return validMessages;
        }
      }
    }
  } catch (error) {
    console.error('Failed to parse chat history from localStorage. Clearing corrupted data.', error);
    // Clear corrupted data to prevent future load failures.
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (removeError) {
      console.error('Failed to remove corrupted chat history from localStorage.', removeError);
    }
  }
  return [initialMessage];
};


const parsePdf = async (file: File): Promise<string> => {
    // CRITICAL FIX: Lazily import pdfjs-dist only when a PDF is being processed.
    // This prevents the large library from blocking the initial application load.
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs';

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
    let textContent = '';
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        textContent += text.items.map(item => 'str' in item ? item.str : '').join(' ');
        textContent += '\n'; // Page separator
    }
    return textContent;
};


export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>(getInitialMessages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Failed to save chat history to localStorage", error);
    }
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text,
      sender: 'user',
    };

    const botMessageId = `bot-${Date.now()}`;
    const botMessageShell: Message = {
        id: botMessageId,
        text: '',
        sender: 'bot',
        sources: [],
    };
    
    setMessages(prev => [...prev, userMessage, botMessageShell]);
    setIsLoading(true);

    try {
      const ragService = getRagService(); // Lazily get service instance
      const handleStream = (chunk: string) => {
        setMessages(prev =>
          prev.map(m =>
            m.id === botMessageId ? { ...m, text: m.text + chunk } : m
          )
        );
      };
      
      const { sources } = await ragService.query(text, handleStream);
      
      setMessages(prev =>
        prev.map(m =>
          m.id === botMessageId ? { ...m, sources: sources } : m
        )
      );

    } catch (error) {
      console.error("Failed to get response:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        text: 'Sorry, something went wrong. Please try again.',
        sender: 'bot',
      };
      // Replace the empty bot message with an error message
      setMessages(prev => prev.filter(m => m.id !== botMessageId).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addKnowledgeSource = useCallback(async (file: File) => {
    if (!file) return;
    setIsLoading(true);
    const botTypingMessage: Message = {
      id: `bot-typing-${Date.now()}`,
      sender: 'bot',
      text: `Processing "${file.name}"...`,
    };
    setMessages(prev => [...prev, botTypingMessage]);

    try {
      let content = '';
      if (file.type === 'application/pdf') {
          content = await parsePdf(file);
      } else {
          content = await file.text();
      }

      if (!content.trim()) {
        throw new Error("File is empty or could not be read.");
      }
      
      const ragService = getRagService(); // Lazily get service instance
      const newSources = await ragService.addDocument(content, file.name);

      if (newSources.length === 0) {
        throw new Error("Document is empty or could not be processed into chunks.");
      }

      const botMessage: Message = {
        id: `bot-knowledge-${Date.now()}`,
        text: `I have successfully added the document "${file.name}" (split into ${newSources.length} parts) to my knowledge base. You can now ask questions about its content.`,
        sender: 'bot',
        sources: [],
      };
      setMessages(prev => prev.filter(m => m.id !== botTypingMessage.id).concat(botMessage));

    } catch (error) {
      console.error("Failed to add source:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        // FIX: Provide a more informative error message to the user by including the actual error.
        text: `Sorry, I couldn't process the file "${file.name}". ${error instanceof Error ? error.message : 'An unknown error occurred.'}`,
        sender: 'bot',
      };
      setMessages(prev => prev.filter(m => m.id !== botTypingMessage.id).concat(errorMessage));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    setMessages([initialMessage]);
    try {
      localStorage.removeItem(CHAT_HISTORY_KEY);
    } catch (error) {
      console.error("Failed to clear chat history from localStorage", error);
    }
  }, []);

  return { messages, isLoading, sendMessage, addKnowledgeSource, clearChat };
};