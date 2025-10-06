import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { useWriteups } from '../../hooks/useWriteups';
import { Writeup } from '../../types';

export const WriteupEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { writeups, createWriteup, updateWriteup, deleteWriteup } = useWriteups();

  const isNew = !id || id === 'new';
  const existingWriteup = isNew ? null : writeups.find(w => w.id === id);

  const [formData, setFormData] = useState<Partial<Writeup>>({
    title: existingWriteup?.title || '',
    description: existingWriteup?.description || '',
    category: existingWriteup?.category || 'tryhackme',
    difficulty: existingWriteup?.difficulty || 'Medium',
    platform: existingWriteup?.platform || 'tryhackme',
    tags: existingWriteup?.tags || [],
    content: existingWriteup?.content || '# New Writeup\n\nStart writing your writeup here...',
    published: existingWriteup?.published || false,
    slug: existingWriteup?.slug || '',
  });

  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);

  const handleInputChange = (field: keyof Writeup, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    if (field === 'title') {
      const slug = value.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags?.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in title and content');
      return;
    }

    try {
      setSaving(true);

      const writeupData = {
        title: formData.title!,
        description: formData.description || '',
        category: formData.category || 'tryhackme',
        difficulty: formData.difficulty || 'Medium',
        platform: formData.platform || 'tryhackme',
        date: formData.date || new Date().toISOString().split('T')[0],
        tags: formData.tags || [],
        content: formData.content!,
        published: formData.published || false,
        slug: formData.slug || '',
      };

      if (isNew) {
        await createWriteup(writeupData);
      } else if (existingWriteup) {
        await updateWriteup(existingWriteup.id, writeupData);
      }

      navigate('/admin/writeups');
    } catch (error) {
      console.error('Error saving writeup:', error);
      alert(error instanceof Error ? error.message : 'Failed to save writeup. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!existingWriteup) return;

    if (confirm('Are you sure you want to delete this writeup?')) {
      try {
        await deleteWriteup(existingWriteup.id);
        navigate('/admin/writeups');
      } catch (error) {
        console.error('Error deleting writeup:', error);
        alert(error instanceof Error ? error.message : 'Failed to delete writeup. Please try again.');
      }
    }
  };

  React.useEffect(() => {
    if (existingWriteup && !isNew) {
      setFormData({
        title: existingWriteup.title,
        description: existingWriteup.description,
        category: existingWriteup.category,
        difficulty: existingWriteup.difficulty,
        platform: existingWriteup.platform,
        date: existingWriteup.date,
        tags: existingWriteup.tags,
        content: existingWriteup.content,
        published: existingWriteup.published,
        slug: existingWriteup.slug,
      });
    }
  }, [existingWriteup, isNew]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 contrast-bg min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link
            to="/admin/writeups"
            className="inline-flex items-center space-x-2 contrast-text-secondary hover:contrast-text transition-colors"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            <span>Back to writeups</span>
          </Link>
          <h1 className="text-3xl font-bold contrast-text">
            {isNew ? 'New Writeup' : 'Edit Writeup'}
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          {!isNew && (
            <button
              onClick={handleDelete}
              className="inline-flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" strokeWidth={2} />
              <span>Delete</span>
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center space-x-2 bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition-colors shadow-lg disabled:opacity-50"
          >
            <Save className="w-4 h-4" strokeWidth={2} />
            <span>{saving ? 'Saving...' : 'Save'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="contrast-bg rounded-2xl border contrast-border p-6">
            <h2 className="text-lg font-bold contrast-text mb-4">Writeup Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium contrast-text-secondary mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="Enter writeup title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium contrast-text-secondary mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="Brief description of the writeup"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium contrast-text-secondary mb-2">
                    Platform
                  </label>
                  <select
                    value={formData.platform}
                    onChange={(e) => handleInputChange('platform', e.target.value)}
                    className="w-full px-3 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  >
                    <option value="tryhackme">TryHackMe</option>
                    <option value="hackthebox">HackTheBox</option>
                    <option value="vulnhub">VulnHub</option>
                    <option value="ctf">CTF</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium contrast-text-secondary mb-2">
                    Difficulty
                  </label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                    className="w-full px-3 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                    <option value="Insane">Insane</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium contrast-text-secondary mb-2">
                  Tags
                </label>
                <div className="flex space-x-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    className="flex-1 px-3 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                    placeholder="Add a tag"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-sky-600 text-white rounded-xl hover:bg-sky-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-neutral-800 contrast-text text-sm rounded-lg"
                    >
                      <span>{tag}</span>
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium contrast-text-secondary mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none"
                  placeholder="url-friendly-slug"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => handleInputChange('published', e.target.checked)}
                  className="w-4 h-4 text-sky-600 border-gray-300 rounded focus:ring-sky-500"
                />
                <label htmlFor="published" className="ml-2 text-sm contrast-text-secondary">
                  Published
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="contrast-bg rounded-2xl border contrast-border overflow-hidden">
            <div className="border-b contrast-border">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'edit'
                      ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border-b-2 border-sky-600'
                      : 'contrast-text-secondary hover:contrast-text'
                  }`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-6 py-3 font-medium ${
                    activeTab === 'preview'
                      ? 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border-b-2 border-sky-600'
                      : 'contrast-text-secondary hover:contrast-text'
                  }`}
                >
                  Preview
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'edit' ? (
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={30}
                  className="w-full px-4 py-3 border contrast-border contrast-bg contrast-text rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none font-mono text-sm"
                  placeholder="Write your markdown content here..."
                />
              ) : (
                <div className="min-h-[600px]">
                  <MarkdownRenderer content={formData.content || ''} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
