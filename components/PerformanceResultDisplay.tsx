import React from 'react';
import { PerformanceResult } from '../types';

interface PerformanceResultDisplayProps {
  data: PerformanceResult;
}

const PerformanceResultDisplay: React.FC<PerformanceResultDisplayProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-200 dark:border-gray-700 animate-fade-in">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">{data.studentName}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Performance Report - {data.semester}, {data.section}
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Subject Code
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Professor
              </th>
              <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {data.results.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/40">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-700 dark:text-gray-300">
                  {item.subjectCode}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                  {item.professor}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-center">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.result === 'Pass'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
                    }`}
                  >
                    {item.result}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PerformanceResultDisplay;
