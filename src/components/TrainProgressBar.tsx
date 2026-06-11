import React from 'react';
import { Train } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrainProgressBarProps {
  progress: number; // 0 to 100
  className?: string;
}

export const TrainProgressBar: React.FC<TrainProgressBarProps> = ({ progress, className = '' }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className={`relative w-full pt-6 pb-2 select-none ${className}`}>
      {/* Track Background */}
      <div className="relative h-3 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-visible">
        {/* Railway ties (wooden sleepers) */}
        <div 
          className="absolute inset-0 w-full h-full flex justify-between px-1 pointer-events-none opacity-30 dark:opacity-50"
          style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 12px, var(--border) 12px, var(--border) 15px)' }}
        />
        
        {/* Track Rails (metal lines) */}
        <div className="absolute top-1/4 left-0 right-0 h-[2px] bg-slate-400 dark:bg-slate-500" />
        <div className="absolute bottom-1/4 left-0 right-0 h-[2px] bg-slate-400 dark:bg-slate-500" />
        
        {/* Completed Journey Rail Highlight */}
        <div 
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full opacity-80"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      
      {/* Moving Train */}
      <motion.div 
        className="absolute top-0 -mt-2.5 flex flex-col items-center"
        animate={{ left: `${clampedProgress}%` }}
        transition={{ type: 'spring', stiffness: 60, damping: 15 }}
        style={{ transform: 'translateX(-50%)' }}
      >
        <div className="relative flex items-center justify-center bg-accent text-white p-1 rounded-full shadow-lg border border-white dark:border-slate-800 animate-bounce" style={{ animationDuration: '2s' }}>
          <Train className="w-4 h-4" />
          {/* Steam puff effect */}
          <div className="absolute -top-1 right-0 w-1.5 h-1.5 bg-slate-300 dark:bg-slate-500 rounded-full animate-ping opacity-75" />
        </div>
        <span className="text-[10px] font-bold mt-1 text-accent font-mono">{Math.round(clampedProgress)}%</span>
      </motion.div>
    </div>
  );
};
export default TrainProgressBar;
