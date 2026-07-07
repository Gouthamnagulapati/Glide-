'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RecruiterLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      router.push('/recruiter/dashboard');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden">
      
      {/* Background - Exact same as signup */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,#312e81_90deg,#581c87_180deg,#1e3a8a_270deg,transparent_360deg)] opacity-40 blur-3xl"
        />
      </div>

      <h1 className="absolute z-10 text-[250px] font-black text-white/[0.15] select-none tracking-tighter pointer-events-none">
        GLIDE
      </h1>

      {/* Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-20 w-full max-w-sm p-8 bg-[#050505]/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="relative z-30">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white/50 mb-6 text-sm">Sign in to access your recruiter dashboard.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Work Email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all"
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all"
              required
            />
            
            <button 
              type="submit" 
              className="w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-all"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-white/30 text-sm">
            Don't have an account?{' '}
            <Link href="/recruiter/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}