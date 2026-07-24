'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profileService';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Camera, Upload, X } from 'lucide-react';

export default function EditProfilePage() {
  const { user, refreshUser, loading: authLoading } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    professionalTitle: '',
    bio: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    twitter: '',
    experienceLevel: '',
    company: '',
    jobTitle: '',
  });

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const avatarInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user) {
      setFormData({
        fullName: user.fullName || '',
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        professionalTitle: user.professionalTitle || '',
        bio: user.bio || '',
        location: user.location || '',
        website: user.website || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        twitter: user.twitter || '',
        experienceLevel: user.experienceLevel || '',
        company: user.company || '',
        jobTitle: user.jobTitle || '',
      });
      setSkills(user.skills || []);
      setAvatarPreview(user.avatar || null);
      setCoverPreview(user.coverImage || null);
    }
  }, [user, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (skillInput.trim() && !skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput('');
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB.');
      return;
    }
    
    setError('');
    
    const reader = new FileReader();
    reader.onload = () => {
      if (type === 'avatar') {
        setAvatarPreview(reader.result as string);
        setAvatarFile(file);
      } else {
        setCoverPreview(reader.result as string);
        setCoverFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.fullName.trim()) return setError('Name is required');
    if (!formData.username.trim()) return setError('Username is required');
    if (!formData.bio.trim()) return setError('Bio is required');
    
    setSaving(true);
    try {
      let avatarUrl = user?.avatar;
      let coverUrl = user?.coverImage;

      if (avatarFile) {
        avatarUrl = await profileService.uploadAvatar(avatarFile);
      }
      if (coverFile) {
        coverUrl = await profileService.uploadCover(coverFile);
      }

      await profileService.updateProfile({
        ...formData,
        skills,
        avatar: avatarUrl,
        coverImage: coverUrl
      });

      await refreshUser();
      setSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-24 pt-32 sm:px-6">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 sm:p-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Edit Profile</h1>
          <Button variant="ghost" onClick={() => router.push('/about')}>
            Cancel
          </Button>
        </div>

        {error && <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">{error}</div>}
        {success && <div className="mb-6 p-4 rounded-xl bg-green-50 text-green-600 text-sm border border-green-100">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Images Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cover Image</label>
              <div 
                className="relative h-48 w-full bg-slate-100 dark:bg-slate-800 rounded-2xl overflow-hidden cursor-pointer group flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-brand-500 transition-colors"
                onClick={() => coverInputRef.current?.click()}
              >
                {coverPreview ? (
                  <Image src={coverPreview} alt="Cover" fill className="object-cover" />
                ) : (
                  <div className="text-center text-slate-500">
                    <Upload className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <span className="text-sm">Click to upload cover</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Change Cover</span>
                </div>
              </div>
              <input type="file" accept="image/*" ref={coverInputRef} className="hidden" onChange={(e) => handleImageChange(e, 'cover')} />
            </div>

            <div className="relative -mt-16 ml-8">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 sr-only">Profile Picture</label>
              <div 
                className="relative h-28 w-28 rounded-full bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 overflow-hidden cursor-pointer group"
                onClick={() => avatarInputRef.current?.click()}
              >
                {avatarPreview ? (
                  <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-3xl text-slate-400 font-bold bg-slate-100">
                    {user.fullName?.[0]?.toUpperCase()}
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white h-6 w-6" />
                </div>
              </div>
              <input type="file" accept="image/*" ref={avatarInputRef} className="hidden" onChange={(e) => handleImageChange(e, 'avatar')} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <Input label="Full Name *" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
            <Input label="Username *" name="username" value={formData.username} onChange={handleInputChange} required />
            <Input label="Email (Read Only)" name="email" value={formData.email} disabled />
            <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            <Input label="Professional Title" name="professionalTitle" value={formData.professionalTitle} onChange={handleInputChange} placeholder="e.g. Senior Frontend Engineer" />
            <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. San Francisco, CA" />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Bio *</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              required
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-brand-400 dark:focus:ring-brand-400/20"
              placeholder="Tell us a little bit about yourself..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Website" name="website" value={formData.website} onChange={handleInputChange} placeholder="https://" />
            <Input label="GitHub" name="github" value={formData.github} onChange={handleInputChange} placeholder="https://github.com/..." />
            <Input label="LinkedIn" name="linkedin" value={formData.linkedin} onChange={handleInputChange} placeholder="https://linkedin.com/in/..." />
            <Input label="Twitter / X" name="twitter" value={formData.twitter} onChange={handleInputChange} placeholder="https://twitter.com/..." />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input label="Company" name="company" value={formData.company} onChange={handleInputChange} />
            <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Experience Level</label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Senior">Senior</option>
                <option value="Lead/Manager">Lead/Manager</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Skills (Press Enter to add)</label>
            <div className="p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 flex flex-wrap gap-2 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
              {skills.map(skill => (
                <span key={skill} className="flex items-center gap-1 bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 px-2 py-1 rounded-md text-sm">
                  {skill}
                  <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-500 transition-colors">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder={skills.length === 0 ? "e.g. React, TypeScript, Node.js" : ""}
                className="flex-1 min-w-[120px] outline-none bg-transparent text-sm text-slate-900 dark:text-slate-100 py-1 px-2"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
            <Button type="button" variant="ghost" onClick={() => router.push('/about')} disabled={saving}>
              Cancel
            </Button>
            <Button type="submit" isLoading={saving}>
              Save Profile
            </Button>
          </div>
          
        </form>
      </div>
    </div>
  );
}
