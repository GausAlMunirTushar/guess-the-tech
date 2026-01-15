import { create } from 'zustand';
import { TechItem } from '@/data/techData';

export type GameMode = 'classic' | 'time-attack';
export type Difficulty = 'easy' | 'medium' | 'hard';

interface GameState {
  score: number;
  lives: number;
  currentQuestion?: TechItem;
  difficulty: Difficulty;
  gameStatus: 'idle' | 'playing' | 'finished';
  gameMode: GameMode;
  timeLeft: number;
  hintsUsed: number;
  hintAvailable: boolean;
  questionsAnswered: number;
  consecutiveCorrectAnswers: number;
  resetGame: () => void;
  setGameMode: (mode: GameMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setCurrentQuestion: (question: TechItem) => void;
  increaseScore: (points?: number) => void;
  decreaseLives: () => void;
  setTimeLeft: (time: number) => void;
  useHint: () => void;
  incrementQuestionsAnswered: () => void;
  resetCombo: () => void;
  startGame: () => void;
  endGame: () => void;
  setHintAvailable: (available: boolean) => void;
}

const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  lives: 3,
  difficulty: 'medium',
  gameStatus: 'idle',
  gameMode: 'classic',
  timeLeft: 60, // Default 60 seconds for time attack mode
  hintsUsed: 0,
  hintAvailable: true, // Player starts with one hint per question
  questionsAnswered: 0,
  consecutiveCorrectAnswers: 0,

  resetGame: () => set({
    score: 0,
    lives: 3,
    gameStatus: 'idle',
    timeLeft: get().gameMode === 'time-attack' ? 60 : 60, // Reset time based on mode
    hintsUsed: 0,
    hintAvailable: true,
    questionsAnswered: 0,
    consecutiveCorrectAnswers: 0
  }),

  setGameMode: (mode) => set({ gameMode: mode }),

  setDifficulty: (difficulty) => set({ difficulty }),

  setCurrentQuestion: (question) => set({ currentQuestion: question, hintAvailable: true }),

  increaseScore: (points = 10) => set((state) => ({
    score: state.score + points,
    questionsAnswered: state.questionsAnswered + 1,
    consecutiveCorrectAnswers: state.consecutiveCorrectAnswers + 1
  })),

  decreaseLives: () => set((state) => ({ lives: state.lives - 1 })),

  setTimeLeft: (time) => set({ timeLeft: time }),

  useHint: () => set((state) => ({
    hintsUsed: state.hintsUsed + 1,
    hintAvailable: false
  })),

  incrementQuestionsAnswered: () => set((state) => ({ questionsAnswered: state.questionsAnswered + 1 })),

  resetCombo: () => set({ consecutiveCorrectAnswers: 0 }),

  setHintAvailable: (available) => set({ hintAvailable: available }),

  startGame: () => set({ gameStatus: 'playing' }),

  endGame: () => set({ gameStatus: 'finished' })
}));

export default useGameStore;