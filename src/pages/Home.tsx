import React, { useState } from 'react';
import { WriteupCard } from '../components/WriteupCard';
import { useWriteups } from '../hooks/useWriteups';
import { TrendingUp, BookOpen, Target, Award, Box, Monitor, Flag, ListFilter as Filter, Sparkles, ChevronRight } from 'lucide-react';
import { TypingAnimation } from '../components/TypingAnimation';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { SkeletonCard, SkeletonStat } from '../components/SkeletonLoader';
import { FloatingShapes } from '../components/FloatingShapes';
import { ParticleBackground } from '../components/ParticleBackground';

export const Home: React.FC = () => {
  const { writeups, loading } = useWriteups();
  const publishedWriteups = writeups.filter(w => w.published);
  const recentWriteups = publishedWriteups.slice(0, 6);
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredWriteups = publishedWriteups.filter(w => {
    const platformMatch = selectedPlatform === 'all' || w.platform.toLowerCase() === selectedPlatform.toLowerCase();
    const difficultyMatch = selectedDifficulty === 'all' || w.difficulty === selectedDifficulty;
    return platformMatch && difficultyMatch;
  });

  const trendingWriteups = publishedWriteups.slice(0, 3);

  const platformCategories = [
    { id: 'tryhackme', name: 'TryHackMe', icon: Target, color: 'from-emerald-600 to-teal-700', count: publishedWriteups.filter(w => w.platform.toLowerCase() === 'tryhackme').length },
    { id: 'hackthebox', name: 'HackTheBox', icon: Box, color: 'from-green-600 to-emerald-700', count: publishedWriteups.filter(w => w.platform.toLowerCase() === 'hackthebox').length },
    { id: 'vulnhub', name: 'VulnHub', icon: Monitor, color: 'from-blue-600 to-indigo-700', count: publishedWriteups.filter(w => w.platform.toLowerCase() === 'vulnhub').length },
    { id: 'ctf', name: 'CTF', icon: Flag, color: 'from-amber-600 to-orange-700', count: publishedWriteups.filter(w => w.platform.toLowerCase() === 'ctf').length },
  ];

  const stats = [
    { label: 'Total Writeups', value: publishedWriteups.length.toString(), icon: BookOpen, color: 'from-blue-600 to-indigo-700' },
    { label: 'Platforms', value: '4', icon: Target, color: 'from-emerald-600 to-teal-700' },
    { label: 'Categories', value: platformCategories.filter(p => p.count > 0).length.toString(), icon: Award, color: 'from-amber-600 to-orange-700' },
    { label: 'This Month', value: publishedWriteups.filter(w => {
      const writeupDate = new Date(w.date);
      const now = new Date();
      return writeupDate.getMonth() === now.getMonth() && writeupDate.getFullYear() === now.getFullYear();
    }).length.toString(), icon: TrendingUp, color: 'from-rose-600 to-red-700' },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 contrast-bg">
        <div className="text-center mb-16">
          <div className="h-16 bg-gray-200 dark:bg-neutral-800 rounded-2xl w-2/3 mx-auto mb-6 animate-pulse"></div>
          <div className="h-6 bg-gray-200 dark:bg-neutral-800 rounded-xl w-1/2 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[1, 2, 3, 4].map(i => <SkeletonStat key={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="contrast-bg min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <FloatingShapes />
      <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-blue-500/5 blur-3xl -z-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="relative">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-full mb-8 animate-float backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" strokeWidth={2.5} />
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400 tracking-wide">Digital Identity Hub</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold contrast-text mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
              <TypingAnimation
                texts={[
                  'Digital Identity',
                  'Tech Insights',
                  'Cybersecurity',
                  'Technical Documentation'
                ]}
                typingSpeed={80}
                deletingSpeed={40}
                delayBetweenTexts={2500}
              />
            </h1>
            <p className="text-lg md:text-xl contrast-text-secondary max-w-3xl mx-auto" style={{ lineHeight: '1.7', letterSpacing: '-0.01em' }}>
              Explore digital identities, cybersecurity insights, and technical documentation. A comprehensive platform for tech enthusiasts and professionals.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="group contrast-bg rounded-2xl border contrast-border p-6 text-center transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-blue-300 dark:hover:border-blue-700 hover:scale-105 backdrop-blur-sm" style={{ transform: 'perspective(1000px)' }}>
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.color} mb-4 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 shadow-lg group-hover:shadow-2xl`} style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
                <stat.icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div className="text-4xl font-bold contrast-text mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
                <AnimatedCounter end={parseInt(stat.value)} duration={2000} />
              </div>
              <div className="text-xs contrast-text-tertiary font-semibold uppercase tracking-widest" style={{ letterSpacing: '0.08em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trending Writeups */}
        {trendingWriteups.length > 0 && (
          <div className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center shadow-lg">
                  <TrendingUp className="w-5 h-5 text-white" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-bold contrast-text" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Trending Writeups</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trendingWriteups.map((writeup, index) => (
                <div key={writeup.id} className="relative animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="absolute -top-3 -right-3 z-10 w-10 h-10 rounded-full bg-gradient-to-br from-rose-600 to-red-700 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {index + 1}
                  </div>
                  <WriteupCard writeup={writeup} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Platform Categories */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-orange-700 flex items-center justify-center shadow-lg">
              <Award className="w-5 h-5 text-white" strokeWidth={2.5} />
            </div>
            <h2 className="text-3xl font-bold contrast-text" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>Browse by Platform</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformCategories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setSelectedPlatform(category.id)}
                className="group text-left contrast-bg rounded-2xl border-2 contrast-border p-6 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg`}>
                  <category.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="text-xl font-semibold contrast-text mb-2" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.015em' }}>{category.name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-2xl font-bold text-sky-600 dark:text-sky-400">{category.count}</span>
                  <ChevronRight className="w-5 h-5 contrast-text-tertiary group-hover:translate-x-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200" strokeWidth={2} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 contrast-bg rounded-2xl border contrast-border p-6">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-5 h-5 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            <h3 className="text-lg font-semibold contrast-text" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>Filter Writeups</h3>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2.5 rounded-xl border contrast-border contrast-bg contrast-text focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 font-medium text-sm"
            >
              <option value="all">All Platforms</option>
              <option value="tryhackme">TryHackMe</option>
              <option value="hackthebox">HackTheBox</option>
              <option value="vulnhub">VulnHub</option>
              <option value="ctf">CTF</option>
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2.5 rounded-xl border contrast-border contrast-bg contrast-text focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 font-medium text-sm"
            >
              <option value="all">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Insane">Insane</option>
            </select>
            {(selectedPlatform !== 'all' || selectedDifficulty !== 'all') && (
              <button
                onClick={() => {
                  setSelectedPlatform('all');
                  setSelectedDifficulty('all');
                }}
                className="px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-neutral-800 contrast-text-secondary hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all duration-200 font-medium text-sm"
              >
                Clear Filters
              </button>
            )}
            <div className="flex items-center px-4 py-2.5 contrast-text-tertiary text-sm font-medium ml-auto">
              Showing <span className="font-bold contrast-text mx-1">{filteredWriteups.length}</span> of <span className="font-bold contrast-text mx-1">{publishedWriteups.length}</span> writeups
            </div>
          </div>
        </div>

        {/* Writeups Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold contrast-text" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {selectedPlatform !== 'all' || selectedDifficulty !== 'all' ? 'Filtered Results' : 'Latest Writeups'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(selectedPlatform === 'all' && selectedDifficulty === 'all' ? recentWriteups : filteredWriteups.slice(0, 9)).map((writeup, index) => (
              <div key={writeup.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                <WriteupCard writeup={writeup} />
              </div>
            ))}
          </div>
          {filteredWriteups.length === 0 && (
            <div className="text-center py-20 contrast-bg rounded-2xl border contrast-border">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 contrast-text-tertiary" strokeWidth={2} />
              </div>
              <p className="text-lg contrast-text font-semibold mb-2">No writeups found</p>
              <p className="contrast-text-secondary">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
