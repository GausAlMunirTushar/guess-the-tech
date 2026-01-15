'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { IconType } from 'react-icons';

interface LogoRevealCardProps {
  icon: IconType;
  revealed: boolean;
  difficulty?: 'easy' | 'medium' | 'hard';
  className?: string;
  blurIntensity?: string;
  size?: number;
}

export function LogoRevealCard({
  icon: IconComponent,
  revealed,
  difficulty = 'medium',
  className,
  blurIntensity = 'blur-[4px]',
  size = 160
}: LogoRevealCardProps) {
  // Determine blur intensity based on difficulty
  const getBlurIntensity = () => {
    switch(difficulty) {
      case 'easy':
        return 'blur-[2px]';
      case 'hard':
        return 'blur-[8px]';
      default:
        return blurIntensity;
    }
  };

  return (
    <Card
      className={cn(
        "w-full h-64 flex items-center justify-center p-8 bg-gradient-to-br from-[#111827] to-[#1F2937] border-[#3B82F6] overflow-hidden shadow-xl rounded-2xl",
        className
      )}
    >
      <CardContent className="flex items-center justify-center w-full h-full p-0">
        <motion.div
          className={`flex items-center justify-center ${revealed ? '' : getBlurIntensity()}`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <IconComponent size={size} className="text-white" />
        </motion.div>
      </CardContent>
    </Card>
  );
}