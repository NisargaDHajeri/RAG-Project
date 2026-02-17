export interface Source {
  id: number;
  content: string;
  name?: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  sources?: Source[];
}

export interface SubjectResult {
  subjectCode: string;
  professor: string;
  result: 'Pass' | 'Fail';
}

export interface PerformanceResult {
  studentName: string;
  semester: string;
  section: string;
  results: SubjectResult[];
}
