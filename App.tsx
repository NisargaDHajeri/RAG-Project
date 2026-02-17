
import React from 'react';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 antialiased">
      <ChatInterface />
    </div>
  );
};

export default App;