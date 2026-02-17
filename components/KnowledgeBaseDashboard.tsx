import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import UserGroupIcon from './icons/UserGroupIcon';
import PerformanceResultDisplay from './PerformanceResultDisplay';
import { PerformanceResult, Source } from '../types';
import { INITIAL_KNOWLEDGE_BASE_DATA } from '../services/ragService';
import { DetailedSubjectInfo, SubjectInfo, getDetailedSubjectPerformance, getOverallPassRates } from '../utils/subjectParser';
import SemesterPassRateChart from './SemesterPassRateChart';
import SearchIcon from './icons/SearchIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UploadIcon from './icons/UploadIcon';
import DownloadIcon from './icons/DownloadIcon';
import ChartPieIcon from './icons/ChartPieIcon';
import { getGradeDistributionBySemester } from '../utils/studentDataParser';
import GradeDistributionChart from './GradeDistributionChart';
import ScaleIcon from './icons/ScaleIcon';
import ChartBarIcon from './icons/ChartBarIcon';
import TrendingUpIcon from './icons/TrendingUpIcon';
import SubjectPerformanceChart from './SubjectPerformanceChart';
import PerformanceHighlightList from './PerformanceHighlightList';

interface KnowledgeBaseDashboardProps {
  stats: {
    total: number;
    initial: number;
    userUploaded: number;
  };
  semesters: string[];
  studentsBySemester: Record<string, Record<string, string[]>>;
  subjectsBySemester: Record<string, SubjectInfo[]>;
  onQuery: (query: string) => void;
}

const StatCard: React.FC<{ title: string; value: number; colorClass: string }> = ({ title, value, colorClass }) => (
  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-1 shadow-sm border border-gray-200 dark:border-gray-700">
    <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
    <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const parsePerformanceReport = (
    fileContent: string, 
    allSubjects: Record<string, SubjectInfo[]>
): PerformanceResult | null => {
    try {
        const lines = fileContent.split('\n').map(l => l.trim()).filter(Boolean);
        const studentName = lines.find(l => l.toLowerCase().startsWith('student name:'))?.split(':')[1]?.trim();
        const semester = lines.find(l => l.toLowerCase().startsWith('semester:'))?.split(':')[1]?.trim();
        const section = lines.find(l => l.toLowerCase().startsWith('section:'))?.split(':')[1]?.trim();

        if (!studentName || !semester || !section) return null;

        const resultsIndex = lines.findIndex(l => l.toLowerCase().startsWith('results:'));
        if (resultsIndex === -1) return null;

        const subjectsForSemester = allSubjects[semester] || [];
        
        const results = lines.slice(resultsIndex + 1).map(line => {
            const parts = line.split('-');
            if (parts.length < 2) return null;
            const code = parts[0].trim();
            const result = parts[1].trim();

            const professor = subjectsForSemester.find(s => s.code.startsWith(code))?.professor || 'N/A';
            
            return {
                subjectCode: code,
                professor: professor,
                result: result.toLowerCase() === 'pass' ? 'Pass' : 'Fail',
            };
        // FIX: Corrected property access from `r.code` to `r.subjectCode` to match the object shape.
        }).filter((r): r is { subjectCode: string; professor: string; result: 'Pass' | 'Fail' } => r !== null && r.subjectCode !== '');
        
        if (results.length === 0) return null; // No valid results found

        return { studentName, semester, section, results };
    } catch (e) {
        console.error("Failed to parse report", e);
        return null;
    }
};


const KnowledgeBaseDashboard: React.FC<KnowledgeBaseDashboardProps> = ({ stats, semesters, studentsBySemester, subjectsBySemester, onQuery }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'subject-analytics' | 'highlights' | 'profload' | 'gradedist' | 'comparative'>('overview');
  
  // State for Student Lookup
  const [lookupSemester, setLookupSemester] = useState<string>('');
  const [lookupSection, setLookupSection] = useState<string>('Section A');

  // State for Performance Analysis
  const [analysisResult, setAnalysisResult] = useState<PerformanceResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State for Subject Analytics
  const [analyticsSemester, setAnalyticsSemester] = useState<string>('');

  // State for Professor Load
  const [profSearch, setProfSearch] = useState('');
  
  // State for Grade Distribution
  const [gradeDistSemester, setGradeDistSemester] = useState<string>('');

  // State for Comparative Analysis
  const [subject1Key, setSubject1Key] = useState('');
  const [subject2Key, setSubject2Key] = useState('');
  const [comparisonResult, setComparisonResult] = useState<[DetailedSubjectInfo, DetailedSubjectInfo] | null>(null);


  const semesterPassRates = useMemo(() => getOverallPassRates(INITIAL_KNOWLEDGE_BASE_DATA), []);
  const gradeDistributionData = useMemo(() => getGradeDistributionBySemester(INITIAL_KNOWLEDGE_BASE_DATA), []);
  const detailedSubjectData = useMemo(() => getDetailedSubjectPerformance(INITIAL_KNOWLEDGE_BASE_DATA), []);
  const gradeDistSemesters = useMemo(() => Object.keys(gradeDistributionData), [gradeDistributionData]);

  const professorData = useMemo(() => {
    const professors: Record<string, { code: string; semester: string }[]> = {};
    Object.entries(subjectsBySemester).forEach(([semester, subjects]) => {
      subjects.forEach(subject => {
        if (subject.professor !== 'N/A') {
          if (!professors[subject.professor]) {
            professors[subject.professor] = [];
          }
          professors[subject.professor].push({ code: subject.code, semester });
        }
      });
    });
    // Sort by professor name
    return Object.entries(professors).sort((a, b) => a[0].localeCompare(b[0]));
  }, [subjectsBySemester]);

  const filteredProfessors = useMemo(() => {
      if (!profSearch.trim()) {
          return professorData;
      }
      return professorData.filter(([profName]) => profName.toLowerCase().includes(profSearch.toLowerCase()));
  }, [professorData, profSearch]);

  useEffect(() => {
    if (semesters.length > 0) {
      if (!lookupSemester) setLookupSemester(semesters[0]);
      if (!analyticsSemester) setAnalyticsSemester(semesters[0]);
    }
    if (gradeDistSemesters.length > 0 && !gradeDistSemester) {
        setGradeDistSemester(gradeDistSemesters[0]);
    }
    if (detailedSubjectData.length > 1) {
        if (!subject1Key) setSubject1Key(`${detailedSubjectData[0].semester}-${detailedSubjectData[0].code}-${detailedSubjectData[0].section || ''}`);
        if (!subject2Key) setSubject2Key(`${detailedSubjectData[1].semester}-${detailedSubjectData[1].code}-${detailedSubjectData[1].section || ''}`);
    }
  }, [semesters, lookupSemester, analyticsSemester, gradeDistSemesters, gradeDistSemester, detailedSubjectData, subject1Key, subject2Key]);
  
  const handleCompare = () => {
    const subject1 = detailedSubjectData.find(s => `${s.semester}-${s.code}-${s.section || ''}` === subject1Key);
    const subject2 = detailedSubjectData.find(s => `${s.semester}-${s.code}-${s.section || ''}` === subject2Key);
    if (subject1 && subject2) {
        setComparisonResult([subject1, subject2]);
    }
  };


  const handleFindStudents = () => {
    if (lookupSemester && lookupSection) {
      onQuery(`List the names of all students in ${lookupSemester}, ${lookupSection}.`);
    }
  };

  const handleFileChange = (file: File | null) => {
    if (!file) return;

    if (file.type !== 'text/plain') {
        setAnalysisError('Invalid file type. Please upload a .txt file.');
        return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target?.result as string;
        setTimeout(() => { // Simulate analysis time
            const result = parsePerformanceReport(content, subjectsBySemester);
            if (result) {
                setAnalysisResult(result);
            } else {
                setAnalysisError('Failed to parse the report. Please ensure it follows the sample format.');
            }
            setIsAnalyzing(false);
        }, 500);
    };
    reader.onerror = () => {
        setAnalysisError('Error reading the file.');
        setIsAnalyzing(false);
    };
    reader.readAsText(file);
  };
  
  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
      handleDragEvents(e);
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
          setIsDragOver(true);
      }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
      handleDragEvents(e);
      setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      handleDragEvents(e);
      setIsDragOver(false);
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
          handleFileChange(e.dataTransfer.files[0]);
          e.dataTransfer.clearData();
      }
  };

  const handleDownloadSample = () => {
    const sampleContent = `Student Name: Aditya Rao
Semester: 2nd Semester
Section: Section A
Results:
21MAT21 - Pass
21PHY22 - Pass
21ELE23 - Fail
21CIV24 - Pass
21EVN25 - Pass
21PHYL26 - Pass
21ELEL27 - Pass
21EGH28 - Fail
21SFH29 - Pass
`;
    const blob = new Blob([sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `report_template.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-gray-100/50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 space-y-4">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
            <button 
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                Overview
            </button>
             <button 
                onClick={() => setActiveTab('highlights')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'highlights' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                <TrendingUpIcon /> Highlights
            </button>
             <button 
                onClick={() => setActiveTab('subject-analytics')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'subject-analytics' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                <ChartBarIcon /> Subject Analytics
            </button>
            <button 
                onClick={() => setActiveTab('analysis')}
                className={`px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'analysis' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                Student Report
            </button>
            <button 
                onClick={() => setActiveTab('profload')}
                className={`px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'profload' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                Professor Load
            </button>
             <button 
                onClick={() => setActiveTab('gradedist')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'gradedist' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                <ChartPieIcon /> Grade Distribution
            </button>
            <button 
                onClick={() => setActiveTab('comparative')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold shrink-0 transition-colors duration-200 focus:outline-none ${activeTab === 'comparative' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'}`}
            >
                <ScaleIcon /> Comparative
            </button>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in" style={{animationDuration: '300ms'}}>
        {activeTab === 'overview' && (
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <StatCard title="Total Sources" value={stats.total} colorClass="text-blue-500 dark:text-blue-400" />
                    <StatCard title="Initial KB" value={stats.initial} colorClass="text-green-500 dark:text-green-400" />
                    <StatCard title="User Uploaded" value={stats.userUploaded} colorClass="text-indigo-500 dark:text-indigo-400" />
                </div>
                <SemesterPassRateChart data={semesterPassRates} />
                 <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Student Lookup</h3>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex-1 w-full">
                            <label htmlFor="semester-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Semester</label>
                            <select id="semester-select" value={lookupSemester} onChange={e => setLookupSemester(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="flex-1 w-full">
                            <label htmlFor="section-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Section</label>
                            <select id="section-select" value={lookupSection} onChange={e => setLookupSection(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                                <option>Section A</option>
                                <option>Section B</option>
                            </select>
                        </div>
                        <button onClick={handleFindStudents} className="w-full sm:w-auto mt-4 sm:mt-0 self-end px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2">
                            <UserGroupIcon />
                            Find Students
                        </button>
                    </div>
                </div>
            </div>
        )}
        {activeTab === 'highlights' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PerformanceHighlightList subjects={detailedSubjectData} type="top" />
                <PerformanceHighlightList subjects={detailedSubjectData} type="bottom" />
            </div>
        )}
        {activeTab === 'analysis' && (
            <div className="space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                    Upload a student's performance report (.txt) to see a detailed breakdown of their results.
                </p>
                <div 
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragEvents}
                    onDrop={handleDrop}
                    className={`group relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${isDragOver ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}`}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
                        accept=".txt"
                    />
                    <div className="flex flex-col items-center justify-center">
                        <UploadIcon />
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Plain Text (.txt) only</p>
                    </div>
                </div>
                <div className="text-center">
                    <button onClick={handleDownloadSample} className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1 mx-auto">
                        <DownloadIcon /> Download Sample Template
                    </button>
                </div>
                 {isAnalyzing && (
                    <div className="text-center p-4">
                        <p className="text-gray-600 dark:text-gray-300">Analyzing report...</p>
                    </div>
                )}
                {analysisError && (
                    <div className="bg-red-100 dark:bg-red-900/50 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 rounded-md" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{analysisError}</p>
                    </div>
                )}
                {analysisResult && <PerformanceResultDisplay data={analysisResult} />}
            </div>
        )}
        {activeTab === 'subject-analytics' && (
            <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 w-full">
                        <label htmlFor="sa-semester-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Semester</label>
                        <select id="sa-semester-select" value={analyticsSemester} onChange={e => setAnalyticsSemester(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            {semesters.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                {analyticsSemester && (
                    <SubjectPerformanceChart 
                        subjects={detailedSubjectData.filter(s => s.semester === analyticsSemester)}
                    />
                )}
            </div>
        )}
        {activeTab === 'profload' && (
            <div className="space-y-4">
                 <div className="relative">
                    <input 
                        type="text"
                        placeholder="Search for a professor..."
                        value={profSearch}
                        onChange={(e) => setProfSearch(e.target.value)}
                        className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon />
                    </div>
                </div>
                <div className="max-h-96 overflow-y-auto pr-2">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredProfessors.map(([prof, subjects]) => (
                            <li key={prof} className="py-3">
                                <div className="flex items-center gap-2">
                                    <BriefcaseIcon />
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100">{prof}</h4>
                                    <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-medium px-2 py-0.5 rounded-full">{subjects.length} Course{subjects.length > 1 ? 's' : ''}</span>
                                </div>
                                <div className="pl-6 mt-1 flex flex-wrap gap-2">
                                    {subjects.map(({code, semester}) => (
                                        <button 
                                            key={`${code}-${semester}`}
                                            onClick={() => onQuery(`What was the pass rate for ${code} in ${semester} taught by ${prof}?`)}
                                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-mono transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
                                            title={`Query pass rate for ${code}`}
                                        >
                                            {code} <span className="text-gray-500 dark:text-gray-400">({semester.replace(' Semester', '')})</span>
                                        </button>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}
        {activeTab === 'gradedist' && (
             <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-3">
                    <div className="flex-1 w-full">
                        <label htmlFor="gd-semester-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Semester</label>
                        <select id="gd-semester-select" value={gradeDistSemester} onChange={e => setGradeDistSemester(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                            {gradeDistSemesters.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                {gradeDistSemester && gradeDistributionData[gradeDistSemester] && (
                    <GradeDistributionChart 
                        data={gradeDistributionData[gradeDistSemester]}
                        semester={gradeDistSemester}
                    />
                )}
             </div>
        )}
        {activeTab === 'comparative' && (
            <div className="space-y-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                    <div>
                        <label htmlFor="subject1-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject 1</label>
                        <select 
                            id="subject1-select" 
                            value={subject1Key} 
                            onChange={e => setSubject1Key(e.target.value)} 
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            {detailedSubjectData.map(s => {
                                const key = `${s.semester}-${s.code}-${s.section || ''}`;
                                return <option key={key} value={key}>{s.code}{s.section ? ` (${s.section.charAt(8)})` : ''} - {s.semester}</option>
                            })}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="subject2-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject 2</label>
                        <select 
                            id="subject2-select" 
                            value={subject2Key} 
                            onChange={e => setSubject2Key(e.target.value)} 
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                            {detailedSubjectData.map(s => {
                                const key = `${s.semester}-${s.code}-${s.section || ''}`;
                                return <option key={key} value={key}>{s.code}{s.section ? ` (${s.section.charAt(8)})` : ''} - {s.semester}</option>
                            })}
                        </select>
                    </div>
                    <div className="md:col-span-2">
                         <button onClick={handleCompare} className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 flex items-center justify-center gap-2">
                            <ScaleIcon />
                            Compare Subjects
                        </button>
                    </div>
                </div>
                {comparisonResult && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {comparisonResult.map((subject, idx) => (
                            <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
                                <h4 className="font-bold text-lg text-gray-800 dark:text-gray-100">{subject.code} {subject.section ? `(${subject.section.charAt(8)})` : ''}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{subject.semester}</p>
                                <ul className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                                    <li><strong>Professor:</strong> {subject.professor}</li>
                                    <li><strong>Passed:</strong> {subject.passed} / {subject.appeared}</li>
                                    <li className="font-semibold"><strong>Pass Rate:</strong> <span className={subject.passPercentage >= 90 ? 'text-green-600 dark:text-green-400' : subject.passPercentage >= 75 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}>{subject.passPercentage.toFixed(2)}%</span></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )}
        </div>
    </div>
  );
};

export default KnowledgeBaseDashboard;