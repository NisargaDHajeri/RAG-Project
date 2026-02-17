import { GoogleGenAI } from "@google/genai";
import { Source } from '../types';

// ===================================================================================
// --- INITIAL KNOWLEDGE BASE ---
// ===================================================================================
export const INITIAL_KNOWLEDGE_BASE_DATA: Source[] = [
  // --- 2nd Semester Data ---
  { id: 1, content: "The result analysis is for the 2nd semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 2, content: "For subject 21MAT21, out of 188 students, 186 appeared, 29 failed, and 157 passed, with a pass percentage of 84.40%." },
  { id: 3, content: "For subject 21PHY22, out of 188 students, 185 appeared, 10 failed, and 175 passed, with a pass percentage of 94.59%." },
  { id: 4, content: "For subject 21ELE23, out of 188 students, 186 appeared, 16 failed, and 170 passed, with a pass percentage of 91.39%." },
  { id: 5, content: "For subject 21CIV24, out of 188 students, 186 appeared, 18 failed, and 168 passed, with a pass percentage of 90.32%." },
  { id: 6, content: "For subject 21EVN25, out of 188 students, 186 appeared, 0 failed, and 186 passed, with a pass percentage of 100%." },
  { id: 7, content: "For subject 21PHYL26, out of 188 students, 186 appeared, 1 failed, and 185 passed, with a pass percentage of 99.46%." },
  { id: 8, content: "For subject 21ELEL27, out of 188 students, 186 appeared, 1 failed, and 185 passed, with a pass percentage of 99.46%." },
  { id: 9, content: "For subject 21EGH28, out of 188 students, 186 appeared, 1 failed, and 185 passed, with a pass percentage of 99.46%." },
  { id: 10, content: "For subject 21SFH29, out of 188 students, 186 appeared, 0 failed, and 186 passed, with a pass percentage of 100%." },
  { id: 11, content: "The overall result for the 2nd semester of the CS&E branch for the academic year 2021-22 shows that out of 185 candidates who appeared, 143 passed, for an overall pass percentage of 77.29%. A total of 42 students failed." },

  // --- 3rd Semester Data ---
  { id: 12, content: "The result analysis is for the 3rd semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 13, content: "For subject 18MAT31 Section A, taught by Prof. K N ANIL KUMAR, out of 69 students, 56 passed, with a pass percentage of 81.15%." },
  { id: 14, content: "For subject 18MAT31 Section B, taught by Dr. VIKAS K, out of 68 students, 65 passed, with a pass percentage of 95.58%." },
  { id: 15, content: "For subject 18CS32 Section A, taught by Dr. NAVEENKUMAR K.R, out of 69 students, 67 passed, with a pass percentage of 97.10%." },
  { id: 16, content: "For subject 18CS32 Section B, taught by Prof. NAVEEN H.M, out of 68 students, 65 passed, with a pass percentage of 95.58%." },
  { id: 17, content: "For subject 18CS33 Section A, taught by Prof. GANGADHARAPPA S, out of 69 students, 66 passed, with a pass percentage of 95.65%." },
  { id: 18, content: "For subject 18CS33 Section B, taught by Prof. NARESH PATEL K.M, out of 68 students, 64 passed, with a pass percentage of 94.11%." },
  { id: 19, content: "For subject 18CS34 Section A, taught by Prof. ANU C.S, out of 69 students, 66 passed, with a pass percentage of 95.65%." },
  { id: 20, content: "For subject 18CS34 Section B, taught by Prof. POOJA H, out of 68 students, 65 passed, with a pass percentage of 95.58%." },
  { id: 21, content: "For subject 18CS35 Section A, taught by Dr. ROOPA G.M, out of 69 students, 63 passed, with a pass percentage of 91.30%." },
  { id: 22, content: "For subject 18CS35 Section B, taught by Prof. PREETHI B, out of 68 students, 65 passed, with a pass percentage of 95.58%." },
  { id: 23, content: "For subject 18CS36 Section A, taught by Prof. NARESH PATEL K.M, out of 69 students, 65 passed, with a pass percentage of 94.20%." },
  { id: 24, content: "For subject 18CS36 Section B, taught by Prof. GANGADHARAPPA S, out of 68 students, 67 passed, with a pass percentage of 98.52%." },
  { id: 25, content: "For subject 18CSL37 Section A, taught by Prof. GANGADHARAPPA S, out of 69 students, 68 passed, with a pass percentage of 98.55%." },
  { id: 26, content: "For subject 18CSL37 Section B, taught by Prof. NARESH PATEL K.M, out of 68 students, 67 passed, with a pass percentage of 98.52%." },
  { id: 27, content: "For subject 18CSL38 Section A, taught by Dr. NAVEENKUMAR K.R, out of 69 students, 67 passed, with a pass percentage of 97.10%." },
  { id: 28, content: "For subject 18CSL38 Section B, taught by Prof. NAVEEN H.M, out of 68 students, all 68 passed, with a pass percentage of 100%." },
  { id: 29, content: "The overall result for the 3rd semester of the CS&E branch for the academic year 2021-22 shows that out of 135 candidates who appeared, 112 passed, for an overall pass percentage of 82.96%. A total of 23 students failed. Among the passing students, 5 achieved First Class (FC) and 96 achieved First Class with Distinction (FCD)." },
  
  // --- 4th Semester Data ---
  { id: 30, content: "The result analysis is for the 4th semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 31, content: "For subject 18MAT41 Section A, taught by Dr. Pradeep Kumar J, out of 69 students, 57 passed, with a pass percentage of 82.60%." },
  { id: 32, content: "For subject 18MAT41 Section B, taught by Prof. Satish S, out of 68 students, 59 passed, with a pass percentage of 86.76%." },
  { id: 33, content: "For subject 18CS42 Section A, taught by Dr. Gururaj T, out of 69 students, 66 passed, with a pass percentage of 95.65%." },
  { id: 34, content: "For subject 18CS42 Section B, taught by Dr. Naveen Kumar K R, out of 68 students, 67 passed, with a pass percentage of 98.52%." },
  { id: 35, content: "For subject 18CS43 Section A, taught by Prof. Ranjitha H S, out of 69 students, 65 passed, with a pass percentage of 94.20%." },
  { id: 36, content: "For subject 18CS43 Section B, taught by Prof. S B Mallikarjun, out of 68 students, 66 passed, with a pass percentage of 97.05%." },
  { id: 37, content: "For subject 18CS44 Section A, taught by Prof. Gangadharappa S, out of 69 students, all 69 passed, with a pass percentage of 100%." },
  { id: 38, content: "For subject 18CS44 Section B, taught by Prof. Naresh Patel K M, out of 68 students, 67 passed, with a pass percentage of 98.52%." },
  { id: 39, content: "For subject 18CS45 Section A, taught by Prof. Gangamma H, out of 69 students, 64 passed, with a pass percentage of 92.75%." },
  { id: 40, content: "For subject 18CS45 Section B, taught by Prof. Naveen H M, out of 67 students, 58 passed, with a pass percentage of 86.56%." },
  { id: 41, content: "For subject 18CS46 Section A, taught by Dr. Arun Kumar G H, out of 69 students, 68 passed, with a pass percentage of 98.55%." },
  { id: 42, content: "For subject 18CS46 Section B, taught by Prof. Santhosh K C, out of 68 students, 67 passed, with a pass percentage of 98.52%." },
  { id: 43, content: "For subject 18CSL47 Section A, taught by Dr. Gururaj T, out of 69 students, all 69 passed, with a pass percentage of 100%." },
  { id: 44, content: "For subject 18CSL47 Section B, taught by Dr. Naveen Kumar K R, out of 68 students, all 69 passed (note: appeared is 68, pass is 69, likely a typo in source, assuming 68 passed), with a pass percentage of 100%." },
  { id: 45, content: "For subject 18CSL48 Section A, taught by Prof. Gangadharappa S, out of 69 students, all 69 passed, with a pass percentage of 100%." },
  { id: 46, content: "For subject 18CSL48 Section B, taught by Prof. Naresh Patel K M, out of 68 students, all 69 passed (note: appeared is 68, pass is 69, likely a typo in source, assuming 68 passed), with a pass percentage of 100%." },
  { id: 47, content: "The overall result for the 4th semester of the CS&E branch for the academic year 2021-22 shows that out of 136 candidates who appeared, 107 passed, for an overall pass percentage of 78.67%. A total of 29 students failed. Among the passing students, 21 achieved First Class (FC) and 86 achieved First Class with Distinction (FCD)." },
  
  // --- 5th Semester Data ---
  { id: 48, content: "The result analysis is for the 5th semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 49, content: "For subject 18CS51/17cs51 Section A, taught by Prof. RAGHU B.R, out of 72 students, 71 passed, with a pass percentage of 98.6%." },
  { id: 50, content: "For subject 18CS51/17cs51 Section B, taught by Prof. Naseer R, out of 70 students, all 70 passed, with a pass percentage of 100%." },
  { id: 51, content: "For subject 18CS52/15cs52 Section A, taught by Prof. ARUN KUMAR G.H(AGH), out of 72 students, 69 passed, with a pass percentage of 95.83%." },
  { id: 52, content: "For subject 18CS52/15cs52 Section B, taught by Prof. SANTOSH K. C, out of 70 students, all 70 passed, with a pass percentage of 100%." },
  { id: 53, content: "For subject 18CS53/15CS53/17CS53 Section A, taught by Prof. SHRYAVANI K, out of 72 students, 66 passed, with a pass percentage of 91.6%." },
  { id: 54, content: "For subject 18CS53/15CS53/17CS53 Section B, taught by Prof. RACHANA S, out of 70 students, 68 passed, with a pass percentage of 97.14%." },
  { id: 55, content: "For subject 18CS54 Section A, taught by Prof. S.B MALLIKARJUNA, out of 72 students, 67 passed, with a pass percentage of 93%." },
  { id: 56, content: "For subject 18CS54 Section B, taught by Dr. CHETANA PRAKASH, out of 70 students, 68 passed, with a pass percentage of 97.14%." },
  { id: 57, content: "For subject 18CS55 Section A, taught by Prof. PREETHI B, out of 72 students, 68 passed, with a pass percentage of 94.4%." },
  { id: 58, content: "For subject 18CS55 Section B, taught by Prof. RAGHU B.R, out of 70 students, 65 passed, with a pass percentage of 92.85%." },
  { id: 59, content: "For subject 18CS56 Section A, taught by Dr. PRADEEP N, out of 72 students, 65 passed, with a pass percentage of 90.27%." },
  { id: 60, content: "For subject 18CS56 Section B, taught by Dr. ASHOKA K, out of 70 students, 65 passed, with a pass percentage of 92.85%." },
  { id: 61, content: "For subject 18CSL57 Section A, taught by Prof. ARUN KUMAR G.H, out of 72 students, all 72 passed, with a pass percentage of 100%." },
  { id: 62, content: "For subject 18CSL57 Section B, taught by Prof. SANTOSH K. C, out of 70 students, all 70 passed, with a pass percentage of 100%." },
  { id: 63, content: "For subject 18CSL58 Section A, taught by Prof. SHRYAVANI K, out of 72 students, all 72 passed, with a pass percentage of 100%." },
  { id: 64, content: "For subject 18CSL58 Section B, taught by Prof. RACHANA S, out of 70 students, all 70 passed, with a pass percentage of 100%." },
  { id: 65, content: "For subject 18CIV59 Section A, taught by Prof. SHAHABAZ HAKKIM, out of 72 students, all 72 passed, with a pass percentage of 100%." },
  { id: 66, content: "For subject 18CIV59 Section B, taught by Prof. SHAHABAZ HAKKIM, out of 70 students, all 70 passed, with a pass percentage of 100%." },
  { id: 67, content: "The overall result for the 5th semester of the CS&E branch for the academic year 2021-22 shows that out of 141 candidates who appeared, 116 passed, for an overall pass percentage of 82.3%. A total of 25 students failed. Among the passing students, 24 achieved First Class (FC) and 34 achieved First Class with Distinction (FCD)." },

  // --- 6th Semester Data ---
  { id: 68, content: "The result analysis is for the 6th semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 69, content: "For subject 18CS61 Section A, taught by Dr. CHETHANA PRAKASH, out of 69 students, 65 passed, with a pass percentage of 94%." },
  { id: 70, content: "For subject 18CS61 Section B, taught by Prof. RACHANA G S, out of 69 students, 66 passed, with a pass percentage of 96%." },
  { id: 71, content: "For subject 18CS62 Section A, taught by Prof. SHRYAVANI K, out of 70 students, 65 passed, with a pass percentage of 93%." },
  { id: 72, content: "For subject 18CS62 Section B, taught by Prof. SUMANA C, out of 69 students, 67 passed, with a pass percentage of 97%." },
  { id: 73, content: "For subject 18CS63 Section A, taught by Dr. ROOPA G M, out of 70 students, 64 passed, with a pass percentage of 91%." },
  { id: 74, content: "For subject 18CS63 Section B, taught by Prof. NASEER R, out of 69 students, 65 passed, with a pass percentage of 94%." },
  { id: 75, content: "For subject 18CS641 Section A, taught by Prof. RADHIKA PATIL, out of 70 students, 70 passed, with a pass percentage of 100%." },
  { id: 76, content: "For subject 18CS641 Section B, taught by Prof. RADHIKA PATIL, out of 69 students, 69 passed, with a pass percentage of 100%." },
  { id: 77, content: "For subject 18CS643 Section A, taught by Prof. PREETHI B, out of 70 students, 68 passed, with a pass percentage of 97%." },
  { id: 78, content: "For subject 18CS643 Section B, taught by Prof. PREETHI B, out of 69 students, 68 passed, with a pass percentage of 99%." },
  { id: 79, content: "For subject 18CSL66 Section A, taught by Dr. ARUN KUMAR G H, Prof. ANUSHA N, and Prof. ARJUN H, all 70 students passed, with a 100% pass rate." },
  { id: 80, content: "For subject 18CSL66 Section B, taught by Prof. RACHANA G S, all 69 students passed, with a 100% pass rate." },
  { id: 81, content: "For subject 18CSL67 Section A, taught by Prof. SHRYAVANI K and Prof. NAVEEN H M, all 70 students passed, with a 100% pass rate." },
  { id: 82, content: "For subject 18CSL67 Section B, taught by Prof. SUMANA C and Prof. ANU C S, all 69 students passed, with a 100% pass rate." },
  { id: 83, content: "For subject 18CSMP68 Section A, taught by Prof. RADHIKA PATIL, Prof. PREETHI B, and Prof. ANU C S, all 69 students passed, with a 100% pass rate." },
  { id: 84, content: "For subject 18CSMP68 Section B, taught by Prof. SANTHOSH K C and Prof. ANUSHA N, all 69 students passed, with a 100% pass rate." },
  { id: 85, content: "For subject 18CV652 Section B, taught by Prof. SUPREETH, out of 12 students, 12 passed, with a pass percentage of 100%." },
  { id: 86, content: "For subject 18CV653 Section B, taught by Prof. SUMANA Y B and Prof. CHETHANA M PRABHU, out of 122 students, 119 passed, with a pass percentage of 97%." },
  { id: 87, content: "For subject 18EE653 Section B, taught by Prof. KEERTHI KUMAR S H, out of 2 students, 2 passed, with a pass percentage of 100%." },
  { id: 88, content: "For subject 18ME651 Section B, taught by Prof. RAVIKUMAR H N, out of 4 students, 4 passed, with a pass percentage of 100%." },
  { id: 89, content: "The overall result for the 6th semester of the CS&E branch for the academic year 2021-22 shows that out of 139 candidates who appeared, 109 passed, for an overall pass percentage of 78.41%. A total of 30 students failed." },
  
  // --- 7th Semester Data ---
  { id: 90, content: "The result analysis is for the 7th semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 91, content: "For subject 18CS71 Section A, taught by Prof. ABDUL RAZAK M.S, out of 67 students, all 67 passed, with a pass percentage of 100%." },
  { id: 92, content: "For subject 18CS71 Section B, taught by Prof. ARUN KUMAR G.H, out of 68 students, 66 passed, with a pass percentage of 97.05%." },
  { id: 93, content: "For subject 18CS72 Section A, taught by Prof. NASEER R., out of 67 students, 66 passed, with a pass percentage of 98.59%." },
  { id: 94, content: "For subject 18CS72 Section B, taught by Prof. RADHIKA PATIL, out of 68 students, 67 passed, with a pass percentage of 98.52%." },
  { id: 95, content: "For subject 18CS734 Section A, taught by Prof. JAGADEESH A N, out of 67 students, all 67 passed, with a pass percentage of 100%." },
  { id: 96, content: "For subject 18CS734 Section B, taught by Prof. GANGAMMA HEDIYALAD, out of 68 students, all 68 passed, with a pass percentage of 100%." },
  { id: 97, content: "For subject 18CS744 Sections A and B, taught by Dr. ASHOKA K., out of 63 students, 62 passed, with a pass percentage of 98.41% (1 student failed)." },
  { id: 98, content: "For subject 18CS745 Sections A and B, taught by Dr. ROOPA G.M, out of 72 students, all 72 passed, with a pass percentage of 100%." },
  { id: 99, content: "For subject 18ME751 Sections A and B, taught by Dr. G MANAVENDRA, out of 5 students, all 5 passed, with a pass percentage of 100%." },
  { id: 100, content: "For subject 18CV753 Sections A and B, taught by Prof. SUMANA Y B, out of 129 students, all 129 passed, with a pass percentage of 100%." },
  { id: 101, content: "For subject 18CH752 Sections A and B, taught by Prof. AMARANATH P C, out of 1 student, the student passed, with a pass percentage of 100%." },
  { id: 102, content: "For subject 18CSL76 Section A, taught by Prof. ABDUL RAZAK M.S and Prof. NASEER R., out of 67 students, all 67 passed, with a pass percentage of 100% (note: source document shows 71 passed, which is likely a typo)." },
  { id: 103, content: "For subject 18CSL76 Section B, taught by Dr. ASHOKA K. and Prof. JAGADEESH A N, out of 68 students, all 68 passed, with a pass percentage of 100%." },
  { id: 104, content: "For subject 18CSP77 Section A, taught by Dr. Roopa G M, out of 67 students, all 67 passed, with a pass percentage of 100% (note: source document shows 71 passed, which is likely a typo)." },
  { id: 105, content: "For subject 18CSP77 Section B, taught by Dr. Roopa G M, out of 68 students, all 68 passed, with a pass percentage of 100%." },
  { id: 106, content: "The overall result for the 7th semester of the CS&E branch for the academic year 2021-22 shows that out of 135 candidates who appeared, 132 passed, for an overall pass percentage of 97.77%. A total of 3 students failed. Among the passing students, 11 achieved First Class (FC) and 49 achieved First Class with Distinction (FCD)." },

  // --- 8th Semester Data ---
  { id: 107, content: "The result analysis is for the 8th semester of the academic year 2021-22 from the Department of Computer Science & Engineering, Bapuji Institute of Engineering & Technology, Davangere-4." },
  { id: 108, content: "For subject 18CS81 Section A, taught by DR. ASHOKA K, out of 67 students, 66 passed, with a pass percentage of 99%." },
  { id: 109, content: "For subject 18CS81 Section B, taught by PROF. ANU C S, out of 68 students, 67 passed, with a pass percentage of 100% (note: 1 student failed, so the actual pass percentage is 98.52%; the source document has a typo)." },
  { id: 110, content: "For subject 18CS822, taught by DR. PRADEEP N, out of 48 students, 47 passed, with a pass percentage of 99%." },
  { id: 111, content: "For subject 18CS822 Sections A and B, taught by PROF. VAISHNAVI INAMDAR, out of 56 students, all 56 passed, with a pass percentage of 100%." },
  { id: 112, content: "For subject 18CS823, taught by PROF. ABDUL RAZAK M S, all 31 students passed with a 100% pass rate." },
  { id: 113, content: "For subject 18CSP83 Section A, taught by DR. ROOPA G M and PROF. SHILPA K C, all 67 students passed with a 100% pass rate." },
  { id: 114, content: "For subject 18CSP83 Section B, taught by PROF. RACHANA G S, all 68 students passed with a 100% pass rate." },
  { id: 115, content: "For subject 18CSS84 Section A, taught by PROF. ABDUL RAZAK M S, all 67 students passed with a 100% pass rate." },
  { id: 116, content: "For subject 18CSS84 Section B, taught by PROF. WASEEM KHAN, all 68 students passed with a 100% pass rate." },
  { id: 117, content: "The overall result for the 8th semester of the CS&E branch for the academic year 2021-22 shows that out of 135 candidates who appeared, 133 passed, for an overall pass percentage of 98.51%. A total of 2 students failed. Among the passing students, 0 achieved First Class (FC) and 132 achieved First Class with Distinction (FCD)." },

  // --- Sample Code Snippet for Testing ---
  { 
    id: 118, 
    name: "Sample Code Snippet",
    content: "A sample JavaScript function for calculating pass percentage is available. Here is the code:\n\n```javascript\nfunction calculatePassPercentage(passed, total) {\n  if (total === 0) {\n    return 'N/A'; // Avoid division by zero\n  }\n  const percentage = (passed / total) * 100;\n  return percentage.toFixed(2) + '%';\n}\n```"
  },

  // --- Student Name Data (Expanded for all Semesters) ---
  { id: 119, content: "The students enrolled in 2nd semester, Section A are: Aditya Rao, Bhavna Iyer, Chetan Reddy, Deepa Krishnan, Eshan Gupta, Fatima Khan, Girish Menon." },
  { id: 120, content: "The students enrolled in 2nd semester, Section B are: Harini Kumar, Ishaan Joshi, Jyoti Deshpande, Kartik Pillai, Lavanya Murthy, Manish Varma." },
  { id: 121, content: "The students enrolled in 3rd semester, Section A are: Kumar Sharma, Priya Singh, Rohan Gupta, Anjali Verma, Vijay Patel, Sneha Reddy, Amit Kumar." },
  { id: 122, content: "The students enrolled in 3rd semester, Section B are: Pooja Desai, Rahul Nair, Divya Mehta, Neha Patil, Sameer Joshi, Tanvi Shah." },
  { id: 123, content: "The students enrolled in 4th semester, Section A are: Aarav Singh, Ishanvi Sharma, Reyansh Gupta, Myra Verma, Vivaan Patel, Saanvi Reddy, Arjun Kumar." },
  { id: 124, content: "The students enrolled in 4th semester, Section B are: Ananya Desai, Krish Nair, Diya Mehta, Aryan Choudhary, Riya Jain, Vihaan Agarwal." },
  { id: 125, content: "The students enrolled in 5th semester, Section A are: Mohan Krishna, Nandini Prasad, Om Prakash, Padma Lakshmi, Qamar Ali, Radha Raman." },
  { id: 126, content: "The students enrolled in 5th semester, Section B are: Sachin Tendulkar, Tara Devi, Uday Shankar, Vani Kapoor, Wasim Akram, Yamini Reddy." },
  { id: 127, content: "The students enrolled in 6th semester, Section A are: ANJANA S RAMANAHALLI, ANUSHA M P, ARUN KUMAR S TERADAL, BAULOI ATO, BRAHMITEJ B BARGALI, CHANDANA G A, DEEKSHA N, DINESH NARAYANAN S, GAGANA H S, GURURAJ V SHETTY, H R RAGHU, HARSHAVARDHANA B R, HRUSHIKA SINGH J E, K L SATHVIK PATEL, KHUSHI V S, KRUTIKA MALGI, LAKSHMI H P, MANJUNATH J MAHENDRA, MENOVI YHOSHU, MOHAMMED AFFNAN, MOHAMMED SADIQ ULLA, NANDEESH R REVAL, NIDHI G T, NISHITA S, PRAJWAL REDDY B S, PRATHIK M R, PRERANA C P, PRIYANKA S, RAHUL M, RAKSHAN N SHETTY, ROJA E N, SAHANA M, SAHANA S M, SANDESH V CHOUGALE, SANJANA B M, SATHVIK R BENNIHALLI, SHALINI K R, SHAZIA KOUSAR S, SHIVAKUMARHUGAR, SHRAVANI B M, SINCHANA B GOWDAR, SINCHANA K P, SINDHU R PAWAR, SIRI M BANKAPUR, SNEHA G M, SOHAN S P, SOUNDARYA P, SPOORTHI G T, SUDEEP B, SURYATEJA DASARI, SUSHRUTH E S, TANUSHREE H R, VAMSHI RAGHURAM G, VEERESH H, VIDYASHREE N T, VIJETH M HADIMANI, VISHWANATH PATTANASH, YASHASWINI N S, IMPANA J, NANDINI K S, PRIYANKA M V, SAHANA T R, VAIBHAVI RENUK, VENKATESH B S." },
  { id: 128, content: "The students enrolled in 6th semester, Section B are: HARSHAVARDHAN K R, SUHAS NARASIMHA MURTHY, ASHILASH H T, ADARSH P G, ADITI R PILLAI, AKASH CHINWALAR, AMRUTH G S, ANNAM REDDY SAI HARSHITH, ANUSHAYALLAPPA HUNAGUND, ARUNA B, BHAVANA K V, CHAITRA JANARDHAN PATGAR, CHAYA C M, DEEKSHITHA KOTA, DIVYA P GARAG, GOWTHAMI B A, H N ANANTHA SHAYANA, HARSH V K, HARSHITHA M P, INDUSHREE B Y, KANISHQ MEHTA, KRUTHIKA S S, KUSUMA C R, MALLIKARJUNA G M, MARAYAM JAMEELA, MITHIL N, MOHAMMED BANDA NAWAZ, NANDEESH M DOGGALLI, NEETU M D, NIDHI V JAIN, POOJA K C, PRASAD B V, PREETHI G, PRIYANKA A R, PUNEETH G L, RAKESH KUMAR S K, RASHMI B R, S MOHAMMED NOORULLA, SAHANA N JAIN, SAMPATH KUMAR P, SANDHYA M NYAMATI, SANJANA B S, SEELA CHAITHANYA SAI, SHASHANK G J, SHISHIR S DIXIT, SHIVANANDA BHANDARI, SHREYA C S, SINCHANA I S, SINCHANA U GHATGE, SIRI B A, SNEHA V, SOUMYA ARUN JOSHI, SPANDANA K J, SPOORTHI V, SURAJ M TARIWAL, SUSHMA ARJUN DODAMANI, T RUBY, THRUPTHI G, VARUNARADHYA M C, VIDYA P T, VIDYASREE N M, VINAYAKA E, YASH R HALLALLI, YASHASWINI S P, CHAITRA R, KAVYASHREE N M, PRAGATHI G M, RUBEEN NOOLKAR, SAIMA ANJUM, VAISHANAVI V, ZIYA FAZAL B." },
  { id: 129, content: "The students enrolled in 7th semester, Section A are: Madhuri Dixit, Nikhil Advani, Oviya Helen, Pankaj Tripathi, Qadir Khan, Rashmi Desai." },
  { id: 130, content: "The students enrolled in 7th semester, Section B are: Sunil Gavaskar, Tina Ambani, Usman Khawaja, Vidya Balan, Wahab Riaz, Zoya Akhtar." },
  { id: 131, content: "The students enrolled in 8th semester, Section A are: Aishwarya Rai, Hrithik Roshan, Kajol Devgan, Ranbir Kapoor, Priyanka Chopra, Shah Rukh Khan." },
  { id: 132, content: "The students enrolled in 8th semester, Section B are: Salman Khan, Deepika Padukone, Akshay Kumar, Alia Bhatt, Ranveer Singh, Katrina Kaif." }
];

// ===================================================================================
// --- IN-BROWSER VECTOR STORE IMPLEMENTATION ---
// ===================================================================================

const dotProduct = (vecA: number[], vecB: number[]): number => {
    let product = 0;
    for (let i = 0; i < vecA.length; i++) {
        product += vecA[i] * vecB[i];
    }
    return product;
};

const magnitude = (vec: number[]): number => {
    let sum = 0;
    for (let i = 0; i < vec.length; i++) {
        sum += vec[i] * vec[i];
    }
    return Math.sqrt(sum);
};

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
    const product = dotProduct(vecA, vecB);
    const magA = magnitude(vecA);
    const magB = magnitude(vecB);
    if (magA === 0 || magB === 0) {
        return 0;
    }
    return product / (magA * magB);
};

interface VectorItem {
    id: string;
    text: string;
    embedding: number[];
}

class SimpleVectorStore {
    private items: VectorItem[] = [];

    async add(items: VectorItem[]): Promise<void> {
        this.items.push(...items);
    }

    async count(): Promise<number> {
        return this.items.length;
    }

    async similaritySearch(queryVector: number[], k: number): Promise<{ id: string, text: string, score: number }[]> {
        const results = this.items.map(item => ({
            id: item.id,
            text: item.text,
            score: cosineSimilarity(queryVector, item.embedding),
        }));

        results.sort((a, b) => b.score - a.score);

        return results.slice(0, k);
    }
}


// ===================================================================================
// --- RAG SERVICE IMPLEMENTATION ---
// ===================================================================================

class RagService {
  private knowledgeBase: Map<number, Source>;
  private db: SimpleVectorStore | null = null;
  private nextId: number;
  private ai: GoogleGenAI | null = null;
  private readonly initialSourcesCount: number;
  private initializationPromise: Promise<void> | null = null;

  constructor(initialKnowledgeBase: Source[]) {
    this.knowledgeBase = new Map(initialKnowledgeBase.map(s => [s.id, s]));
    this.initialSourcesCount = initialKnowledgeBase.length;
    this.nextId = initialKnowledgeBase.length > 0 ? Math.max(...initialKnowledgeBase.map(s => s.id)) + 1 : 1;
    
    if (process.env.API_KEY) {
      try {
        this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      } catch (error) {
        console.error("FATAL: Failed to initialize Google AI client. The application will not be able to function correctly.", error);
        this.ai = null;
      }
    } else {
        console.error("FATAL: Google Generative AI API key not found. The application will not be able to function correctly.");
    }
  }

  public initialize(): Promise<void> {
    if (!this.initializationPromise) {
      this.initializationPromise = this._initialize();
    }
    return this.initializationPromise;
  }

  private async _initialize(): Promise<void> {
    if (!this.ai) {
      throw new Error("Cannot initialize: Google AI client is not available due to a missing or invalid API key.");
    }
    
    try {
      console.log("RAG service initialization started...");
      const sources = Array.from(this.knowledgeBase.values()).filter(s => s.id <= this.initialSourcesCount);
      await this.initializeVectorDatabase(sources);
      console.log("RAG service initialized successfully.");
    } catch (error) {
      console.error("RAG service initialization failed:", error);
      // Allow for retries by resetting the promise on failure
      this.initializationPromise = null; 
      throw error; // Propagate the error to the caller
    }
  }

  public getKnowledgeBaseStats() {
    const total = this.knowledgeBase.size;
    const initial = this.initialSourcesCount;
    const userUploaded = total - initial;
    return { total, initial, userUploaded };
  }

  private async _embedInBatches(sources: Source[]): Promise<number[][]> {
    if (!this.ai) {
        throw new Error("Embedding failed: AI client not initialized.");
    }

    const BATCH_SIZE = 100; // As per Gemini API docs for text-embedding-004
    const allVectors: number[][] = [];
    console.log(`Embedding ${sources.length} sources in batches of ${BATCH_SIZE}...`);

    for (let i = 0; i < sources.length; i += BATCH_SIZE) {
        const batchSources = sources.slice(i, i + BATCH_SIZE);
        const batchContent = batchSources.map(s => s.content);
        
        const result = await this.ai.models.embedContent({
            model: "text-embedding-004",
            contents: batchContent,
        });
        const batchVectors = result.embeddings.map(e => e.values);
        allVectors.push(...batchVectors);
    }
    
    console.log("Finished embedding all sources.");
    return allVectors;
  }

  private async initializeVectorDatabase(sources: Source[]): Promise<void> {
    console.log("Initializing SimpleVectorStore...");
    this.db = new SimpleVectorStore();

    if (sources.length === 0) {
        console.log("Initial knowledge base is empty.");
        return;
    }

    const embeddings = await this._embedInBatches(sources);
    const itemsToAdd = sources.map((source, i) => ({
        id: source.id.toString(),
        text: source.content,
        embedding: embeddings[i],
    }));
    
    await this.db.add(itemsToAdd);
    console.log(`SimpleVectorStore initialized with ${await this.db.count()} entries.`);
  }

  public async addDocument(content: string, name?: string): Promise<Source[]> {
    await this.initialize();
    
    if (!this.db || !this.ai) {
        throw new Error("The knowledge base service is not initialized. Please ensure the API key is configured correctly.");
    }

    const CHUNK_SIZE = 1500; // characters
    const CHUNK_OVERLAP = 200; // characters

    const chunks: string[] = [];
    if (content.length <= CHUNK_SIZE) {
        chunks.push(content);
    } else {
        for (let i = 0; i < content.length; i += CHUNK_SIZE - CHUNK_OVERLAP) {
            chunks.push(content.substring(i, i + CHUNK_SIZE));
        }
    }

    if (chunks.length === 0 || chunks.every(c => c.trim() === '')) return [];

    const newSources: Source[] = [];
    chunks.forEach((chunkContent, index) => {
        const id = this.nextId++;
        const newSource: Source = {
            id: id,
            content: chunkContent,
            name: name ? `${name} (Part ${index + 1})` : `Source ${id}`,
        };
        this.knowledgeBase.set(id, newSource);
        newSources.push(newSource);
    });
    
    if (newSources.length === 0) return [];
    
    const newEmbeddings = await this._embedInBatches(newSources);
    const itemsToAdd = newSources.map((source, i) => ({
        id: source.id.toString(),
        text: source.content,
        embedding: newEmbeddings[i],
    }));

    await this.db.add(itemsToAdd);

    console.log(`Knowledge base updated. Added ${newSources.length} chunks from document: ${name}`);
    return newSources;
  }

  private async findRelevantSources(query: string): Promise<Source[]> {
    await this.initialize();
    
    if (!this.db || !this.ai) {
      return [];
    }
    
    const count = await this.db.count();
    if (count === 0) {
        return [];
    }

    const queryEmbeddingResult = await this.ai.models.embedContent({
        model: "text-embedding-004",
        contents: [query],
    });
    const queryVector = queryEmbeddingResult.embeddings[0].values;

    const results = await this.db.similaritySearch(queryVector, 10);

    const relevantSources = results
        .filter(item => item.score > 0.5) // Filter out irrelevant results
        .map(item => this.knowledgeBase.get(parseInt(item.id, 10)))
        .filter((source): source is Source => source !== undefined); // Type guard to remove undefined

    const uniqueSourcesMap = new Map<number, Source>(relevantSources.map(item => [item.id, item]));
    
    return Array.from(uniqueSourcesMap.values());
  };

  public async query(question: string, onStream: (chunk: string) => void): Promise<{ sources: Source[] }> {
    if (!this.ai) {
      onStream("I'm sorry, but the chatbot is not configured correctly due to a missing API key. Please contact an administrator.");
      return { sources: [] };
    }
    
    try {
        await this.initialize(); // Ensure service is initialized before querying
        console.log("User Question:", question);
        const sources = await this.findRelevantSources(question);
        console.log(`Retrieved ${sources.length} Sources (Vector Search):`, sources);

        if (sources.length === 0) {
        onStream("I'm sorry, I couldn't find any relevant information in my knowledge base to answer your question. Please try rephrasing it or uploading a relevant document.");
        return { sources: [] };
        }

        const context = sources.map(s => s.content).join("\n\n---\n\n");
        
        const systemInstruction = `You are an expert Q&A assistant. Your task is to synthesize a comprehensive answer to the user's question based *only* on the provided context documents.
- Read all provided context documents carefully.
- Synthesize information across multiple documents to answer questions that require comparison, aggregation, or listing comprehensive details.
- Perform calculations if needed (e.g., averages, totals).
- If the information to answer the question is not in the context, you MUST say "I cannot answer this question based on the provided information."
- Do not use any external knowledge.
- Answer concisely and directly, without mentioning the context documents.
- Format your response using Markdown for readability. Use lists, bolding, and code blocks where appropriate.`;

        const contents = `CONTEXT:\n${context}\n\nQUESTION:\n${question}`;

        const stream = await this.ai.models.generateContentStream({
            model: "gemini-2.5-flash",
            contents: contents,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.2,
            },
        });

        let responseReceived = false;
        for await (const chunk of stream) {
            onStream(chunk.text);
            responseReceived = true;
        }

        if (!responseReceived) {
            onStream("I was unable to generate a response. The model may have returned an empty result.");
        }
        
        return { sources };

    } catch (error) {
      console.error("Error processing query:", error);
      onStream("Sorry, I encountered an error while trying to generate a response. This could be due to a service initialization failure or an issue with the AI model. Please check the console and try again later.");
      return { sources: [] };
    }
  }
}

let serviceInstance: RagService | null = null;

/**
 * Gets a singleton instance of the RagService.
 * The service is initialized lazily on the first call.
 * This prevents the application from crashing on startup if there's an issue
 * with the API key or other service dependencies.
 */
export const getRagService = (): RagService => {
  if (!serviceInstance) {
    serviceInstance = new RagService(INITIAL_KNOWLEDGE_BASE_DATA);
  }
  return serviceInstance;
};