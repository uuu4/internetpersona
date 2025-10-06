import { useState, useEffect, useCallback } from 'react';
import { Writeup } from '../types';

const RECENT_KEY = 'writeup-recent';
const MAX_RECENT = 10;

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    const stored = localStorage.getItem(RECENT_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
  }, [recentIds]);

  const addToRecent = useCallback((id: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [id, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecentIds([]);
  }, []);

  const getRecentWriteups = (allWriteups: Writeup[]): Writeup[] => {
    return recentIds
      .map((id) => allWriteups.find((w) => w.id === id))
      .filter((w): w is Writeup => w !== undefined);
  };

  return {
    recentIds,
    addToRecent,
    clearRecent,
    getRecentWriteups,
  };
};
