import React from 'react';
import { Clock, CircleCheck as CheckCircle, Flame, Star } from 'lucide-react';

export type BadgeType = 'new' | 'completed' | 'trending' | 'featured';

interface BadgeProps {
  type: BadgeType;
  size?: 'sm' | 'md' | 'lg';
}

export const Badge: React.FC<BadgeProps> = ({ type, size = 'md' }) => {
  const configs = {
    new: {
      icon: Clock,
      label: 'New',
      colors: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    },
    completed: {
      icon: CheckCircle,
      label: 'Completed',
      colors: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    },
    trending: {
      icon: Flame,
      label: 'Trending',
      colors: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    },
    featured: {
      icon: Star,
      label: 'Featured',
      colors: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    },
  };

  const config = configs[type];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${config.colors} ${sizeClasses[size]}`}
    >
      <Icon className={iconSizes[size]} />
      {config.label}
    </span>
  );
};
