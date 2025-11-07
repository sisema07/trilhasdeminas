export type Page = 'parks' | 'badges' | 'profile';

export interface Park {
  id: string;
  name: string;
  location: string;
  description: string;
  images: string[];
  difficulty: 'Fácil' | 'Moderada' | 'Difícil';
  duration: string;
  badgeIds: string[];
  quiz: QuizQuestion[];
  tags: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string; // URL or path to the icon
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}