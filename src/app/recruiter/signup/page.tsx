'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BreathingBackground from '@/components/BreathingBackground';

export default function RecruiterSignup() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRecruiterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Redirect to Recruiter Login
    router.push('/recruiter/login');
  };

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      <BreathingBackground />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-lg p-8 sm:p-12 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">Recruiter Portal</h1>
          <p className="text-white/40 mt-2">Enter your details to register your organization.</p>
        </div>
        
        <form onSubmit={handleRecruiterSignup} className="space-y-4">
          {/* Company Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input 
              type="text" 
              placeholder="Company Name" 
              className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-all"
              required
            />
            <select className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white/50 outline-none focus:border-white/30 transition-all">
              <option>Company Size</option>
              <option>1-50</option>
              <option>51-200</option>
              <option>201-1000</option>
              <option>1000+</option>
            </select>
          </div>

          {/* User Details */}
          <input 
            type="text" 
            placeholder="Your Job Title" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-all"
            required
          />
          <input 
            type="email" 
            placeholder="Work Email" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-all"
            required
          />
          <input 
            type="password" 
            placeholder="Create Password" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-all"
            required
          />
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98] shadow-lg shadow-white/10 mt-6"
          >
            {isLoading ? "Setting up..." : "Create Account"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-white/40 text-sm">
            Already have an account?{" "}
            <button 
              onClick={() => router.push('/recruiter/login')}
              className="text-white font-bold hover:underline transition-all"
            >
              Login here
            </button>
          </p>
        </div>
      </motion.div>
    </main>
  );
}