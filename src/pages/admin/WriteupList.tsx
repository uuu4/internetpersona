import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, CreditCard as Edit, Eye, EyeOff, Trash2, Search } from 'lucide-react';
import { useWriteups } from '../../hooks/useWriteups';

export const WriteupList: React.FC = () => {
  const { writeups, deleteWriteup } = useWriteups();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredWriteups = writeups.filter(w =>
    w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.platform.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteWriteup(id);
      } catch (error) {
        console.error('Error deleting writeup:', error);
        alert('Failed to delete writeup');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 contrast-bg min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold contrast-text mb-2">Manage Writeups</h1>
          <p className="contrast-text-secondary">View and manage all your writeups</p>
        </div>
        <Link
          to="/admin/writeups/new"
          className="inline-flex items-center space-x-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
          <span>New Writeup</span>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 contrast-text-tertiary" strokeWidth={2} />
          <input
            type="text"
            placeholder="Search writeups..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all duration-200"
          />
        </div>
      </div>

      <div className="contrast-bg rounded-2xl border contrast-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-neutral-900 border-b contrast-border">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold contrast-text uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-left text-xs font-bold contrast-text uppercase tracking-wider">Platform</th>
                <th className="px-6 py-4 text-left text-xs font-bold contrast-text uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-4 text-left text-xs font-bold contrast-text uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold contrast-text uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold contrast-text uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y contrast-border">
              {filteredWriteups.map((writeup) => (
                <tr key={writeup.id} className="hover:bg-gray-50 dark:hover:bg-neutral-900/50 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="font-medium contrast-text">{writeup.title}</div>
                    <div className="text-sm contrast-text-tertiary truncate max-w-xs">{writeup.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium contrast-text-secondary">{writeup.platform}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                      writeup.difficulty === 'Easy' ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' :
                      writeup.difficulty === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' :
                      writeup.difficulty === 'Hard' ? 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400' :
                      'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400'
                    }`}>
                      {writeup.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {writeup.published ? (
                        <>
                          <Eye className="w-4 h-4 text-emerald-600 dark:text-emerald-400" strokeWidth={2} />
                          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Published</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 contrast-text-tertiary" strokeWidth={2} />
                          <span className="text-sm font-medium contrast-text-tertiary">Draft</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm contrast-text-secondary">{writeup.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/admin/writeups/${writeup.id}/edit`}
                        className="p-2 hover:bg-sky-50 dark:hover:bg-sky-950/50 text-sky-600 dark:text-sky-400 rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" strokeWidth={2} />
                      </Link>
                      <button
                        onClick={() => handleDelete(writeup.id, writeup.title)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-950/50 text-red-600 dark:text-red-400 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" strokeWidth={2} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredWriteups.length === 0 && (
            <div className="text-center py-12">
              <p className="contrast-text-secondary">No writeups found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
