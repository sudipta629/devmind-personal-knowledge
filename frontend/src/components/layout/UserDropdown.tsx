'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { User, LayoutDashboard, PenTool, BookOpen, Bookmark, Settings, LogOut, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full ring-2 ring-transparent transition-all hover:ring-brand-500 focus-ring"
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.fullName}
            width={36}
            height={36}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold">
            {user.fullName?.[0]?.toUpperCase()}
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white shadow-lg focus:outline-none dark:border-slate-700 dark:bg-slate-800 animate-in fade-in slide-in-from-top-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{user.fullName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">@{user.username}</p>
          </div>
          
          <div className="p-2 space-y-1">
            <Link href={`/@${user.username}`} onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <User className="h-4 w-4" /> My Profile
            </Link>
            <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link href="/write" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <PenTool className="h-4 w-4" /> Write Article
            </Link>
            <Link href="/dashboard?tab=articles" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <BookOpen className="h-4 w-4" /> My Articles
            </Link>
            <Link href="/dashboard?tab=drafts" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <FileText className="h-4 w-4" /> Draft Articles
            </Link>
            <Link href="/dashboard?tab=bookmarks" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <Bookmark className="h-4 w-4" /> Bookmarks
            </Link>
            <Link href="/dashboard?tab=settings" onClick={() => setIsOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700">
              <Settings className="h-4 w-4" /> Settings
            </Link>
          </div>
          
          <div className="border-t border-slate-100 p-2 dark:border-slate-700">
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
