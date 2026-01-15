import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface TimerBarProps {
  timeLeft: number;
  totalTime: number;
  className?: string;
}

export function TimerBar({
  timeLeft,
  totalTime,
  className
}: TimerBarProps) {
  const progress = (timeLeft / totalTime) * 100;
  const isCritical = timeLeft <= totalTime * 0.2; // Red when less than 20% time remains

  return (
    <div className={cn("w-full", className)}>
      <Progress
        value={progress}
        className={`h-3 ${isCritical ? 'bg-red-900/50' : 'bg-[#1F2937]'} rounded-full overflow-hidden`}
        max={100}
      />
      <div className={`text-right text-sm mt-1 font-semibold ${isCritical ? 'text-red-400 animate-pulse' : 'text-[#E5E7EB]'}`}>
        {timeLeft}s
      </div>
    </div>
  );
}