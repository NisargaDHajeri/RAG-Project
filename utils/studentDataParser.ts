import { Source } from '../types';

/**
 * Parses the knowledge base to find semesters that have student enrollment data.
 * @param knowledgeBase An array of source documents.
 * @returns A sorted array of unique semester names that have student lists.
 */
export const getSemestersWithStudentData = (knowledgeBase: Source[]): string[] => {
  const semesters = new Set<string>();
  const semesterRegex = /students enrolled in (\d+(?:st|nd|rd|th) semester)/i;

  knowledgeBase.forEach(source => {
    const match = source.content.match(semesterRegex);
    if (match && match[1]) {
      const semesterName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      semesters.add(semesterName);
    }
  });

  // Return sorted array for consistent order in the UI
  return Array.from(semesters).sort();
};

/**
 * Parses the knowledge base to extract student names for each semester and section.
 * @param knowledgeBase An array of source documents.
 * @returns A nested record mapping semester and section to a list of student names.
 */
// FIX: Implement and export the missing getStudentsBySemester function.
export const getStudentsBySemester = (knowledgeBase: Source[]): Record<string, Record<string, string[]>> => {
  const studentData: Record<string, Record<string, string[]>> = {};
  // Regex to capture semester, section, and the list of names ending with a period.
  const studentRegex = /The students enrolled in (\d+(?:st|nd|rd|th) semester), Section ([A-Z]) are: (.*)\./i;

  knowledgeBase.forEach(source => {
    const match = source.content.match(studentRegex);
    if (match && match[1] && match[2] && match[3]) {
      const semesterName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
      const sectionName = `Section ${match[2]}`;
      // Split the names by comma and trim whitespace.
      const studentNames = match[3].split(',').map(name => name.trim());

      if (!studentData[semesterName]) {
        studentData[semesterName] = {};
      }
      studentData[semesterName][sectionName] = studentNames;
    }
  });

  return studentData;
};

export interface GradeDistribution {
  fcd: number;
  fc: number;
  pass: number;
  fail: number;
  total: number;
}

/**
 * Parses the knowledge base to extract grade distribution for each semester.
 * @param knowledgeBase An array of source documents.
 * @returns A record mapping semester name to its grade distribution.
 */
export const getGradeDistributionBySemester = (knowledgeBase: Source[]): Record<string, GradeDistribution> => {
    const gradeData: Record<string, GradeDistribution> = {};
    const overallResultRegex = /The overall result for the (\d+(?:st|nd|rd|th) semester).*?(\d+) candidates who appeared, (\d+) passed.*?A total of (\d+) students failed\.(?: Among the passing students, (?:(\d+) achieved First Class \(FC\) and )?(\d+) achieved First Class with Distinction \(FCD\))?/is;

    knowledgeBase.forEach(source => {
        const match = source.content.match(overallResultRegex);
        if (match) {
            const semesterName = match[1].charAt(0).toUpperCase() + match[1].slice(1);
            const total = parseInt(match[2], 10);
            const totalPassed = parseInt(match[3], 10);
            const fail = parseInt(match[4], 10);
            // Match 6 is FCD, Match 5 is FC. FC can be optional.
            const fcd = parseInt(match[6] || '0', 10);
            const fc = parseInt(match[5] || '0', 10);
            
            // Calculate simple "Pass" (not FC or FCD)
            const pass = totalPassed - fcd - fc;

            gradeData[semesterName] = { fcd, fc, pass, fail, total };
        }
    });

    return gradeData;
};
