'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, RotateCcw, Crown } from 'lucide-react';
import { motion } from 'framer-motion';

// Define the leaderboard entry type
interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  date: string; // ISO string
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load leaderboard from localStorage
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('guessTheTechLeaderboard');
    if (savedLeaderboard) {
      try {
        setLeaderboard(JSON.parse(savedLeaderboard));
      } catch (e) {
        console.error('Error parsing leaderboard data:', e);
        setLeaderboard([]);
      }
    } else {
      // Initialize with sample data
      setLeaderboard([
        { id: '1', name: 'Alice', score: 1250, date: new Date(Date.now() - 86400000).toISOString() },
        { id: '2', name: 'Bob', score: 1100, date: new Date(Date.now() - 172800000).toISOString() },
        { id: '3', name: 'Charlie', score: 950, date: new Date().toISOString() },
        { id: '4', name: 'Diana', score: 875, date: new Date(Date.now() - 345600000).toISOString() },
        { id: '5', name: 'Eve', score: 750, date: new Date(Date.now() - 432000000).toISOString() },
      ]);
    }
    setLoading(false);
  }, []);

  // Function to reset leaderboard (for demo purposes)
  const resetLeaderboard = () => {
    if (confirm('Are you sure you want to reset the leaderboard?')) {
      localStorage.removeItem('guessTheTechLeaderboard');
      setLeaderboard([]);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0B0F19] to-[#1A202C] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-[#E5E7EB] mb-2 flex items-center justify-center gap-3">
            <Trophy className="text-yellow-400" size={40} />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3B82F6] to-[#22D3EE]">
              Leaderboard
            </span>
          </h1>
          <p className="text-[#9CA3AF]">Top scores in Guess the Tech</p>
        </motion.div>

        <Card className="bg-gradient-to-br from-[#111827] to-[#1F2937] border-[#3B82F6] shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-[#E5E7EB] flex items-center gap-2">
              <Crown className="text-yellow-400" size={24} /> High Scores
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={resetLeaderboard}
              title="Reset Leaderboard"
              className="text-[#E5E7EB] hover:bg-[#1F2937]"
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-12 text-[#9CA3AF]">
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3B82F6]"></div>
                </div>
                Loading leaderboard...
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-12 text-[#9CA3AF]">
                <div className="flex justify-center mb-4">
                  <Trophy className="h-12 w-12 text-[#3B82F6]/50" />
                </div>
                No scores yet. Play the game to see scores here!
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-4"
              >
                {leaderboard
                  .sort((a, b) => b.score - a.score) // Sort by score descending
                  .map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-5 rounded-2xl transition-all duration-300 ${
                        index === 0
                          ? 'bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 shadow-lg'
                          : index === 1
                            ? 'bg-gradient-to-r from-gray-400/10 to-gray-500/10 border border-gray-400/30 shadow-md'
                            : index === 2
                              ? 'bg-gradient-to-r from-amber-800/10 to-amber-900/10 border border-amber-700/30 shadow-md'
                              : 'bg-[#1F2937]/50 border border-[#374151] hover:bg-[#1F2937]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`text-xl font-bold ${
                          index === 0 ? 'text-yellow-400' :
                          index === 1 ? 'text-gray-300' :
                          index === 2 ? 'text-amber-600' :
                          'text-[#E5E7EB]'
                        }`}>
                          {index === 0 && <Crown className="h-6 w-6" />}
                          {index === 1 && <span>🥈</span>}
                          {index === 2 && <span>🥉</span>}
                          {index > 2 && `#${index + 1}`}
                        </div>
                        <div>
                          <div className="font-semibold text-[#E5E7EB] text-lg">{entry.name}</div>
                          <div className="text-sm text-[#9CA3AF]">Played on {formatDate(entry.date)}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-[#22D3EE]">{entry.score}</div>
                    </motion.div>
                  ))
                }
              </motion.div>
            )}
          </CardContent>
        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="text-[#E5E7EB] border-[#3B82F6] hover:bg-[#111827] hover:text-[#22D3EE] px-8 py-6 text-lg rounded-2xl"
          >
            Back to Game
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}