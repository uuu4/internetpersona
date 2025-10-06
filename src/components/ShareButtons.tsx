import React from 'react';
import { Twitter, Linkedin, Link as LinkIcon, Share2 } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ title, url }) => {
  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareToTwitter}
        className="p-2 rounded-lg contrast-bg border contrast-border hover:border-amber-400 transition-colors"
        title="Share on Twitter"
      >
        <Twitter className="w-4 h-4 contrast-text-secondary" />
      </button>
      <button
        onClick={shareToLinkedIn}
        className="p-2 rounded-lg contrast-bg border contrast-border hover:border-amber-400 transition-colors"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4 contrast-text-secondary" />
      </button>
      <button
        onClick={copyLink}
        className="p-2 rounded-lg contrast-bg border contrast-border hover:border-amber-400 transition-colors"
        title="Copy link"
      >
        <LinkIcon className="w-4 h-4 contrast-text-secondary" />
      </button>
      {navigator.share && (
        <button
          onClick={shareNative}
          className="p-2 rounded-lg contrast-bg border contrast-border hover:border-amber-400 transition-colors"
          title="Share"
        >
          <Share2 className="w-4 h-4 contrast-text-secondary" />
        </button>
      )}
    </div>
  );
};
