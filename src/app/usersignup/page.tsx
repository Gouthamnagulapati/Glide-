'use client';

import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// Assuming you have this component, if not, let me know.
// For now, I will wrap the page in a simple gradient if this component fails.
import BreathingBackground from '@/components/BreathingBackground'; 

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      alert('Check your email for the confirmation link!');
      router.push('/login');
    }
  };

  return (
    // Main container with breathing background
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden p-4 bg-gray-950">
      {/* Background Component */}
      <div className="absolute inset-0 z-0">
        <BreathingBackground />
      </div>

      {/* Glassmorphism Card Container */}
      <div className="relative z-10 w-full max-w-md p-8 sm:p-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/50 transition-all duration-300">
        
        {/* Header Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Sign up to get started with Glide.
          </p>
        </div>

        {/* Error Message Display */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Sign Up Form */}
        <form onSubmit={handleSignUp} className="space-y-6">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 ml-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="block w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2 ml-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="block w-full px-5 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all duration-150 shadow-lg shadow-blue-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link 
            href="/login" 
            className="font-semibold text-blue-600 dark:text-blue-400 hover:underline transition-colors duration-150"
          >
            Log in
          </Link>
        </div>

      </div>
    </div>
  );
}