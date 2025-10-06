import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, TrendingUp, Eye, Users, Calendar } from 'lucide-react';
import { useWriteups } from '../../hooks/useWriteups';

export const AdminDashboard: React.FC = () => {
  const { writeups } = useWriteups();
  const publishedWriteups = writeups.filter(w => w.published);
  const draftWriteups = writeups.filter(w => !w.published);

  const stats = [
    { label: 'Total Writeups', value: writeups.length, icon: FileText, color: 'from-sky-500 to-blue-600' },
    { label: 'Published', value: publishedWriteups.length, icon: Eye, color: 'from-emerald-500 to-teal-600' },
    { label: 'Drafts', value: draftWriteups.length, icon: TrendingUp, color: 'from-orange-500 to-red-600' },
    { label: 'This Month', value: writeups.filter(w => {
      const writeupDate = new Date(w.date);
      const now = new Date();
      return writeupDate.getMonth() === now.getMonth() && writeupDate.getFullYear() === now.getFullYear();
    }).length, icon: Calendar, color: 'from-purple-500 to-pink-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 contrast-bg min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold contrast-text mb-2">Admin Dashboard</h1>
        <p className="contrast-text-secondary">Manage your writeups and content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="contrast-bg rounded-2xl border contrast-border p-6">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} mb-4 shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" strokeWidth={2} />
            </div>
            <div className="text-3xl font-bold contrast-text mb-1">{stat.value}</div>
            <div className="text-sm contrast-text-secondary font-medium">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="contrast-bg rounded-2xl border contrast-border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold contrast-text">Quick Actions</h2>
          </div>
          <div className="space-y-3">
            <Link
              to="/admin/writeups/new"
              className="flex items-center justify-between p-4 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 hover:bg-sky-100 dark:hover:bg-sky-950 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 dark:bg-sky-900/50 flex items-center justify-center">
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-semibold">Create New Writeup</div>
                  <div className="text-sm opacity-80">Start a new security writeup</div>
                </div>
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-200">→</div>
            </Link>
            <Link
              to="/admin/writeups"
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-neutral-900 contrast-text hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all duration-200 group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-neutral-800 flex items-center justify-center">
                  <FileText className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-semibold">Manage Writeups</div>
                  <div className="text-sm opacity-70">View and edit all writeups</div>
                </div>
              </div>
              <div className="group-hover:translate-x-1 transition-transform duration-200">→</div>
            </Link>
          </div>
        </div>

        <div className="contrast-bg rounded-2xl border contrast-border p-6">
          <h2 className="text-xl font-bold contrast-text mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {writeups.slice(0, 5).map((writeup) => (
              <div key={writeup.id} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium contrast-text text-sm truncate">{writeup.title}</div>
                  <div className="text-xs contrast-text-tertiary">{writeup.date}</div>
                </div>
                <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                  writeup.published
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                    : 'bg-gray-100 dark:bg-neutral-800 contrast-text-secondary'
                }`}>
                  {writeup.published ? 'Published' : 'Draft'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
