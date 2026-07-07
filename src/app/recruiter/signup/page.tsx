'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function RecruiterSignup() {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    website: '',
    linkedinUrl: '',
    industry: '',
    hiringVolume: '',
    headquarters: ''
  });

  const supabase = createClient();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: { data: { role: 'recruiter' } },
    });

    if (authError) { alert(authError.message); return; }

    if (authData.user) {
      const { error: dbError } = await supabase
        .from('recruiters')
        .insert([{ 
          id: authData.user.id, 
          company_name: formData.companyName,
          website: formData.website,
          linkedin_url: formData.linkedinUrl,
          industry: formData.industry,
          hiring_volume: formData.hiringVolume,
          headquarters: formData.headquarters
        }]);

      if (dbError) { alert('Error: ' + dbError.message); } 
      else { router.push('/recruiter/dashboard'); }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#050505] relative overflow-hidden py-12">
      
      {/* Fluid Conic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0deg,#312e81_90deg,#581c87_180deg,#1e3a8a_270deg,transparent_360deg)] opacity-40 blur-3xl"
        />
      </div>

      {/* GLIDE Text */}
      <h1 className="absolute z-10 text-[250px] font-black text-white/[0.15] select-none tracking-tighter pointer-events-none">
        GLIDE
      </h1>

      {/* Glass Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-20 w-full max-w-lg p-8 bg-[#050505]/50 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="relative z-30">
          <h2 className="text-2xl font-bold text-white mb-2">Recruiter Access</h2>
          <p className="text-white/50 mb-6 text-sm">Fill in these details to begin your onboarding.</p>
          
          <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="companyName" placeholder="Company Name" onChange={handleInputChange} className="md:col-span-2 w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" required />
            <input name="email" type="email" placeholder="Work Email" onChange={handleInputChange} className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" required />
            <input name="password" type="password" placeholder="Password" onChange={handleInputChange} className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" required />
            <input name="website" placeholder="Company Website" onChange={handleInputChange} className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" required />
            <input name="linkedinUrl" placeholder="LinkedIn Company URL" onChange={handleInputChange} className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" required />
            <input name="industry" placeholder="Industry (e.g. SaaS)" onChange={handleInputChange} className="w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" />
            
            <select 
              name="hiringVolume" 
              onChange={handleInputChange} 
              className="w-full p-4 bg-[#050505] border border-white/10 rounded-2xl text-white focus:outline-none focus:border-white/30 transition-all appearance-none"
            >
              <option value="" className="bg-[#050505] text-white/50">Expected Monthly Hires</option>
              <option value="1-5" className="bg-[#050505] text-white">1-5</option>
              <option value="6-20" className="bg-[#050505] text-white">6-20</option>
              <option value="20+" className="bg-[#050505] text-white">20+</option>
            </select>
            
            <input name="headquarters" placeholder="Headquarters Location" onChange={handleInputChange} className="md:col-span-2 w-full p-4 bg-white/10 border border-white/10 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:border-white/30 transition-all" />
            
            <button type="submit" className="md:col-span-2 w-full py-4 mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg transition-all">
              Create Account
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}