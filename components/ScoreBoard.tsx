import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScoreBoardProps {
  score: number;
  bestScore?: number;
  className?: string;
}

export function ScoreBoard({
  score,
  bestScore = 0,
  className
}: ScoreBoardProps) {
  return (
    <Card className={cn("w-full bg-gradient-to-br from-[#111827] to-[#1F2937] border-[#3B82F6] shadow-lg rounded-2xl", className)}>
      <CardHeader>
        <CardTitle className="text-[#E5E7EB] flex items-center gap-2">
          <span className="text-[#3B82F6]">📊</span> Score Board
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="text-center p-4 rounded-xl bg-[#1F2937]/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[#9CA3AF]">Current Score</p>
            <motion.p
              className="text-3xl font-bold text-[#22D3EE]"
              key={score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {score}
            </motion.p>
          </motion.div>
          <motion.div
            className="text-center p-4 rounded-xl bg-[#1F2937]/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <p className="text-[#9CA3AF]">Best Score</p>
            <p className="text-3xl font-bold text-[#3B82F6]">{bestScore}</p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}