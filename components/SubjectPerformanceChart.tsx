import React, { useState, useEffect } from 'react';
import { DetailedSubjectInfo } from '../utils/subjectParser';

const getBarColor = (value: number) => {
    if (value < 75) return 'bg-red-500 dark:bg-red-600';
    if (value < 90) return 'bg-yellow-500 dark:bg-yellow-500';
    return 'bg-green-500 dark:bg-green-500';
};

interface SubjectBarProps {
    subject: DetailedSubjectInfo;
    index: number;
}

const SubjectBar: React.FC<SubjectBarProps> = ({ subject, index }) => {
    const [barWidth, setBarWidth] = useState('0%');
    const { code, section, professor, passPercentage, passed, appeared } = subject;
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setBarWidth(`${passPercentage}%`);
        }, index * 50 + 20); // Staggered animation
        return () => clearTimeout(timer);
    }, [passPercentage, index]);

    const title = `${code} (${section || 'N/A'})\nProfessor: ${professor}\nPass Rate: ${passPercentage.toFixed(2)}% (${passed}/${appeared})`;

    return (
        <div className="group" title={title}>
            <div className="flex items-center justify-between text-sm mb-1">
                <span className="font-mono font-semibold text-gray-700 dark:text-gray-200">{code}{section ? ` (${section.charAt(8)})` : ''}</span>
                <span className="font-semibold text-gray-600 dark:text-gray-300">{passPercentage.toFixed(2)}%</span>
            </div>
            <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                <div 
                    className={`h-full rounded-md transition-all duration-1000 ease-out ${getBarColor(passPercentage)}`}
                    style={{ width: barWidth }}
                    role="progressbar"
                    aria-valuenow={passPercentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                >
                </div>
            </div>
             <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{professor}</p>
        </div>
    );
};


interface SubjectPerformanceChartProps {
    subjects: DetailedSubjectInfo[];
}

const SubjectPerformanceChart: React.FC<SubjectPerformanceChartProps> = ({ subjects }) => {
    
    const sortedSubjects = [...subjects].sort((a,b) => b.passPercentage - a.passPercentage);

    if (subjects.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No subject data available for this semester.</p>
            </div>
        );
    }
    
    return (
        <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Subject Pass Rates
            </h3>
            <div className="space-y-4">
                {sortedSubjects.map((subject, index) => (
                    <SubjectBar key={`${subject.code}-${subject.section}`} subject={subject} index={index} />
                ))}
            </div>
        </div>
    );
};

export default SubjectPerformanceChart;
