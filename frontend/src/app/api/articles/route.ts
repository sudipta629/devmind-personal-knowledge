import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';
import type { Article } from '@/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  const authorId = searchParams.get('authorId');
  const status = searchParams.get('status');
  
  const db = getDb();
  let articles = db.articles;

  if (status) articles = articles.filter(a => a.status === status);
  if (category) articles = articles.filter(a => a.categorySlug === category);
  if (tag) articles = articles.filter(a => a.tags.includes(tag));
  if (authorId) articles = articles.filter(a => a.author.id === authorId);

  // Sort by publishedAt desc
  articles = articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const db = getDb();
    
    const slug = data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'untitled';
    
    const newArticle: Article = {
      id: data.id || Math.random().toString(36).substr(2, 9),
      slug: slug + '-' + Math.random().toString(36).substr(2, 5),
      title: data.title || 'Untitled',
      description: data.description || '',
      content: data.content || '',
      thumbnail: data.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
      category: data.category || 'Uncategorized',
      categorySlug: (data.category || 'Uncategorized').toLowerCase().replace(/\s+/g, '-'),
      tags: data.tags || [],
      author: data.author || { id: '1', name: 'Unknown', avatar: '', bio: '' },
      publishedAt: new Date().toISOString(),
      readingTime: Math.max(1, Math.ceil((data.content?.split(' ').length || 0) / 200)),
      featured: false,
      views: 0,
      status: data.status || 'PUBLISHED'
    };

    if (data.id) {
      const index = db.articles.findIndex(a => a.id === data.id);
      if (index !== -1) {
        db.articles[index] = { 
          ...db.articles[index], 
          ...newArticle, 
          slug: db.articles[index].slug, 
          publishedAt: db.articles[index].publishedAt, 
          updatedAt: new Date().toISOString() 
        };
        saveDb(db);
        return NextResponse.json(db.articles[index]);
      }
    }

    db.articles.unshift(newArticle);
    
    // Update categories/tags count if published
    if (newArticle.status === 'PUBLISHED') {
      const catIndex = db.categories.findIndex(c => c.slug === newArticle.categorySlug);
      if (catIndex !== -1) {
        db.categories[catIndex].articleCount++;
      } else {
        db.categories.push({
          id: Math.random().toString(36),
          slug: newArticle.categorySlug,
          name: newArticle.category,
          description: '',
          icon: '📝',
          color: 'blue',
          articleCount: 1
        });
      }
      
      newArticle.tags.forEach(tag => {
        const tIndex = db.tags.findIndex(t => t.name === tag);
        if (tIndex !== -1) {
          db.tags[tIndex].articleCount++;
        } else {
          db.tags.push({
            id: Math.random().toString(36),
            slug: tag.toLowerCase().replace(/\s+/g, '-'),
            name: tag,
            articleCount: 1
          });
        }
      });
    }

    saveDb(db);
    return NextResponse.json(newArticle);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to save article' }, { status: 500 });
  }
}
