'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LogoRevealCard } from '@/components/LogoRevealCard';
import { GameHeader } from '@/components/GameHeader';
import { LifeIndicator } from '@/components/LifeIndicator';
import { TimerBar } from '@/components/TimerBar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import useGameStore from '@/store/gameStore';
import { techData, TechItem } from '@/data/techData';

interface GameClientProps {
  mode: 'classic' | 'time-attack';
}

export default function GameClient({ mode }: GameClientProps) {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const {
    score,
    lives,
    difficulty,
    gameStatus,
    timeLeft,
    currentQuestion,
    hintAvailable,
    questionsAnswered,
    consecutiveCorrectAnswers,
    resetGame,
    setGameMode,
    setDifficulty,
    setCurrentQuestion,
    increaseScore,
    decreaseLives,
    setTimeLeft,
    useHint,
    resetCombo,
    startGame,
    endGame
  } = useGameStore();

  // Initialize game
  useEffect(() => {
    resetGame();
    setGameMode(mode);
    startGame();

    // Start countdown before first question
    setCountdown(3);
  }, [mode, resetGame, setGameMode, startGame]);

  // Handle countdown
  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCountdown(null);
      loadNewQuestion();
    }
  }, [countdown]);

  // Timer for time attack mode
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (gameStatus === 'playing' && mode === 'time-attack' && timeLeft > 0 && !countdown) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft <= 0 && mode === 'time-attack') {
      endGame();
    }

    return () => clearInterval(timer);
  }, [gameStatus, mode, timeLeft, setTimeLeft, endGame, countdown]);

  // Check game over conditions
  useEffect(() => {
    if ((mode === 'classic' && lives <= 0) || (mode === 'time-attack' && timeLeft <= 0)) {
      endGame();
    }
  }, [lives, timeLeft, mode, endGame]);

  const loadNewQuestion = useCallback(() => {
    // Filter tech items by selected difficulty
    const filteredTech = techData.filter(item => item.difficulty === difficulty);

    if (filteredTech.length === 0) {
      // If no items for selected difficulty, use all items
      const randomIndex = Math.floor(Math.random() * techData.length);
      setCurrentQuestion(techData[randomIndex]);
    } else {
      const randomIndex = Math.floor(Math.random() * filteredTech.length);
      setCurrentQuestion(filteredTech[randomIndex]);
    }

    setUserInput('');
    setFeedback(null);
    setShowAnswer(false);
    // Note: setCurrentQuestion also resets hint availability due to store implementation
  }, [difficulty, setCurrentQuestion]);

  // Load first question after countdown
  useEffect(() => {
    if (!countdown && gameStatus === 'playing' && !currentQuestion) {
      loadNewQuestion();
    }
  }, [countdown, gameStatus, currentQuestion, loadNewQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentQuestion) return;

    // Check if answer is correct (case insensitive)
    const isCorrect =
      currentQuestion.name.toLowerCase() === userInput.trim().toLowerCase() ||
      currentQuestion.aliases.some(alias =>
        alias.toLowerCase() === userInput.trim().toLowerCase()
      );

    if (isCorrect) {
      // Correct answer
      setFeedback({ message: 'Correct!', type: 'success' });
      // Award points based on difficulty and whether hint was used
      // Add bonus points for combo
      const basePoints = hintAvailable ? 10 : 5; // Less points if hint was used
      const comboMultiplier = 1 + (consecutiveCorrectAnswers * 0.1); // 10% bonus per consecutive answer
      const points = Math.floor(basePoints * comboMultiplier);
      increaseScore(points);

      // Show the answer for a moment before next question
      setShowAnswer(true);
      setTimeout(() => {
        loadNewQuestion();
      }, 1500);
    } else {
      // Incorrect answer
      setFeedback({ message: `Incorrect! Answer: ${currentQuestion.name}`, type: 'error' });

      if (mode === 'classic') {
        decreaseLives();
      }

      // Reset combo on wrong answer
      resetCombo();

      // Show the answer for a moment before next question
      setShowAnswer(true);
      setTimeout(() => {
        loadNewQuestion();
      }, 1500);
    }
  };

  const handleDifficultyChange = (level: 'easy' | 'medium' | 'hard') => {
    setDifficulty(level);
  };

  // Save score to leaderboard when game ends
  useEffect(() => {
    if (gameStatus === 'finished') {
      const saveScore = () => {
        const savedLeaderboard = localStorage.getItem('guessTheTechLeaderboard');
        let leaderboard = [];

        if (savedLeaderboard) {
          try {
            leaderboard = JSON.parse(savedLeaderboard);
          } catch (e) {
            console.error('Error parsing leaderboard data:', e);
          }
        }

        const newEntry = {
          id: Date.now().toString(),
          name: 'Player',
          score,
          date: new Date().toISOString()
        };

        leaderboard.push(newEntry);
        leaderboard.sort((a, b) => b.score - a.score); // Sort by score descending
        leaderboard = leaderboard.slice(0, 10); // Keep only top 10

        localStorage.setItem('guessTheTechLeaderboard', JSON.stringify(leaderboard));
      };

      saveScore();
    }
  }, [gameStatus, score]);

  if (gameStatus === 'finished') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B0F19] to-[#1A202C] p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <h1 className="text-4xl font-bold text-[#E5E7EB] mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">
                Game Over!
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl text-[#22D3EE] font-semibold"
            >
              Final Score: {score}
            </motion.p>
            {consecutiveCorrectAnswers > 1 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-[#F59E0B] font-semibold mt-2"
              >
                Best Combo: x{consecutiveCorrectAnswers}!
              </motion.p>
            )}
          </div>

          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => router.push('/')}
                className="w-full py-6 text-lg bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] rounded-2xl shadow-lg"
              >
                Back to Home
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={() => {
                  resetGame();
                  setGameMode(mode);
                  startGame();
                  setCountdown(3);
                }}
                variant="outline"
                className="w-full py-6 text-lg text-[#E5E7EB] border-[#3B82F6] hover:bg-[#111827] rounded-2xl"
              >
                Play Again
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#0B0F19] to-[#1A202C] p-4">
      {/* Game Header */}
      <GameHeader
        score={score}
        lives={lives}
        timer={timeLeft}
        mode={mode}
        className="mb-6"
      />

      {/* Countdown Modal */}
      <AnimatePresence>
        {countdown !== null && (
          <Dialog open={true}>
            <DialogContent className="w-48 h-48 flex items-center justify-center bg-gradient-to-br from-[#111827] to-[#1F2937] border-[#3B82F6] rounded-2xl shadow-2xl">
              <DialogHeader className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <DialogTitle className="text-6xl font-bold text-[#E5E7EB]">
                    {countdown > 0 ? countdown : 'Go!'}
                  </DialogTitle>
                </motion.div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl w-full mx-auto">
        {/* Difficulty Selector */}
        <div className="flex gap-2 mb-6">
          {(['easy', 'medium', 'hard'] as const).map((level) => (
            <motion.div
              key={level}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={difficulty === level ? "default" : "outline"}
                onClick={() => handleDifficultyChange(level)}
                className={
                  difficulty === level
                    ? "bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] shadow-md"
                    : "text-[#E5E7EB] border-[#3B82F6] hover:bg-[#111827] shadow-md"
                }
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Progress and Combo Indicators */}
        <div className="w-full max-w-md mb-4">
          <div className="flex justify-between text-sm text-[#9CA3AF] mb-1">
            <span>Question {questionsAnswered + 1}</span>
            <span>Score: {score}</span>
          </div>
          <div className="h-2 bg-[#1F2937] rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(100, (questionsAnswered % 10) * 10)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Combo Indicator */}
          {consecutiveCorrectAnswers > 1 && (
            <motion.div
              className="flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full text-xs font-bold text-[#0B0F19]">
                COMBO x{consecutiveCorrectAnswers}!
              </div>
            </motion.div>
          )}
        </div>

        {/* Logo Reveal Card */}
        {currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md mb-8"
          >
            <LogoRevealCard
              icon={currentQuestion.icon}
              revealed={showAnswer}
              difficulty={difficulty}
            />
          </motion.div>
        )}

        {/* Feedback Message */}
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className={`mb-4 px-6 py-3 rounded-xl backdrop-blur-sm ${
              feedback.type === 'success'
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}
          >
            {feedback.message}
          </motion.div>
        )}

        {/* Answer Input */}
        {!showAnswer && currentQuestion && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-md"
          >
            <form onSubmit={handleSubmit}>
              <div className="flex gap-2 mb-3">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter tech name..."
                  className="flex-1 bg-[#111827] border-[#3B82F6] text-[#E5E7EB] placeholder:text-[#9CA3AF] shadow-md"
                  autoFocus
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-[#E5E7EB] shadow-md"
                  >
                    Submit
                  </Button>
                </motion.div>
              </div>
            </form>

            {/* Hint Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={useHint}
                disabled={!hintAvailable}
                variant="outline"
                className={`w-full ${
                  hintAvailable
                    ? 'bg-[#1F2937] text-[#FBBF24] border-[#FBBF24] hover:bg-[#374151]'
                    : 'bg-[#374151] text-[#6B7280] border-[#4B5563] cursor-not-allowed'
                }`}
              >
                💡 Use Hint ({currentQuestion.name.charAt(0)})
              </Button>
            </motion.div>
          </motion.div>
        )}

        {/* Lives Indicator for Classic Mode */}
        {mode === 'classic' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <LifeIndicator lives={lives} />
          </motion.div>
        )}

        {/* Timer Bar for Time Attack Mode */}
        {mode === 'time-attack' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-md mt-6"
          >
            <TimerBar timeLeft={timeLeft} totalTime={60} />
          </motion.div>
        )}
      </div>
    </div>
  );
}