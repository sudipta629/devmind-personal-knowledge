import { MOCK_ARTICLES, MOCK_AUTHOR, MOCK_CATEGORIES, MOCK_TAGS } from './mockData';
import type { Article, Author, Category, Tag } from '@/types';
import fs from 'fs';
import path from 'path';

// Since this is just for development/mocking, we can use a temporary JSON file 
// or global variables to persist across hot reloads.
const DB_FILE = path.join(process.cwd(), '.mock-db.json');

interface Database {
  articles: Article[];
  authors: Record<string, Author>;
  categories: Category[];
  tags: Tag[];
  follows: Record<string, string[]>;
  bookmarks: Record<string, string[]>;
  likes: Record<string, string[]>;
  comments: any[];
}

const initialDb: Database = {
  articles: MOCK_ARTICLES,
  authors: { 'sudipto': MOCK_AUTHOR },
  categories: MOCK_CATEGORIES,
  tags: MOCK_TAGS,
  follows: {},
  bookmarks: {},
  likes: {},
  comments: []
};

export function getDb(): Database {
  if (fs.existsSync(DB_FILE)) {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      return initialDb;
    }
  }
  return initialDb;
}

export function saveDb(db: Database) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// Ensure the file exists on first run
if (!fs.existsSync(DB_FILE)) {
  saveDb(initialDb);
}
