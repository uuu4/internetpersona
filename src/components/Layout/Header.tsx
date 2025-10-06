import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, User, Github, Twitter, LogOut, Shield } from 'lucide-react';
import { DarkModeToggle } from '../DarkModeToggle';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
    setShowUserMenu(false);
  };

  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <header className="contrast-bg border-b contrast-border px-6 py-4 transition-colors duration-300 backdrop-blur-md bg-white/90 dark:bg-black/90 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center justify-between max-w-[2000px] mx-auto">
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-xl transition-all duration-200 contrast-text-secondary hover:contrast-text group"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.5} />
          </button>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 contrast-text-tertiary transition-colors duration-200 group-focus-within:text-blue-500" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search writeups..."
              className="pl-10 pr-4 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-80 transition-all duration-200 text-sm placeholder:contrast-text-tertiary hover:border-slate-300 dark:hover:border-slate-700 font-medium"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <DarkModeToggle />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 contrast-text-secondary hover:contrast-text hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-xl transition-all duration-200 group"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.5} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 contrast-text-secondary hover:contrast-text hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-xl transition-all duration-200 group"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" strokeWidth={2.5} />
          </a>
          {user && (
            <div className="relative ml-2">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
              >
                <User className="w-4 h-4 text-white" strokeWidth={2.5} />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                    <p className="text-sm font-medium contrast-text truncate">{user.email}</p>
                    <p className="text-xs contrast-text-secondary mt-1">Admin Account</p>
                  </div>

                  {!isAdminPage && (
                    <button
                      onClick={() => {
                        navigate('/admin');
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm contrast-text hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Admin Dashboard
                    </button>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
