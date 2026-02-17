import React, { useState } from 'react';
import { Message } from '../types';
import UserIcon from './icons/UserIcon';
import BotIcon from './icons/BotIcon';
import SourceCard from './SourceCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CopyIcon from './icons/CopyIcon';
import CheckIcon from './icons/CheckIcon';
import TerminalIcon from './icons/TerminalIcon';

interface ChatMessageProps {
  message: Message;
  isDarkMode: boolean;
  isStreaming?: boolean;
}

// Remove node from props, as it's not used and may cause rendering issues with React 19.
interface CodeBlockProps {
    inline?: boolean;
    className?: string;
    // FIX: Make `children` optional as `react-markdown` may pass props without it, causing a type error.
    children?: React.ReactNode;
    isDarkMode: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  inline,
  className,
  children,
  isDarkMode,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'text';
  // FIX: Default `children` to an empty string to avoid rendering "undefined" if it's not provided.
  const code = String(children || '').replace(/\n$/, '');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return !inline ? (
    <div className="relative my-2 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700/50">
       <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800/50 px-3 py-1.5 rounded-t-lg border-b border-gray-200 dark:border-gray-700/50">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
            <TerminalIcon />
            {lang}
        </div>
        <button
          onClick={handleCopy}
          className="p-1.5 bg-gray-200/50 dark:bg-gray-900/50 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isCopied ? 'Copied' : 'Copy code'}
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </button>
      </div>
       <pre 
        className="bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-b-lg p-4 overflow-x-auto font-mono text-sm"
      >
        <code className={`language-${lang}`}>
          {code}
        </code>
      </pre>
    </div>
  ) : (
    <code className="bg-gray-100 dark:bg-gray-800 text-rose-600 dark:text-rose-400 border border-gray-200 dark:border-gray-600 rounded-md px-1.5 py-0.5 font-mono text-sm">
      {children}
    </code>
  );
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isDarkMode, isStreaming }) => {
  const isUser = message.sender === 'user';
  const [isMessageCopied, setIsMessageCopied] = useState(false);

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message.text);
    setIsMessageCopied(true);
    setTimeout(() => setIsMessageCopied(false), 2000);
  };

  return (
    <div className={`flex items-start gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && <BotIcon />}
      <div className={`group relative flex flex-col max-w-2xl w-full ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && message.text && (
            <button
                onClick={handleCopyMessage}
                title={isMessageCopied ? 'Copied!' : 'Copy message'}
                aria-label={isMessageCopied ? 'Copied to clipboard' : 'Copy message'}
                className="absolute top-1 right-1 z-10 p-1.5 bg-white/70 dark:bg-gray-950/70 backdrop-blur-sm rounded-full text-gray-600 dark:text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {isMessageCopied ? <CheckIcon /> : <CopyIcon />}
            </button>
        )}
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-blue-600 dark:bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
          }`}
        >
          {isUser ? (
            <p className="text-white whitespace-pre-wrap">{message.text}</p>
          ) : (
             <div className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-headings:my-3">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  // By removing the verbose, explicit overrides for default elements (p, ul, strong, etc.),
                  // we rely on react-markdown's default renderers. These are compliant with React's stricter
                  // prop handling and won't pass invalid internal props (like 'node', 'index') to the DOM, fixing the crash.
                  // We only keep the overrides for `pre` and `code` because they have custom logic.
                  pre: ({ children }) => <>{children}</>,
                  // FIX: Corrected the props type for the custom `code` component. The `react-markdown` library
                  // expects a component props type that does not have an index signature (`[x: string]: unknown`).
                  // The previous type caused a mismatch. Removing the index signature and the unused `...rest`
                  // resolves the TypeScript error.
                  code: ({ node, inline, className, children }: {node?: unknown, inline?: boolean, className?: string, children?: React.ReactNode}) => (
                    <CodeBlock 
                        inline={inline} 
                        className={className}
                        isDarkMode={isDarkMode}
                    >
                      {children}
                    </CodeBlock>
                  ),
                }}
              >
                {message.text}
              </ReactMarkdown>
              {isStreaming && <span className="inline-block w-0.5 h-4 bg-current translate-y-0.5 ml-1 animate-blink" />}
             </div>
          )}
        </div>
        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-3 w-full">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Sources:</h3>
            <div className="space-y-2">
              {message.sources.map((source, index) => (
                <SourceCard key={source.id} source={source} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
      {isUser && <UserIcon />}
    </div>
  );
};

export default ChatMessage;