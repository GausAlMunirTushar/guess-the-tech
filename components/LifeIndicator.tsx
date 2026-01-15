import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface LifeIndicatorProps {
  lives: number;
  maxLives?: number;
  className?: string;
}

export function LifeIndicator({
  lives,
  maxLives = 3,
  className
}: LifeIndicatorProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {[...Array(maxLives)].map((_, index) => (
        <motion.div
          key={index}
          animate={{ scale: index < lives ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <Heart
            className={cn(
              "w-7 h-7",
              index < lives
                ? "text-[#EF4444] fill-[#EF4444] drop-shadow-sm"
                : "text-[#4B5563] fill-[#4B5563]"
            )}
          />
        </motion.div>
      ))}
    </div>
  );
}