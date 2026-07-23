import { NextResponse } from 'next/server';
import { getDb, saveDb } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getDb();
  
  const article = db.articles.find(a => a.slug === slug);
  if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  
  return NextResponse.json(article);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  // Wait, the id is usually passed for deletion, but let's assume slug or id is passed
  const { slug } = await params; // using slug as ID for deletion here
  const db = getDb();
  
  db.articles = db.articles.filter(a => a.id !== slug && a.slug !== slug);
  saveDb(db);
  
  return NextResponse.json({ success: true });
}
