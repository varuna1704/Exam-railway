export interface Question {
  id: string;
  subject: string;
  topic: string;
  subtopic: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  exam: string;
  year: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  appeared_count: number;
}

export interface SubjectInfo {
  id: string;
  name: string;
  icon: string;
  qCount: number;
  storyType: string;
  description: string;
}

export interface SubjectScore {
  attempted: number;
  correct: number;
  total: number;
}

export interface TestResult {
  id: string;
  date: string;
  subject: string; // 'all' or subject id
  subjectName: string;
  type: 'subject' | 'full' | 'speed';
  score: number;
  totalQuestions: number;
  timeTaken: number; // seconds
  attempted: number;
  correct: number;
  wrong: number;
  skipped: number;
  subjectBreakdown: Record<string, SubjectScore>;
  weakTopics: string[];
}

export interface SyllabusItem {
  name: string;
  appearedCount: number;
  subtopics: {
    name: string;
    appearedCount: number;
  }[];
}

export interface StoryChapter {
  id: string;
  title: string;
  content: string;
}

export interface StoryData {
  subject: string;
  chapters: StoryChapter[];
}
