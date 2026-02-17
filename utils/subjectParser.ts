import { Source } from '../types';

export interface SubjectInfo {
    code: string;
    professor: string;
}

export interface DetailedSubjectInfo extends SubjectInfo {
  totalStudents: number;
  appeared: number;
  failed: number;
  passed: number;
  passPercentage: number;
  section?: string;
  semester: string;
}

export type SubjectDataBySemester = Record<string, SubjectInfo[]>;
// FIX: Export SubjectData type for the modal component
export type SubjectData = Record<string, string[]>;

export const parseSubjectsFromKB = (knowledgeBase: Source[]): SubjectDataBySemester => {
  const subjectData: SubjectDataBySemester = {};
  let currentSemester: string | null = null;

  const semesterRegex = /result analysis is for the (\d+(?:st|nd|rd|th) semester)/i;
  // Regex for semesters 3-8 (with professor)
  const professorSubjectRegex = /For subject\s+([A-Z0-9\/]+)\s+Section\s+([A|B]),\s+taught by\s+((?:Dr\.|Prof\.)\s+[\w\s\.\(\)]+),/i;
  // Regex for 2nd semester (no professor)
  const simpleSubjectRegex = /For subject ([A-Z0-9]+), out of \d+ students/i;


  knowledgeBase.forEach(source => {
    const semesterMatch = source.content.match(semesterRegex);
    if (semesterMatch && semesterMatch[1]) {
      const semesterName = semesterMatch[1].charAt(0).toUpperCase() + semesterMatch[1].slice(1);
      currentSemester = semesterName;
      if (!subjectData[currentSemester]) {
        subjectData[currentSemester] = [];
      }
    }

    // Try matching the format with professor first
    let subjectMatch = source.content.match(professorSubjectRegex);
    if (subjectMatch && subjectMatch[1] && subjectMatch[3] && currentSemester) {
      const subjectCode = subjectMatch[1].replace(/\s/g, '').trim();
      const professor = subjectMatch[3].trim();
      
      subjectData[currentSemester].push({ code: subjectCode, professor });
    } else {
        // Fallback to the simpler format (2nd semester)
        subjectMatch = source.content.match(simpleSubjectRegex);
        if (subjectMatch && subjectMatch[1] && currentSemester) {
            const subjectCode = subjectMatch[1].trim();
            const professor = 'N/A'; // Professor not specified for 2nd sem
            subjectData[currentSemester].push({ code: subjectCode, professor });
        }
    }
  });

  return subjectData;
};

export const getOverallPassRates = (knowledgeBase: Source[]): Record<string, number> => {
  const passRates: Record<string, number> = {};
  const passRateRegex = /The overall result for the (\d+(?:st|nd|rd|th) semester).*?overall pass percentage of ([\d.]+)\%/i;

  knowledgeBase.forEach(source => {
    const match = source.content.match(passRateRegex);
    if (match && match[1] && match[2]) {
      // Shorten semester name for better chart display, e.g., "2nd", "3rd"
      const semesterKey = match[1].replace(' semester', '');
      const rate = parseFloat(match[2]);
      passRates[semesterKey] = rate;
    }
  });

  return passRates;
};

export const getDetailedSubjectPerformance = (knowledgeBase: Source[]): DetailedSubjectInfo[] => {
    const results: DetailedSubjectInfo[] = [];
    let currentSemester: string | null = null;
    
    const semesterRegex = /result analysis is for the (\d+(?:st|nd|rd|th) semester)/i;
    // Regex for 2nd semester (detailed numbers)
    const sem2Regex = /For subject ([A-Z0-9]+), out of (\d+) students, (\d+) appeared, (\d+) failed, and (\d+) passed, with a pass percentage of ([\d.]+)%/;
    // Regex for 3rd-8th semester (standard format)
    const standardRegex = /For subject ([A-Z0-9\/]+) Section ([A-B]), taught by ((?:Dr\.|Prof\.)\s+[\w\s\.\(\)]+), out of (\d+) students, (\d+) passed, with a pass percentage of ([\d.]+)%/;
    // Regex for lab subjects with 100% pass rate
    const labRegex = /For subject ([A-Z0-9\/]+) Section ([A-B]), taught by (.+?), all (\d+) students passed, with a ([\d.]+)% pass rate/;

    knowledgeBase.forEach(source => {
        const semesterMatch = source.content.match(semesterRegex);
        if (semesterMatch) {
            currentSemester = semesterMatch[1].charAt(0).toUpperCase() + semesterMatch[1].slice(1);
        }

        if (!currentSemester) return;

        let match;

        // Try standard format first
        match = source.content.match(standardRegex);
        if (match) {
            const totalStudents = parseInt(match[4], 10);
            const passed = parseInt(match[5], 10);
            results.push({
                semester: currentSemester,
                code: match[1],
                section: `Section ${match[2]}`,
                professor: match[3].trim(),
                totalStudents,
                appeared: totalStudents, // Assumption
                passed,
                failed: totalStudents - passed, // Inferred
                passPercentage: parseFloat(match[6])
            });
            return;
        }

        // Try lab format
        match = source.content.match(labRegex);
        if (match) {
            const totalStudents = parseInt(match[4], 10);
            results.push({
                semester: currentSemester,
                code: match[1],
                section: `Section ${match[2]}`,
                professor: match[3].trim(),
                totalStudents,
                appeared: totalStudents,
                passed: totalStudents,
                failed: 0,
                passPercentage: parseFloat(match[5])
            });
            return;
        }

        // Try 2nd sem format
        match = source.content.match(sem2Regex);
        if (match) {
            results.push({
                semester: currentSemester,
                code: match[1],
                professor: 'N/A',
                totalStudents: parseInt(match[2], 10),
                appeared: parseInt(match[3], 10),
                failed: parseInt(match[4], 10),
                passed: parseInt(match[5], 10),
                passPercentage: parseFloat(match[6])
            });
            return;
        }
    });

    return results;
};
