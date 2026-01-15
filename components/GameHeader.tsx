import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GameHeaderProps {
  score: number;
  lives?: number;
  timer?: number;
  mode: 'classic' | 'time-attack';
  className?: string;
}

export function GameHeader({
  score,
  lives = 3,
  timer,
  mode,
  className
}: GameHeaderProps) {
  return (
    <Card className={cn("w-full p-5 bg-gradient-to-r from-[#111827] to-[#1F2937] border-[#3B82F6] shadow-lg rounded-2xl", className)}>
      <div className="flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[#E5E7EB] flex items-center gap-2"
        >
          <span className="font-semibold text-[#3B82F6]">Score:</span>
          <span className="text-2xl font-bold text-[#22D3EE]">{score}</span>
        </motion.div>

        {mode === 'classic' && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#E5E7EB] flex items-center gap-2"
          >
            <span className="font-semibold text-[#EF4444]">Lives:</span>
            <span className="text-2xl font-bold text-[#EF4444]">{lives}</span>
          </motion.div>
        )}

        {mode === 'time-attack' && timer !== undefined && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-[#E5E7EB] flex items-center gap-2 ${timer <= 10 ? 'text-red-400 animate-pulse' : ''}`}
          >
            <span className="font-semibold">Time:</span>
            <span className={`text-2xl font-bold ${timer <= 10 ? 'text-red-400' : 'text-[#22D3EE]'}`}>{timer}s</span>
          </motion.div>
        )}
      </div>
    </Card>
  );
}