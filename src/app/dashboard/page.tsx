'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getMyArticles, deleteArticle } from '@/services/articleService';
import { getUserBookmarks } from '@/services/bookmarkService';
import { getFollowersCount } from '@/services/followService';
import type { Article } from '@/types';
import { LayoutDashboard, BookOpen, PenTool, Bookmark, Settings, FileText, Trash2, Edit, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'overview';
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [articles, setArticles] = useState<Article[]>([]);
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [followers, setFollowers] = useState(0);

  useEffect(() => {
    setActiveTab(searchParams.get('tab') || 'overview');
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      getMyArticles(user.id).then(setArticles);
      getUserBookmarks(user.id).then(setBookmarks);
      getFollowersCount(user.id).then(setFollowers);
    }
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    router.push('/');
    return null;
  }

  const publishedArticles = articles.filter(a => a.status === 'PUBLISHED');
  const draftArticles = articles.filter(a => a.status === 'DRAFT');

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this article?')) {
      await deleteArticle(id);
      setArticles(articles.filter(a => a.id !== id));
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'articles', label: 'My Articles', icon: BookOpen },
    { id: 'drafts', label: 'Drafts', icon: FileText },
    { id: 'bookmarks', label: 'Bookmarks', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-24 pt-32 sm:px-6 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 p-4 sticky top-24">
          <div className="mb-6 px-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white truncate">Dashboard</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate">Welcome back, {user.fullName?.split(' ')[0]}</p>
          </div>
          
          <nav className="space-y-1">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => router.push(`/dashboard?tab=${tab.id}`)}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 min-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
                <Link href="/write" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">
                  <PenTool className="h-4 w-4" /> Write New
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl bg-brand-50 dark:bg-brand-900/10 border border-brand-100 dark:border-brand-900/20">
                  <p className="text-sm font-medium text-brand-600 dark:text-brand-400">Total Articles</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{articles.length}</p>
                </div>
                <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20">
                  <p className="text-sm font-medium text-green-600 dark:text-green-400">Total Views</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{articles.reduce((acc, curr) => acc + (curr.views || 0), 0).toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20">
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">Followers</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{followers.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-100 dark:border-violet-900/20">
                  <p className="text-sm font-medium text-violet-600 dark:text-violet-400">Drafts</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{draftArticles.length}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Published Articles</h1>
              </div>
              <ArticleTable articles={publishedArticles} onDelete={handleDelete} />
            </div>
          )}

          {activeTab === 'drafts' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Drafts</h1>
              </div>
              <ArticleTable articles={draftArticles} onDelete={handleDelete} />
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Bookmarks</h1>
              {bookmarks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bookmarks.map(article => (
                    <Link key={article.id} href={`/articles/${article.slug}`} className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <h3 className="font-medium text-slate-900 dark:text-white mb-1 line-clamp-1">{article.title}</h3>
                      <p className="text-sm text-slate-500 line-clamp-2">{article.description}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center text-slate-500 border rounded-2xl dark:border-slate-800">
                  No bookmarks found.
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in">
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Settings</h1>
              <p className="text-slate-500">Settings page coming soon...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function ArticleTable({ articles, onDelete }: { articles: Article[], onDelete: (id: string) => void }) {
  if (articles.length === 0) {
    return (
      <div className="p-12 text-center text-slate-500 border border-dashed rounded-2xl dark:border-slate-800">
        No articles found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
      <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-slate-300 font-medium border-b border-slate-200 dark:border-slate-800">
          <tr>
            <th className="px-6 py-4">Article</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Views</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {articles.map((article) => (
            <tr key={article.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img src={article.thumbnail} alt="" className="h-10 w-16 object-cover rounded-md shrink-0" />
                  <div className="font-medium text-slate-900 dark:text-white max-w-xs truncate" title={article.title}>
                    {article.title}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 capitalize">{article.category}</td>
              <td className="px-6 py-4">{article.views?.toLocaleString() || 0}</td>
              <td className="px-6 py-4">{new Date(article.publishedAt).toLocaleDateString()}</td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={`/write?id=${article.id}`} className="p-2 text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                    <Edit className="h-4 w-4" />
                  </Link>
                  <Link href={`/articles/${article.slug}`} className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                  <button onClick={() => onDelete(article.id)} className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
