import React, { useState, useEffect } from 'react';

interface SemesterPassRateChartProps {
  data: Record<string, number>;
}

const getBarColor = (value: number) => {
  if (value < 80) return 'bg-yellow-500 dark:bg-yellow-600';
  if (value < 90) return 'bg-sky-500 dark:bg-sky-500';
  return 'bg-green-500 dark:bg-green-500';
};

interface BarProps {
    semester: string;
    value: number;
    index: number;
}

const Bar: React.FC<BarProps> = ({ semester, value, index }) => {
    const [barHeight, setBarHeight] = useState('0%');

    useEffect(() => {
        // Delay to allow component to mount before animating
        const timer = setTimeout(() => {
            setBarHeight(`${value}%`);
        }, index * 80 + 50); // Staggered animation
        return () => clearTimeout(timer);
    }, [value, index]);
    
    return (
        <div className="flex-1 flex flex-col items-center justify-end h-full group">
            <div 
                className="text-xs font-bold text-gray-700 dark:text-gray-200 mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
            >
                {value.toFixed(2)}
            </div>
            <div
                title={`${semester} semester: ${value.toFixed(2)}% pass rate`}
                className={`w-full rounded-t-md transition-all duration-700 ease-out ${getBarColor(value)} group-hover:opacity-80`}
                style={{ height: barHeight }}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${semester} semester pass rate`}
            >
            </div>
            <div className="text-center text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 mt-2 pt-1 border-t-2 border-gray-300 dark:border-gray-600 w-full">
                {semester}
            </div>
        </div>
    );
};


const SemesterPassRateChart: React.FC<SemesterPassRateChartProps> = ({ data }) => {
  const sortedData = Object.entries(data).sort((a, b) => {
    // Sort by semester number (2nd, 3rd, 4th...)
    const numA = parseInt(a[0]);
    const numB = parseInt(b[0]);
    return numA - numB;
  });

  if (sortedData.length === 0) {
    return null; // Don't render anything if there's no data
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Overall Pass Rates by Semester</h3>
      <div className="w-full bg-gray-100 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-end h-64 gap-2 sm:gap-4" aria-label="Bar chart of semester pass rates">
          {sortedData.map(([semester, value], index) => (
            <Bar key={semester} semester={semester} value={value} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SemesterPassRateChart;