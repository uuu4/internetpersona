import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Hop as Home, FileText, Target, Box, Monitor, Flag, ChevronRight } from 'lucide-react';
import { Category } from '../../types';

interface SidebarProps {
  categories: Category[];
  isCollapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ categories, isCollapsed }) => {
  const location = useLocation();
  const [expandedCategories, setExpandedCategories] = React.useState<string[]>(['1']);

  const getIconComponent = (iconName: string) => {
    const icons = {
      Target,
      Box,
      Monitor,
      Flag
    };
    return icons[iconName as keyof typeof icons] || FileText;
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`sidebar-transition bg-white dark:bg-black border-r transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-72'
    } flex flex-col h-screen sticky top-0 contrast-bg contrast-border will-change-[width] transform-gpu`}>
      {/* Header */}
      <div className={`border-b contrast-border transition-all duration-300 ease-in-out ${isCollapsed ? 'p-3' : 'p-6'}`}>
        <div className={`flex items-center transition-all duration-300 ease-in-out ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md flex-shrink-0">
            <Book className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out will-change-[width,opacity] ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <h1 className="text-lg font-bold contrast-text whitespace-nowrap" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>internetpersona</h1>
            <p className="text-xs contrast-text-secondary font-medium whitespace-nowrap">digital insights</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {/* Home */}
        <Link
          to="/"
          className={`group flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-3 py-2.5 rounded-xl transition-all duration-200 ${
            isActive('/')
              ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
              : 'contrast-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900 hover:contrast-text'
          }`}
        >
          <Home className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${isActive('/') ? '' : 'group-hover:scale-110'}`} strokeWidth={2.5} />
          <span className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out will-change-[width,opacity] ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>Home</span>
        </Link>

        {/* Categories */}
        <div className="space-y-1 pt-2">
          <div className={`px-3 py-1.5 ${isCollapsed ? 'hidden' : ''}`}>
            <h3 className="text-xs font-bold contrast-text-tertiary uppercase" style={{ letterSpacing: '0.08em' }}>Categories</h3>
          </div>
          {categories.map((category) => (
            <div key={category.id}>
              <button
                onClick={() => toggleCategory(category.id)}
                className={`group w-full flex items-center justify-between px-3 py-2.5 text-left contrast-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-all duration-200 ${isCollapsed ? 'justify-center' : ''}`}
              >
                <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
                  {React.createElement(getIconComponent(category.icon), {
                    className: "w-5 h-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                    strokeWidth: 2.5
                  })}
                  <span className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out will-change-[width,opacity] ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>{category.name}</span>
                </div>
                <div className={`flex items-center space-x-2 overflow-hidden transition-all duration-300 ease-in-out will-change-[width,opacity] ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
                  <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 contrast-text-secondary px-2 py-0.5 rounded-md transition-colors duration-200 whitespace-nowrap">
                    {category.writeups.length}
                  </span>
                  <ChevronRight
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                      expandedCategories.includes(category.id) ? 'rotate-90' : ''
                    }`}
                    strokeWidth={2}
                  />
                </div>
              </button>

              {!isCollapsed && expandedCategories.includes(category.id) && (
                <div className="ml-8 mt-1 space-y-0.5 animate-fade-in">
                  {category.writeups.map((writeup) => (
                    <Link
                      key={writeup.id}
                      to={`/writeup/${writeup.slug}`}
                      className={`group block px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                        isActive(`/writeup/${writeup.slug}`)
                          ? 'bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                          : 'contrast-text-secondary hover:bg-slate-50 dark:hover:bg-slate-900 hover:contrast-text'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="truncate font-medium group-hover:translate-x-0.5 transition-transform duration-200">{writeup.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-md font-semibold whitespace-nowrap ml-2 ${
                          writeup.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400' :
                          writeup.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400' :
                          writeup.difficulty === 'Hard' ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-700 dark:text-orange-400' :
                          'bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-400'
                        }`}>
                          {writeup.difficulty}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </nav>
    </div>
  );
};
