import React from 'react';
import { TriagePriority } from '../../types';
import { PRIORITY_CONFIG } from '../../data/mockData';
import { AlertCircle, AlertTriangle, Clock, CheckCircle2 } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TriagePriority;
  size?: 'sm' | 'md' | 'lg';
  showSubtext?: boolean;
  className?: string;
  pulsing?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({
  priority,
  size = 'md',
  showSubtext = false,
  className = '',
  pulsing = true
}) => {
  const config = PRIORITY_CONFIG[priority];

  const getIcon = () => {
    switch (priority) {
      case 'RED':
        return <AlertCircle className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'ORANGE':
        return <AlertTriangle className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'YELLOW':
        return <Clock className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
      case 'GREEN':
        return <CheckCircle2 className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />;
    }
  };

  const isHighUrgency = priority === 'RED' || priority === 'ORANGE';

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold gap-1 rounded-md',
    md: 'px-2.5 py-1 text-xs font-bold gap-1.5 rounded-lg',
    lg: 'px-3.5 py-1.5 text-sm font-bold gap-2 rounded-xl'
  };

  return (
    <div className={`inline-flex flex-col ${className}`}>
      <span
        className={`inline-flex items-center tracking-wide shadow-xs ${config.badgeBg} ${sizeClasses[size]} ${
          pulsing && isHighUrgency ? 'animate-pulse' : ''
        }`}
      >
        {getIcon()}
        <span>{priority} &bull; {config.name.toUpperCase()}</span>
      </span>
      {showSubtext && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-medium leading-tight">
          {config.subtext} &bull; Target: {config.targetResponseTime}
        </span>
      )}
    </div>
  );
};
