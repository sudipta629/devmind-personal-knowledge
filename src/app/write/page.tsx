'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { publishArticle } from '@/services/articleService';
import { Button } from '@/components/ui/Button';
import { Image as ImageIcon, X, ArrowLeft, Save } from 'lucide-react';
import { MOCK_CATEGORIES } from '@/lib/mockData';

export default function WriteArticlePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(MOCK_CATEGORIES[0]?.slug || '');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDraftSaved, setIsDraftSaved] = useState(false);

  // Auto-resize textarea
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('article_draft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setTitle(parsed.title || '');
        setDescription(parsed.description || '');
        setContent(parsed.content || '');
        setCategory(parsed.category || category);
        setTags(parsed.tags || []);
        setThumbnail(parsed.thumbnail || '');
      } catch (e) {}
    }
  }, []);

  // Autosave Draft
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (title || content || description) {
        localStorage.setItem('article_draft', JSON.stringify({
          title, description, content, category, tags, thumbnail
        }));
        setIsDraftSaved(true);
        setTimeout(() => setIsDraftSaved(false), 2000);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [title, description, content, category, tags, thumbnail]);

  if (loading) return null;
  if (!user) {
    router.push('/');
    return null;
  }

  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const charCount = content.length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePublish = async (status: 'PUBLISHED' | 'DRAFT') => {
    if (status === 'PUBLISHED' && (!title || !content)) {
      alert('Title and content are required to publish.');
      return;
    }
    setIsPublishing(true);
    try {
      const article = await publishArticle({
        title,
        description,
        content,
        category,
        tags,
        thumbnail: thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        author: {
          id: user.id,
          name: user.fullName,
          avatar: user.avatar || '',
          bio: user.bio || ''
        },
        status
      });
      localStorage.removeItem('article_draft');
      if (status === 'PUBLISHED') {
        router.push(`/articles/${article.slug}`);
      } else {
        router.push('/dashboard?tab=drafts');
      }
    } catch (e) {
      console.error(e);
      alert('Error saving article');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      {/* Top Navbar specifically for Editor */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          <button onClick={() => router.back()} className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-slate-500">
            {isDraftSaved ? 'Draft saved' : 'Editing...'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => handlePublish('DRAFT')} isLoading={isPublishing} className="gap-2">
            <Save className="h-4 w-4" /> Save Draft
          </Button>
          <Button onClick={() => handlePublish('PUBLISHED')} isLoading={isPublishing}>
            Publish
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        {/* Cover Image Upload (Mock) */}
        <div className="mb-8">
          {thumbnail ? (
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden group">
              <img src={thumbnail} alt="Cover" className="w-full h-full object-cover" />
              <button 
                onClick={() => setThumbnail('')}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                const url = prompt('Enter image URL for cover (mock upload):', 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200');
                if (url) setThumbnail(url);
              }}
              className="w-full py-12 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-500 hover:text-brand-600 hover:border-brand-300 dark:hover:border-brand-700 transition-colors bg-slate-50 dark:bg-slate-900/50"
            >
              <ImageIcon className="h-8 w-8 mb-3 opacity-50" />
              <span className="font-medium">Add Cover Image</span>
            </button>
          )}
        </div>

        {/* Title */}
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Article Title..."
          className="w-full text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 mb-6"
          rows={1}
          style={{ height: 'auto' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />

        {/* Description / Subtitle */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short, captivating description..."
          className="w-full text-xl text-slate-600 dark:text-slate-400 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 mb-8"
          rows={1}
          style={{ height: 'auto' }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = target.scrollHeight + 'px';
          }}
        />

        {/* Meta data inputs: Category & Tags */}
        <div className="flex flex-col sm:flex-row gap-6 mb-12 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            >
              {MOCK_CATEGORIES.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tags (Press Enter)</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                  {tag}
                  <button onClick={() => removeTag(tag)} className="hover:text-brand-900 dark:hover:text-brand-100">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add a tag..."
              className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-500 outline-none"
            />
          </div>
        </div>

        {/* Content Editor */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell your story... (Markdown supported)"
          className="w-full min-h-[50vh] text-lg text-slate-800 dark:text-slate-200 bg-transparent border-none focus:outline-none focus:ring-0 resize-none placeholder:text-slate-300 dark:placeholder:text-slate-700 font-serif leading-relaxed"
        />
      </div>

      {/* Sticky Bottom Bar for stats */}
      <div className="fixed bottom-0 inset-x-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-3 px-6 flex justify-center sm:justify-end gap-6 text-xs font-medium text-slate-500">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
        <span>{readTime} min read</span>
      </div>
    </div>
  );
}
