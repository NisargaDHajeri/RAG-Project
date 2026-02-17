import React from 'react';
import { GradeDistribution } from '../utils/studentDataParser';

interface GradeDistributionChartProps {
    data: GradeDistribution;
    semester: string;
}

const GradeDistributionChart: React.FC<GradeDistributionChartProps> = ({ data, semester }) => {
    const { fcd, fc, pass, fail, total } = data;
    
    const segments = [
        { label: 'FCD', value: fcd, percentage: (fcd / total * 100), color: 'bg-green-500', darkColor: 'dark:bg-green-500' },
        { label: 'FC', value: fc, percentage: (fc / total * 100), color: 'bg-sky-500', darkColor: 'dark:bg-sky-500' },
        { label: 'Pass', value: pass, percentage: (pass / total * 100), color: 'bg-yellow-500', darkColor: 'dark:bg-yellow-500' },
        { label: 'Fail', value: fail, percentage: (fail / total * 100), color: 'bg-red-500', darkColor: 'dark:bg-red-500' },
    ].filter(s => s.value > 0); // Only show segments with data

    return (
        <div className="bg-white dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                Grade Distribution - {semester}
            </h3>
            
            {/* Progress Bar Chart */}
            <div className="w-full flex h-8 rounded-full overflow-hidden" role="group" aria-label={`Grade distribution for ${semester}`}>
                {segments.map((segment) => (
                    <div
                        key={segment.label}
                        className={`${segment.color} ${segment.darkColor} transition-all duration-500 ease-out`}
                        style={{ width: `${segment.percentage}%` }}
                        title={`${segment.label}: ${segment.value} students (${segment.percentage.toFixed(1)}%)`}
                        role="progressbar"
                        aria-valuenow={segment.percentage}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${segment.label} percentage`}
                    />
                ))}
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2">
                {segments.map(segment => (
                     <div key={segment.label} className="flex items-center text-sm">
                        <span className={`h-3 w-3 rounded-full mr-2 ${segment.color} ${segment.darkColor}`}></span>
                        <span className="text-gray-700 dark:text-gray-300 font-semibold">{segment.label}:</span>
                        <span className="ml-1.5 text-gray-600 dark:text-gray-400">{segment.value} ({segment.percentage.toFixed(1)}%)</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GradeDistributionChart;