'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Mail, Github, Linkedin, Twitter, Globe, MapPin, Code2, Briefcase, GraduationCap, Share2, Edit } from 'lucide-react';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 pt-32 sm:px-6">
      {/* Hero */}
      <div className="mb-12 flex flex-col items-center gap-8 text-center sm:flex-row sm:items-start sm:text-left bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
        <div className="relative shrink-0">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-brand-500 to-violet-600 blur opacity-40" />
          <div className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-white dark:ring-slate-950 bg-brand-500 flex items-center justify-center text-4xl text-white font-bold">
            {user.avatar ? (
              <img src={user.avatar} alt={user.fullName} className="h-full w-full object-cover" />
            ) : (
              user.fullName?.[0]?.toUpperCase()
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                {user.fullName}
              </h1>
              <p className="text-sm font-medium text-brand-600 dark:text-brand-400">@{user.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/edit-profile">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" /> Edit Profile
                </Button>
              </Link>
              <Button variant="secondary" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" /> Share
              </Button>
            </div>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl">
            {user.bio || "No bio provided yet."}
          </p>
          
          <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-slate-500 dark:text-slate-400">
            {user.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {user.location}
              </div>
            )}
            {user.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="h-4 w-4" /> {user.email}
              </div>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-brand-600">
                <Globe className="h-4 w-4" /> Website
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center sm:justify-start gap-3">
            {user.github && (
              <a href={user.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
            )}
            {user.linkedin && (
              <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {user.twitter && (
              <a href={user.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{user.stats?.totalArticles || 0}</p>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Articles</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{user.stats?.totalViews?.toLocaleString() || 0}</p>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Total Views</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{user.stats?.followers?.toLocaleString() || 0}</p>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Followers</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{user.stats?.following?.toLocaleString() || 0}</p>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">Following</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Skills */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <Code2 className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Skills & Expertise</h2>
          </div>
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 text-sm">No skills added yet.</p>
          )}
        </section>

        {/* Experience */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-6">
            <Briefcase className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Experience</h2>
          </div>
          {user.experience && user.experience.length > 0 ? (
            <ul className="space-y-4">
              {user.experience.map((exp, index) => (
                <li key={index} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">{exp}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">No experience added yet.</p>
          )}
        </section>

        {/* Education */}
        <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="h-5 w-5 text-brand-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Education</h2>
          </div>
          {user.education && user.education.length > 0 ? (
            <ul className="space-y-4">
              {user.education.map((edu, index) => (
                <li key={index} className="flex gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-brand-500 shrink-0" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">{edu}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 text-sm">No education added yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
