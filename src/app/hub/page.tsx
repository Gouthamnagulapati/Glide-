'use client';

import { motion } from 'framer-motion';
import BreathingBackground from '@/components/BreathingBackground';
import { useRouter } from 'next/navigation';

export default function Hub() {
  const router = useRouter();

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      <BreathingBackground />
      
      {/* Sleek Vertical Floating Dock */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 lg:left-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 z-50 flex flex-row lg:flex-col gap-4 lg:gap-6">
        <button 
          onClick={() => router.push('/hub')}
          className="group flex flex-col items-center gap-2 text-white transition-all"
        >
          <div className="w-20 h-16 flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            <span className="text-xs font-bold">HUB</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold opacity-100">Hub</span>
        </button>

        <button 
          onClick={() => router.push('/dashboard')}
          className="group flex flex-col items-center gap-2 text-white/30 hover:text-white transition-all"
        >
          <div className="w-20 h-16 flex items-center justify-center rounded-2xl border border-white/10 bg-black/20 backdrop-blur-md group-hover:border-white/30 transition-all">
            <span className="text-xs font-bold">DASH</span>
          </div>
          <span className="text-[10px] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Dashboard</span>
        </button>
      </nav>

      {/* Main Content Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full max-w-2xl p-8 sm:p-12 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
      >
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-5xl font-black text-white mb-4 tracking-tight">Glide Hub</h1>
          <p className="text-white/60 text-lg max-w-md">
            The intelligent command center for your professional identity. Choose a tool below to begin your journey.
          </p>
        </div>

        {/* How it Works Section */}
        <div className="mb-10 space-y-6">
          <h2 className="text-white font-bold text-xl">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Input", desc: "Add your career details." },
              { step: "02", title: "Process", desc: "AI optimizes for ATS." },
              { step: "03", title: "Export", desc: "Get your final file." },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                <span className="text-white/20 font-black text-2xl">{item.step}</span>
                <h3 className="font-bold text-white mt-1">{item.title}</h3>
                <p className="text-white/40 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {[
            { title: "Smart Resume Builder", desc: "Build optimized resumes in minutes." },
            { title: "ATS Check", desc: "Ensure your profile passes hiring filters." },
            { title: "Career Insights", desc: "Data-driven tips for your industry." },
            { title: "Export Anywhere", desc: "Download as high-quality PDF/DOCX." },
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
              <h3 className="font-bold text-white mb-1">{item.title}</h3>
              <p className="text-white/40 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <button 
          onClick={() => router.push('/builder')}
          className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all active:scale-[0.98] shadow-lg shadow-white/10 text-lg"
        >
          Launch Resume Builder
        </button>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">
            Need help? Check out our documentation.
          </p>
        </div>
      </motion.div>
    </main>
  );
}