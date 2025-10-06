import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowUpRight, Shield } from 'lucide-react';
import { Writeup } from '../types';

interface WriteupCardProps {
  writeup: Writeup;
}

export const WriteupCard: React.FC<WriteupCardProps> = ({ writeup }) => {
  const getDifficultyStyles = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Medium':
        return 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Hard':
        return 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800';
      case 'Insane':
        return 'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-50 dark:bg-neutral-800 text-gray-700 dark:text-gray-400 border-gray-200 dark:border-neutral-700';
    }
  };

  return (
    <Link
      to={`/writeup/${writeup.slug}`}
      className="group block contrast-bg rounded-2xl border contrast-border hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 overflow-hidden hover:translate-y-[-2px]"
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase" style={{ letterSpacing: '0.08em' }}>
                {writeup.platform}
              </span>
            </div>
            <h3 className="text-lg font-semibold contrast-text group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.015em', lineHeight: '1.4' }}>
              {writeup.title}
            </h3>
          </div>
          <div className="ml-4 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-neutral-900 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-950/30 group-hover:scale-110 transition-all duration-200">
              <ArrowUpRight className="w-5 h-5 contrast-text-secondary group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="contrast-text-secondary text-sm mb-4 line-clamp-2" style={{ lineHeight: '1.65', letterSpacing: '-0.01em' }}>
          {writeup.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {writeup.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 contrast-text-secondary text-xs rounded-lg transition-colors duration-200 font-medium"
            >
              <Tag className="w-3 h-3" strokeWidth={2.5} />
              <span>{tag}</span>
            </span>
          ))}
          {writeup.tags.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-50 dark:bg-slate-900 contrast-text-tertiary text-xs rounded-lg font-medium">
              +{writeup.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t contrast-border">
          <div className="flex items-center space-x-1.5 text-xs contrast-text-tertiary font-medium">
            <Calendar className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>{writeup.date}</span>
          </div>

          <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getDifficultyStyles(writeup.difficulty)}`}>
            {writeup.difficulty}
          </span>
        </div>
      </div>
    </Link>
  );
};
