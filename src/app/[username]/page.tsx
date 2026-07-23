import { notFound } from 'next/navigation';
import { getAuthorProfile } from '@/services/authorService';
import { getMyArticles } from '@/services/articleService';
import { getFollowersCount, getFollowingCount } from '@/services/followService';
import { Button } from '@/components/ui/Button';
import { MapPin, Link as LinkIcon, Calendar, Github, Twitter, Linkedin, Share2 } from 'lucide-react';
import Link from 'next/link';
import { ProfileFollowButton } from '@/components/profile/ProfileFollowButton';
import { ProfileFollowersCount } from '@/components/profile/ProfileFollowersCount';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username: rawUsername } = await params;
  
  // Next.js decodes the URL, so %40 becomes @
  if (!rawUsername.startsWith('@') && !rawUsername.startsWith('%40')) {
    notFound();
  }

  const username = rawUsername.replace(/^(@|%40)/, '');
  const profile = await getAuthorProfile(username);

  if (!profile) {
    notFound();
  }

  const [articles, followers, following] = await Promise.all([
    getMyArticles(profile.id),
    getFollowersCount(profile.id),
    getFollowingCount(profile.id)
  ]);

  const publishedArticles = articles.filter(a => a.status === 'PUBLISHED');
  const totalViews = publishedArticles.reduce((acc, curr) => acc + (curr.views || 0), 0);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      {/* Cover Image */}
      <div className="h-64 sm:h-80 w-full bg-slate-200 dark:bg-slate-800 relative">
        <img 
          src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80&w=2000" 
          alt="Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative -mt-24 sm:-mt-32 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row gap-6 sm:items-end">
            <div className="relative inline-block">
              <img 
                src={profile.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300'} 
                alt={profile.name} 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white dark:border-slate-950 object-cover bg-white dark:bg-slate-900"
              />
            </div>
            <div className="pb-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-1">
                {profile.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 font-medium">
                @{username}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 pb-2">
            <Button variant="outline" className="gap-2 rounded-xl">
              <Share2 className="h-4 w-4" /> Share
            </Button>
            <ProfileFollowButton authorId={profile.id} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: About & Stats */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {profile.bio || "This user hasn't added a bio yet."}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> San Francisco, CA
              </div>
              <div className="flex items-center gap-1.5">
                <LinkIcon className="h-4 w-4" /> 
                <a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">sudipta.dev</a>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> Joined July 2023
              </div>
            </div>

            <div className="flex gap-4">
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
              )}
              {profile.twitter && (
                <a href={profile.twitter} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  <ProfileFollowersCount authorId={profile.id} initialCount={followers} />
                </div>
                <div className="text-sm font-medium text-slate-500">Followers</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{following.toLocaleString()}</div>
                <div className="text-sm font-medium text-slate-500">Following</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{publishedArticles.length}</div>
                <div className="text-sm font-medium text-slate-500">Articles</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{totalViews.toLocaleString()}</div>
                <div className="text-sm font-medium text-slate-500">Total Views</div>
              </div>
            </div>
          </div>

          {/* Right Column: Articles */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Published Articles</h2>
            
            {publishedArticles.length > 0 ? (
              <div className="space-y-6">
                {publishedArticles.map((article) => (
                  <article key={article.id} className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-brand-500/5 transition-all">
                    <Link href={`/articles/${article.slug}`} className="absolute inset-0 z-0" />
                    
                    <div className="relative z-10 sm:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden">
                      <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    
                    <div className="relative z-10 sm:w-2/3 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                          {article.category}
                        </span>
                        <span className="text-slate-300 dark:text-slate-700">•</span>
                        <span className="text-xs font-medium text-slate-500">
                          {new Date(article.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      
                      <p className="text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed text-sm">
                        {article.description}
                      </p>
                      
                      <div className="mt-auto flex items-center gap-4 text-sm font-medium text-slate-500">
                        <span>{article.readingTime} min read</span>
                        <span>{article.views?.toLocaleString() || 0} views</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-500 border border-dashed rounded-2xl dark:border-slate-800">
                {profile.name} hasn't published any articles yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
