import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Heart } from 'lucide-react';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { useWriteups } from '../hooks/useWriteups';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ReadingProgressBar } from '../components/ProgressBar';
import { TableOfContents } from '../components/TableOfContents';
import { ShareButtons } from '../components/ShareButtons';
import { Badge } from '../components/BadgeSystem';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { WriteupCard } from '../components/WriteupCard';

export const WriteupDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { writeups, loading } = useWriteups();
  const writeup = writeups.find(w => w.slug === slug && w.published);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToRecent } = useRecentlyViewed();

  const relatedWriteups = writeup
    ? writeups
        .filter(
          (w) =>
            w.published &&
            w.id !== writeup.id &&
            (w.category === writeup.category || w.difficulty === writeup.difficulty)
        )
        .slice(0, 3)
    : [];

  useEffect(() => {
    if (writeup) {
      addToRecent(writeup.id);
    }
  }, [writeup, addToRecent]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center contrast-bg">
        <p className="contrast-text-secondary">loading writeup...</p>
      </div>
    );
  }

  if (!writeup) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16 text-center contrast-bg">
        <h1 className="text-4xl font-bold contrast-text mb-4">writeup not found</h1>
        <p className="contrast-text-secondary mb-8">the writeup you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>back to home</span>
        </Link>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Hard': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Insane': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <ReadingProgressBar />
      <div className="max-w-7xl mx-auto px-6 py-8 contrast-bg">
        <div className="flex gap-8">
          <div className="flex-1 max-w-4xl">
            <Breadcrumbs
              items={[
                { label: 'Writeups', path: '/' },
                { label: writeup?.category || 'Loading...', path: '/' },
                { label: writeup?.title || 'Loading...' },
              ]}
            />

            <div className="contrast-bg rounded-xl border contrast-border p-8 shadow-lg mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-4xl font-bold contrast-text">
                      {writeup.title}
                    </h1>
                    <Badge type="new" size="sm" />
                  </div>
                  <p className="text-xl contrast-text-secondary leading-relaxed">
                    {writeup.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleFavorite(writeup.id)}
                    className={`p-2 rounded-lg border contrast-border transition-all ${
                      isFavorite(writeup.id)
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border-red-300 dark:border-red-800'
                        : 'contrast-bg hover:border-amber-400'
                    }`}
                    title={isFavorite(writeup.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={isFavorite(writeup.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm contrast-text-secondary mb-6">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{writeup.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{writeup.platform}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(writeup.difficulty)}`}>
                  {writeup.difficulty}
                </span>
              </div>

              <div className="mb-6">
                <ShareButtons title={writeup.title} url={currentUrl} />
              </div>

              <div className="flex flex-wrap gap-2">
                {writeup.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 contrast-text text-sm rounded-lg"
                  >
                    <Tag className="w-3 h-3" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="contrast-bg rounded-xl border contrast-border p-8 shadow-lg">
              <MarkdownRenderer content={writeup.content} />
            </div>

            {/* Related Writeups */}
            {relatedWriteups.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold contrast-text mb-6">Related Writeups</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedWriteups.map((related) => (
                    <WriteupCard key={related.id} writeup={related} />
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-8 text-center">
              <Link
                to="/"
                className="inline-flex items-center space-x-2 bg-amber-700 text-white px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors shadow-md"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>back to all writeups</span>
              </Link>
            </div>
          </div>

          <TableOfContents content={writeup.content} />
        </div>
      </div>
    </>
  );
};