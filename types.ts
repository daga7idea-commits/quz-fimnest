
export interface UserData {
  name: string;
  status: string;
  contact: string;
}

export type OptionId = 'أ' | 'ب' | 'ج';

export interface Question {
  id: number;
  text: string;
  options: {
    id: OptionId;
    text: string;
  }[];
}

export enum AppStep {
  WELCOME = 'WELCOME',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT'
}

export interface QuizResult {
  title: string;
  description: string;
  color: string;
}
