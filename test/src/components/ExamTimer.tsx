import React, { useEffect } from 'react';
import { Timer } from 'lucide-react';

interface ExamTimerProps {
  timeRemaining: number;
  onTimeEnd: () => void;
  onTick: (newTime: number) => void;
}

export function ExamTimer({ timeRemaining, onTimeEnd, onTick }: ExamTimerProps) {
  useEffect(() => {
    if (timeRemaining <= 0) {
      onTimeEnd();
      return;
    }

    const timer = setInterval(() => {
      onTick(timeRemaining - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeEnd, onTick]);

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <div className="fixed top-4 right-4 bg-white rounded-lg shadow-md p-4 flex items-center gap-2">
      <Timer className="w-5 h-5 text-blue-600" />
      <span className="font-mono text-xl">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </span>
    </div>
  );
}