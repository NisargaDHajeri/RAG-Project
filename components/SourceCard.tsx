import React from 'react';
import { Source } from '../types';

interface SourceCardProps {
  source: Source;
  index: number;
}

const SourceCard: React.FC<SourceCardProps> = ({ source, index }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-3 rounded-lg text-sm transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700/60">
      <div className="flex items-center mb-1.5">
        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-blue-600 text-white text-xs font-bold mr-2 shrink-0">
          {index + 1}
        </span>
        <h4 className="font-semibold text-gray-700 dark:text-gray-200 truncate" title={source.name || 'Source Document'}>
          {source.name || 'Source Document'}
        </h4>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed break-words">{source.content}</p>
    </div>
  );
};

export default SourceCard;