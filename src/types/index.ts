export interface Writeup {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Insane';
  platform: string;
  date: string;
  tags: string[];
  content: string;
  published: boolean;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  writeups: Writeup[];
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}