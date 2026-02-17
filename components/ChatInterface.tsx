import React, { useRef, useEffect, useState, useMemo } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { useChat } from '../hooks/useChat';
import { getRagService, INITIAL_KNOWLEDGE_BASE_DATA } from '../services/ragService';
import KnowledgeBaseDashboard from './KnowledgeBaseDashboard';
import NewChatIcon from './icons/NewChatIcon';
import ExportIcon from './icons/ExportIcon';
import InfoIcon from './icons/InfoIcon';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import PromptSuggestions from './PromptSuggestions';
import MenuIcon from './icons/MenuIcon';
import BotIcon from './icons/BotIcon';
import SubjectListModal from './SubjectListModal';
import ListIcon from './icons/ListIcon';
import { parseSubjectsFromKB } from '../utils/subjectParser';
import { getSemestersWithStudentData, getStudentsBySemester } from '../utils/studentDataParser';

const SUGGESTIONS = [
    "What subjects did Prof. ABDUL RAZAK M.S teach?",
    "Compare pass rates for 18CS61 in sections A and B.",
    "Which semester had the highest overall pass percentage?",
    "Show me the javascript function for pass percentage.",
];

const ChatInterface: React.FC = () => {
  const { messages, isLoading, sendMessage, addKnowledgeSource, clearChat } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [kbStats, setKbStats] = useState(() => {
    const initialCount = INITIAL_KNOWLEDGE_BASE_DATA.length;
    return {
      total: initialCount,
      initial: initialCount,
      userUploaded: 0
    };
  });

  const detailedSubjectData = useMemo(() => parseSubjectsFromKB(INITIAL_KNOWLEDGE_BASE_DATA), []);

  const simpleSubjectData = useMemo(() => {
    const simpleData: Record<string, string[]> = {};
    for (const semester in detailedSubjectData) {
      // Get unique subject codes for the modal
      // FIX: Use Array.from with an explicit generic type to ensure `uniqueCodes` is `string[]`.
      // This resolves an issue where type inference from the spread syntax was failing and resulting
      // in an `unknown[]` type, causing a downstream assignment error.
      const uniqueCodes = Array.from<string>(new Set(detailedSubjectData[semester].map(subject => subject.code)));
      simpleData[semester] = uniqueCodes;
    }
    return simpleData;
  }, [detailedSubjectData]);

  const studentSemesters = useMemo(() => getSemestersWithStudentData(INITIAL_KNOWLEDGE_BASE_DATA), []);
  const studentsBySemester = useMemo(() => getStudentsBySemester(INITIAL_KNOWLEDGE_BASE_DATA), []);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsMenuOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      setKbStats(getRagService().getKnowledgeBaseStats());
    }
  }, [isLoading]);

  const handleExportChat = () => {
    const formattedChat = messages.map(msg => {
      const prefix = msg.sender === 'user' ? 'You' : 'Bot';
      let content = `[${prefix}]: ${msg.text}`;
      if (msg.sender === 'bot' && msg.sources && msg.sources.length > 0) {
        content += '\n\nSources:\n';
        content += msg.sources.map((s, i) => `${i + 1}. ${s.name || 'Document Snippet'}\n   "${s.content}"`).join('\n');
      }
      return content;
    }).join('\n\n========================================\n\n');

    const blob = new Blob([formattedChat], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chat-history-${new Date().toISOString()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSubjectClick = (semester: string) => {
    const query = `Give me a detailed summary of the ${semester}.`;
    sendMessage(query);
    setIsSubjectModalOpen(false);
  };

  const handleDashboardQuery = (query: string) => {
    sendMessage(query);
    setIsDashboardOpen(false);
  };

  const DropdownMenuItem: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; }> = ({ icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
    >
        {icon}
        <span>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm sticky top-0 z-20 shrink-0">
        <div className="flex items-center gap-2">
            <BotIcon />
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">RAG Assistant</h1>
        </div>
        <div className="flex items-center gap-1 sm:gap-2">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Open menu"
                    aria-haspopup="true"
                    aria-expanded={isMenuOpen}
                >
                    <MenuIcon />
                </button>
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-30 animate-fade-in" style={{animationDuration: '150ms'}}>
                        <div className="py-1">
                            <DropdownMenuItem icon={<NewChatIcon />} label="New Chat" onClick={() => { clearChat(); setIsMenuOpen(false); }} />
                            <DropdownMenuItem icon={<InfoIcon />} label="Knowledge Base" onClick={() => { setIsDashboardOpen(prev => !prev); setIsMenuOpen(false); }} />
                            <DropdownMenuItem icon={<ListIcon />} label="View Subject List" onClick={() => { setIsSubjectModalOpen(true); setIsMenuOpen(false); }} />
                            <DropdownMenuItem icon={<ExportIcon />} label="Export Chat" onClick={() => { handleExportChat(); setIsMenuOpen(false); }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {isDashboardOpen && (
            <KnowledgeBaseDashboard 
                stats={kbStats} 
                semesters={studentSemesters}
                studentsBySemester={studentsBySemester}
                subjectsBySemester={detailedSubjectData}
                onQuery={handleDashboardQuery}
            />
          )}

          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isDarkMode={isDarkMode}
              isStreaming={isLoading && index === messages.length -1}
            />
          ))}

          {messages.length === 1 && !isLoading && (
            <PromptSuggestions suggestions={SUGGESTIONS} onSuggestionClick={sendMessage} />
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Footer / Input */}
      <footer className="p-4 md:p-6 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm sticky bottom-0 z-10 shrink-0">
        <div className="max-w-4xl mx-auto">
          <ChatInput onSendMessage={sendMessage} onFileSelect={addKnowledgeSource} isLoading={isLoading} />
        </div>
      </footer>

      {/* Modals */}
      <SubjectListModal 
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        subjectData={simpleSubjectData}
        onSubjectClick={handleSubjectClick}
      />
    </div>
  );
};

export default ChatInterface;