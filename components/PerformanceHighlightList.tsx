import React, { useMemo } from 'react';
import { DetailedSubjectInfo } from '../utils/subjectParser';
import ThumbUpIcon from './icons/ThumbUpIcon';
import ThumbDownIcon from './icons/ThumbDownIcon';

interface PerformanceHighlightListProps {
    subjects: DetailedSubjectInfo[];
    type: 'top' | 'bottom';
}

const PerformanceHighlightList: React.FC<PerformanceHighlightListProps> = ({ subjects, type }) => {
    
    const sortedSubjects = useMemo(() => {
        const sorted = [...subjects].sort((a, b) => {
            return type === 'top' 
                ? b.passPercentage - a.passPercentage 
                : a.passPercentage - b.passPercentage;
        });
        return sorted.slice(0, 5);
    }, [subjects, type]);

    const title = type === 'top' ? 'Top 5 Performing Subjects' : 'Bottom 5 Performing Subjects';
    const Icon = type === 'top' ? ThumbUpIcon : ThumbDownIcon;
    const iconColor = type === 'top' ? 'text-green-500' : 'text-red-500';

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Icon className={iconColor} />
                {title}
            </h3>
            <ul className="space-y-3">
                {sortedSubjects.map((subject) => (
                    <li key={`${subject.code}-${subject.semester}-${subject.section}`} className="p-3 rounded-md bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600/50">
                        <div className="flex items-center justify-between">
                            <p className="font-bold text-gray-800 dark:text-gray-100 font-mono text-sm">
                                {subject.code}
                                <span className="text-xs font-sans text-gray-500 dark:text-gray-400 ml-2">({subject.semester.replace(' Semester', '')})</span>
                            </p>
                            <p className={`font-bold text-sm ${type === 'top' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {subject.passPercentage.toFixed(2)}%
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subject.professor}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PerformanceHighlightList;
