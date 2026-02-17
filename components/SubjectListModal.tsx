import React, { useState } from 'react';
import { SubjectData } from '../utils/subjectParser';
import ChevronDownIcon from './icons/ChevronDownIcon';
import CloseIcon from './icons/CloseIcon';

interface AccordionItemProps {
  title: string;
  subjects: string[];
  onSubjectClick: (semester: string) => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, subjects, onSubjectClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h2>
                <button
                    type="button"
                    className="flex justify-between items-center w-full p-4 text-left font-semibold text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                >
                    <span>{title}</span>
                    <ChevronDownIcon className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </h2>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
                 <div className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 bg-white dark:bg-gray-900">
                    {subjects.map(subject => (
                        <button 
                            key={subject} 
                            onClick={() => onSubjectClick(title)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-full text-sm font-mono text-center transition-all duration-200 ease-in-out hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title={`Get summary for ${title}`}
                        >
                            {subject}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};


interface SubjectListModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjectData: SubjectData;
  onSubjectClick: (semester: string) => void;
}

const SubjectListModal: React.FC<SubjectListModalProps> = ({ isOpen, onClose, subjectData, onSubjectClick }) => {
  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-40 flex justify-center items-center backdrop-blur-sm animate-fade-in" 
        style={{animationDuration: '200ms'}}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className="relative bg-gray-50 dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] flex flex-col m-4"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-gray-50 dark:bg-gray-800 z-10">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Semester-wise Subject List</h2>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close subject list"
          >
            <CloseIcon />
          </button>
        </header>
        <main className="overflow-y-auto">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
               {Object.entries(subjectData).map(([semester, subjects]) => (
                    <AccordionItem 
                        key={semester} 
                        title={semester} 
                        subjects={subjects} 
                        onSubjectClick={onSubjectClick}
                    />
                ))}
            </div>
        </main>
      </div>
    </div>
  );
};

export default SubjectListModal;