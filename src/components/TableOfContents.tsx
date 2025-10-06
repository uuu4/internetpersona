import React, { useState, useEffect } from 'react';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

export const TableOfContents: React.FC<{ content: string }> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const extractedHeadings: Heading[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = `heading-${index}`;
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    const elements = document.querySelectorAll('h1, h2, h3');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="hidden xl:block sticky top-24 w-64 ml-8">
      <div className="contrast-bg rounded-xl border contrast-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          <h3 className="font-bold contrast-text">Contents</h3>
        </div>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-sm transition-colors ${
                activeId === heading.id
                  ? 'text-amber-700 dark:text-amber-400 font-medium'
                  : 'contrast-text-secondary hover:contrast-text'
              }`}
              style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
};
