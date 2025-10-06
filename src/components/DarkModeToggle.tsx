import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useDarkMode } from '../hooks/useDarkMode';

export const DarkModeToggle: React.FC = () => {
  const { isDark, toggle } = useDarkMode();

  return (
    <button
      onClick={toggle}
      className="relative inline-flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      aria-pressed={isDark}
      role="switch"
    >
      {/* Toggle Background */}
      <span className="sr-only">
        {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
      
      {/* Toggle Circle */}
      <span
        className={`absolute left-1 top-1 w-4 h-4 bg-white dark:bg-gray-200 rounded-full shadow-md transform transition-transform duration-300 ease-in-out flex items-center justify-center ${
          isDark ? 'translate-x-6' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className="w-2.5 h-2.5 text-gray-600" />
        ) : (
          <Sun className="w-2.5 h-2.5 text-yellow-500" />
        )}
      </span>
      
      {/* Background Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        <Sun className={`w-3 h-3 text-yellow-500 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
        <Moon className={`w-3 h-3 text-gray-300 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </button>
  );
};