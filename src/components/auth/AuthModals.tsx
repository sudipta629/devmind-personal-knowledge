'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { BookOpen, Mail, Lock, User, Phone, Image as ImageIcon, X } from 'lucide-react';

export function AuthModals() {
  const { isLoginModalOpen, isRegisterModalOpen, closeModals, openLoginModal, openRegisterModal, login, register } = useAuth();
  
  if (!isLoginModalOpen && !isRegisterModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 sm:p-6 animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 flex flex-col max-h-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoginModalOpen && <LoginForm />}
        {isRegisterModalOpen && <RegisterForm />}
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 z-[-1]" onClick={closeModals} />
    </div>
  );
}

function LoginForm() {
  const { login, closeModals, openRegisterModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ identifier: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.identifier || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await login(formData.identifier);
      closeModals();
    } catch (err) {
      setError('Failed to login. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-sm">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
        </div>
        <button onClick={closeModals} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Welcome back</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Don't have an account?{' '}
        <button onClick={openRegisterModal} className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400">
          Create one now
        </button>
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-lg">{error}</div>}
        <div className="space-y-4">
          <Input
            id="identifier"
            label="Email or Username"
            type="text"
            required
            value={formData.identifier}
            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            icon={<Mail className="h-4 w-4" />}
            placeholder="you@example.com"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            icon={<Lock className="h-4 w-4" />}
            placeholder="••••••••"
          />
        </div>

        <div className="flex items-center justify-between">
          <Checkbox id="remember-me" label="Remember me" />
          <div className="text-sm">
            <a href="#" className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <Button type="submit" className="w-full" size="lg" isLoading={loading}>
            Sign in
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" size="lg">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
        </div>
      </form>
    </div>
  );
}

function RegisterForm() {
  const { register, closeModals, openLoginModal } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      setError('You must agree to the Terms & Privacy Policy');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!formData.fullName || !formData.username || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register(formData);
      closeModals();
    } catch (err) {
      setError('Failed to register. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="p-8 overflow-y-auto">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 shadow-sm">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
        </div>
        <button onClick={closeModals} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>

      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Create an account</h2>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <button onClick={openLoginModal} className="font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400">
          Log in here
        </button>
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        {error && <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-400 rounded-lg">{error}</div>}
        <div className="space-y-4">
          <Input
            id="fullName"
            label="Full Name"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            icon={<User className="h-4 w-4" />}
            placeholder="John Doe"
          />
          <Input
            id="username"
            label="Username"
            type="text"
            required
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            icon={<User className="h-4 w-4" />}
            placeholder="johndoe123"
          />
          <Input
            id="email"
            label="Email address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            icon={<Mail className="h-4 w-4" />}
            placeholder="you@example.com"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            icon={<Lock className="h-4 w-4" />}
            placeholder="••••••••"
          />
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            required
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            icon={<Lock className="h-4 w-4" />}
            placeholder="••••••••"
          />
        </div>

        <Checkbox 
          id="terms" 
          label="I agree to the Terms & Privacy Policy" 
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />

        <div className="space-y-4">
          <Button type="submit" className="w-full" size="lg" isLoading={loading}>
            Register
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">Or continue with</span>
            </div>
          </div>

          <Button type="button" variant="outline" className="w-full" size="lg">
            <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </Button>
        </div>
      </form>
    </div>
  );
}
