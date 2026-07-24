'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    // TODO: Replace with real newsletter API call
    // await subscribeToNewsletter(email);
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <section id="newsletter" className="bg-gradient-to-br from-brand-600 via-brand-700 to-violet-700 py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
          <Mail className="h-7 w-7 text-white" />
        </div>

        <h2 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
          Stay in the loop
        </h2>
        <p className="mb-8 text-base text-brand-100 sm:text-lg">
          Get the latest articles, tutorials, and tips delivered straight to your inbox.
          No spam. Unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl bg-white/10 p-6 text-white backdrop-blur-sm">
            <CheckCircle className="h-6 w-6 text-green-400" />
            <p className="font-medium">You&apos;re subscribed! Thanks for joining.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 sm:flex-row">
            <Input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 border-white/20 bg-white/10 text-white placeholder-white/50 backdrop-blur-sm focus:border-white/50 focus:ring-white/20 dark:bg-white/10 dark:border-white/20 dark:text-white"
            />
            <Button
              type="submit"
              isLoading={loading}
              className="w-full gap-2 bg-white text-brand-700 hover:bg-brand-50 sm:w-auto"
            >
              <Send className="h-4 w-4" />
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-4 text-xs text-brand-200">
          Join 10,000+ engineers already subscribed. No spam, ever.
        </p>
      </div>
    </section>
  );
}
