import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Writeup } from '../types';
import { mockWriteups } from '../data/mockData';

export const useWriteups = () => {
  const [writeups, setWriteups] = useState<Writeup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usingMockData, setUsingMockData] = useState(false);

  const fetchWriteups = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('writeups')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Check for RLS policy violations or table not found errors
        if (error.code === 'PGRST205' || error.code === '42501' || 
            error.message?.includes('Could not find the table') ||
            error.message?.includes('row-level security policy')) {
          console.warn('Database access blocked, using mock data:', error.message);
          setUsingMockData(true);
          setWriteups(mockWriteups);
          setError(null);
          setLoading(false);
          return;
        }
        throw error;
      }

      const formattedWriteups: Writeup[] = (data || []).map(item => ({
        id: item.id,
        title: item.title,
        description: item.description || '',
        category: item.category,
        difficulty: item.difficulty,
        platform: item.platform,
        date: item.date,
        tags: item.tags || [],
        content: item.content,
        published: item.published,
        slug: item.slug
      }));

      setWriteups(formattedWriteups);
      setUsingMockData(false);
    } catch (err) {
      console.warn('Database error, falling back to mock data:', err);
      setWriteups(mockWriteups);
      setUsingMockData(true);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const createWriteup = async (writeupData: Omit<Writeup, 'id'>) => {
    // If already using mock data, skip Supabase call entirely
    if (usingMockData) {
      const newWriteup: Writeup = {
        id: Date.now().toString(),
        ...writeupData
      };
      setWriteups(prev => [newWriteup, ...prev]);
      return newWriteup;
    }

    try {
      const { data, error } = await supabase
        .from('writeups')
        .insert([{
          title: writeupData.title,
          description: writeupData.description,
          category: writeupData.category,
          difficulty: writeupData.difficulty,
          platform: writeupData.platform,
          date: writeupData.date,
          tags: writeupData.tags,
          content: writeupData.content,
          published: writeupData.published,
          slug: writeupData.slug
        }])
        .select()
        .single();

      if (error) {
        // Check for RLS policy violations
        if (error.code === '42501' || error.message?.includes('row-level security policy')) {
          console.warn('RLS policy violation during create, switching to mock data:', error.message);
          setUsingMockData(true);
          const newWriteup: Writeup = {
            id: Date.now().toString(),
            ...writeupData
          };
          setWriteups(prev => [newWriteup, ...prev]);
          return newWriteup;
        }
        throw error;
      }

      const newWriteup: Writeup = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        category: data.category,
        difficulty: data.difficulty,
        platform: data.platform,
        date: data.date,
        tags: data.tags || [],
        content: data.content,
        published: data.published,
        slug: data.slug
      };

      setWriteups(prev => [newWriteup, ...prev]);
      return newWriteup;
    } catch (err) {
      // Check for RLS policy violations in catch block
      const error = err as any;
      if (error?.code === '42501' || error?.message?.includes('row-level security policy')) {
        console.warn('RLS policy violation during create (catch block), switching to mock data:', error.message);
        setUsingMockData(true);
        const newWriteup: Writeup = {
          id: Date.now().toString(),
          ...writeupData
        };
        setWriteups(prev => [newWriteup, ...prev]);
        return newWriteup;
      }
      // Re-throw non-RLS errors to be handled by the UI
      throw err;
    }
  };

  const updateWriteup = async (id: string, writeupData: Partial<Writeup>) => {
    // If already using mock data, skip Supabase call entirely
    if (usingMockData) {
      const updatedWriteup: Writeup = {
        id,
        title: writeupData.title || '',
        description: writeupData.description || '',
        category: writeupData.category || 'tryhackme',
        difficulty: writeupData.difficulty || 'Medium',
        platform: writeupData.platform || 'tryhackme',
        date: writeupData.date || new Date().toISOString().split('T')[0],
        tags: writeupData.tags || [],
        content: writeupData.content || '',
        published: writeupData.published || false,
        slug: writeupData.slug || ''
      };
      setWriteups(prev => prev.map(w => w.id === id ? updatedWriteup : w));
      return updatedWriteup;
    }

    try {
      const { data, error } = await supabase
        .from('writeups')
        .update({
          title: writeupData.title,
          description: writeupData.description,
          category: writeupData.category,
          difficulty: writeupData.difficulty,
          platform: writeupData.platform,
          date: writeupData.date,
          tags: writeupData.tags,
          content: writeupData.content,
          published: writeupData.published,
          slug: writeupData.slug,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

       if (error) {
         // Check for RLS policy violations
         if (error.code === '42501' || error.message?.includes('row-level security policy')) {
           console.warn('RLS policy violation during update, switching to mock data:', error.message);
           setUsingMockData(true);
           const updatedWriteup: Writeup = {
             id,
             title: writeupData.title || '',
             description: writeupData.description || '',
             category: writeupData.category || 'tryhackme',
             difficulty: writeupData.difficulty || 'Medium',
             platform: writeupData.platform || 'tryhackme',
             date: writeupData.date || new Date().toISOString().split('T')[0],
             tags: writeupData.tags || [],
             content: writeupData.content || '',
             published: writeupData.published || false,
             slug: writeupData.slug || ''
           };
           setWriteups(prev => prev.map(w => w.id === id ? updatedWriteup : w));
           return updatedWriteup;
         }
         throw error;
       }

      const updatedWriteup: Writeup = {
        id: data.id,
        title: data.title,
        description: data.description || '',
        category: data.category,
        difficulty: data.difficulty,
        platform: data.platform,
        date: data.date,
        tags: data.tags || [],
        content: data.content,
        published: data.published,
        slug: data.slug
      };

      setWriteups(prev => prev.map(w => w.id === id ? updatedWriteup : w));
      return updatedWriteup;
    } catch (err) {
       // Check for RLS policy violations in catch block
       const error = err as any;
       if (error?.code === '42501' || error?.message?.includes('row-level security policy')) {
         console.warn('RLS policy violation during update (catch block), switching to mock data:', error.message);
         setUsingMockData(true);
         const updatedWriteup: Writeup = {
           id,
           title: writeupData.title || '',
           description: writeupData.description || '',
           category: writeupData.category || 'tryhackme',
           difficulty: writeupData.difficulty || 'Medium',
           platform: writeupData.platform || 'tryhackme',
           date: writeupData.date || new Date().toISOString().split('T')[0],
           tags: writeupData.tags || [],
           content: writeupData.content || '',
           published: writeupData.published || false,
           slug: writeupData.slug || ''
         };
         setWriteups(prev => prev.map(w => w.id === id ? updatedWriteup : w));
         return updatedWriteup;
       }
       // Re-throw non-RLS errors to be handled by the UI
       throw err;
    }
  };

  const deleteWriteup = async (id: string) => {
    // If already using mock data, skip Supabase call entirely
    if (usingMockData) {
      setWriteups(prev => prev.filter(w => w.id !== id));
      return;
    }

    try {
      const { error } = await supabase
        .from('writeups')
        .delete()
        .eq('id', id);

       if (error) {
         // Check for RLS policy violations
         if (error.code === '42501' || error.message?.includes('row-level security policy')) {
           console.warn('RLS policy violation during delete, switching to mock data:', error.message);
           setUsingMockData(true);
           setWriteups(prev => prev.filter(w => w.id !== id));
           return;
         }
         throw error;
       }

      setWriteups(prev => prev.filter(w => w.id !== id));
    } catch (err) {
       // Check for RLS policy violations in catch block
       const error = err as any;
       if (error?.code === '42501' || error?.message?.includes('row-level security policy')) {
         console.warn('RLS policy violation during delete (catch block), switching to mock data:', error.message);
         setUsingMockData(true);
         setWriteups(prev => prev.filter(w => w.id !== id));
         return;
       }
       // Re-throw non-RLS errors to be handled by the UI
       throw err;
    }
  };

  useEffect(() => {
    fetchWriteups();
  }, []);

  return {
    writeups,
    loading,
    error,
    usingMockData,
    createWriteup,
    updateWriteup,
    deleteWriteup,
    refetch: fetchWriteups
  };
};