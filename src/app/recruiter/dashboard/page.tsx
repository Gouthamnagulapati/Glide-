'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

const ResumeContent = ({ data }: { data: string }) => {
  if (!data) return <span className="text-zinc-600 italic">No resume data available.</span>;

  return (
    <div className="relative group w-full h-[400px] overflow-hidden border border-white/10 bg-black/40">
      <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/20 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-300 text-sm font-bold uppercase tracking-widest">PREMIUM ACCESS REQUIRED</p>
        <button 
          onClick={() => window.location.href = '/recruiter/payment'}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded text-xs uppercase font-bold transition-all"
        >
          Unlock Full Resume
        </button>
      </div>
      <div className="p-6 opacity-30 select-none blur-sm pointer-events-none">
        <pre className="font-sans text-xs text-zinc-500 whitespace-pre-wrap">
          {data.substring(0, 1000)}...
        </pre>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [timelineData, setTimelineData] = useState<any[]>([])

  const fetchAndSortData = async (term: string = "") => {
    let query = supabase
      .from('applications')
      .select('*')
      .order('ats_match_score', { ascending: false });

    if (term && term.trim() !== "") {
      query = query.or(`compressed_markdown.ilike.%${term}%,target_node.ilike.%${term}%`);
    }

    const { data, error } = await query;
    if (error) console.error("Supabase Fetch Error:", error);
    else setTimelineData(data || []);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('applications')
      .update({ current_milestone: newStatus })
      .eq('id', id);

    if (error) {
      console.error("Supabase Update Error:", error.message);
      alert("Error updating status: " + error.message);
    }
  };

  useEffect(() => {
    // 1. Initial Fetch
    fetchAndSortData(searchTerm);

    // 2. Setup Realtime Subscription
    const channel = supabase
      .channel('realtime:applications')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'applications' 
      }, () => {
        fetchAndSortData(searchTerm);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#030611] text-zinc-300 p-8 font-mono relative overflow-hidden">
      <motion.div 
        animate={{ background: ["radial-gradient(circle at 0% 0%, #1a103d 0%, #030611 50%)", "radial-gradient(circle at 100% 100%, #1a103d 0%, #030611 50%)"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="fixed inset-0 z-0"
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-purple-500 font-bold tracking-[0.2em] text-lg">GLIDE ENGINE V2.6-FLUID</h1>
        </header>

        <div className="mb-8">
          <input 
            type="text" 
            placeholder="SEARCH SKILLS OR CANDIDATE..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/[0.02] border border-white/5 p-4 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-purple-500 uppercase tracking-wider"
          />
        </div>
        
        <h2 className="text-purple-500 text-xs mb-8 tracking-[0.3em] uppercase">
          {timelineData.length} Candidates Found
        </h2>
        
        <div className="space-y-2">
          {timelineData.map((row, i) => (
            <div key={row.id || i} className="border-b border-white/5 bg-[#050812]/30">
              <div className="flex justify-between items-center py-4 px-4 hover:bg-white/[0.05] transition-all">
                <div className="w-1/3 truncate">
                  <p className="text-sm text-white">{row.target_node}</p>
                  <p className="text-[10px] text-zinc-600">NO SKILLS</p>
                </div>
                
                <span className="text-xs text-zinc-500 w-1/4 text-center">SCORE: {row.ats_match_score || '0'}%</span>
                <span className="text-xs text-blue-400 w-1/6 text-center">{row.current_milestone}</span>
                
                <div className="flex gap-4 w-1/3 justify-end text-xs">
                  <button onClick={() => setExpandedRow(expandedRow === i ? null : i)} className="text-green-500 uppercase hover:underline">
                    {expandedRow === i ? "[CLOSE]" : "[RESUME]"}
                  </button>
                  <button onClick={() => updateStatus(row.id, 'SHORTLISTED')} className="text-green-500 uppercase hover:underline">[ACCEPT]</button>
                  <button onClick={() => updateStatus(row.id, 'REJECTED')} className="text-red-500 uppercase hover:underline">[DECLINE]</button>
                </div>
              </div>
              
              <AnimatePresence>
                {expandedRow === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-4 pb-6 overflow-hidden text-xs border-l border-purple-500/30"
                  >
                    <div className="mt-2 pt-2 border-t border-white/5">
                      <ResumeContent data={row.compressed_markdown} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}