'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BreathingBackground from '@/components/BreathingBackground';

export default function UserSignup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Default flow for job seekers
    router.push('/hub'); 
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      <BreathingBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-md p-8 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <h1 className="text-3xl font-black text-white mb-6">Create Account</h1>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-all"
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-all"
            required
          />
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98] shadow-lg shadow-white/10"
          >
            {isLoading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        {/* Recruiter Link */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-white/40 text-sm">
            Are you a recruiter?{" "}
            <button 
              onClick={() => router.push('/recruiter/signup')}
              className="text-white font-bold hover:underline transition-all"
            >
              Click here
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
}