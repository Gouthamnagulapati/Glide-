'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/utils/supabase/client'

const supabase = createClient()

export default function GlideEngineDashboard() {
  const [view, setView] = useState<'dashboard' | 'antiscam'>('dashboard')
  const [mounted, setMounted] = useState(false)
  const [apps, setApps] = useState<any[]>([])
  const [selectedApp, setSelectedApp] = useState<any>(null)
  const [daysElapsed, setDaysElapsed] = useState(0)

  const fetchApps = async () => {
    const { data } = await supabase.from('applications').select('*')
    if (data) {
      const formattedApps = data.map((item) => ({
        id: item.id,
        node: item.target_node,
        trans: item.transmission_route,
        mile: item.current_milestone
      }))
      setApps(formattedApps)
      if (formattedApps.length > 0) {
        const stillExists = formattedApps.find(a => a.id === selectedApp?.id)
        setSelectedApp(stillExists || formattedApps[0])
      }
    }
  }

  useEffect(() => {
    setMounted(true)
    fetchApps()

    const channel = supabase
      .channel('realtime:applications')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'applications' }, () => {
        fetchApps()
      })
      .subscribe()

    const saved = localStorage.getItem('glide-days')
    if (saved) setDaysElapsed(Number(saved))

    const timer = setInterval(() => {
      setDaysElapsed((prev) => {
        const next = prev >= 15 ? 15 : prev + 1
        localStorage.setItem('glide-days', String(next))
        return next
      })
    }, 3000)

    return () => { 
      clearInterval(timer)
      supabase.removeChannel(channel) 
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="relative h-screen w-full bg-[#030611] overflow-hidden text-zinc-400">
      {/* AGGRESSIVE BREATHING BACKGROUND */}
      <motion.div 
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,_#1a1f35_0%,_#030611_70%)]"
        animate={{ 
          scale: [1, 1.2, 1], 
          opacity: [0.2, 0.8, 0.2] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
      />

      {/* GLASS UI LAYER */}
      <div className="relative z-10 flex h-screen w-full">
        {/* SIDEBAR */}
        <aside className="w-64 border-r border-white/10 flex flex-col justify-between py-16 px-10 shrink-0 bg-[#030611]/30 backdrop-blur-2xl">
          <div className="text-white font-bold text-2xl">N</div>
          <div className="flex flex-col gap-16 mt-16 mb-auto">
            <button onClick={() => setView('dashboard')} className={`text-[11px] font-bold tracking-widest text-left ${view === 'dashboard' ? 'text-white' : 'text-zinc-600'}`}>LIQUID TIMELINE</button>
            <button onClick={() => setView('antiscam')} className={`text-[11px] font-bold tracking-widest text-left ${view === 'antiscam' ? 'text-white' : 'text-zinc-600'}`}>ANTI-SCAM SHIELD</button>
          </div>
          <div className="text-[10px] text-zinc-800"><p className="uppercase tracking-widest">Ledger Bal</p><p className="text-white text-base">₹42.00</p></div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-16 overflow-y-auto">
          {view === 'dashboard' ? (
            <div>
              <h1 className="text-white text-6xl font-black mb-16 uppercase tracking-tighter">SYSTEM COMMAND CENTER</h1>
              <div className="bg-[#030611]/30 border border-white/10 rounded-xl p-10 backdrop-blur-2xl">
                {apps.map((app) => (
                  <div key={app.id} onClick={() => setSelectedApp(app)} className="grid grid-cols-3 py-6 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors items-center">
                    <span className="text-lg text-white font-medium">{app.node}</span>
                    <span className="text-zinc-500">{app.trans}</span>
                    <span className={`font-bold tracking-widest ${app.mile === 'Accepted' ? 'text-green-400' : app.mile === 'Rejected' ? 'text-red-500' : 'text-purple-400'}`}>{app.mile}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="max-w-5xl space-y-10">
              <div className="flex items-center gap-4">
                <h1 className="text-white text-4xl font-bold uppercase tracking-tighter">Anti-Scam Shield</h1>
                <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">Protocol Active</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[#030611]/30 border border-white/10 p-8 rounded-xl backdrop-blur-2xl">
                  <h3 className="text-white font-bold mb-4">Core Architecture</h3>
                  <p className="text-[13px] text-zinc-400 leading-relaxed">Glide Engine™ implements a proprietary Layer-7 firewall specifically designed to combat recruitment fraud.</p>
                </div>
                <div className="bg-[#030611]/30 border border-white/10 p-8 rounded-xl backdrop-blur-2xl">
                  <h3 className="text-white font-bold mb-4">Threat Landscape</h3>
                  <ul className="text-[13px] text-zinc-400 space-y-2">
                    <li>• <span className="text-red-400 font-bold">Block:</span> Predatory Consultancy Scraping</li>
                    <li>• <span className="text-red-400 font-bold">Block:</span> Malicious ATS Redirects</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* TELEMETRY */}
        <section className="w-[400px] border-l border-white/10 bg-[#030611]/30 p-12 flex flex-col h-screen shrink-0 backdrop-blur-2xl">
          <h2 className="text-[10px] font-bold text-white tracking-[0.2em] uppercase mb-12">
            Telemetry: {selectedApp?.node?.toUpperCase() || 'SYSTEM IDLE'}
          </h2>
          <div className="bg-[#030611]/40 p-8 rounded-lg border border-white/10 mb-8 backdrop-blur-lg">
            <p className="text-[9px] uppercase tracking-[0.2em] mb-6 text-zinc-500">Days Elapsed: {daysElapsed} / 15</p>
            <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div className="h-full bg-purple-500" animate={{ width: `${(daysElapsed / 15) * 100}%` }} transition={{ duration: 0.5 }} />
            </div>
          </div>
          
          <div className="flex-grow bg-[#030611]/40 border border-white/10 rounded-lg p-8 overflow-y-auto backdrop-blur-lg">
            {daysElapsed >= 15 ? (
              <div className="space-y-4 font-mono text-[11px] text-zinc-300">
                <p className="text-red-500 font-bold uppercase tracking-widest mb-4">Status: Inactivity Threshold Reached</p>
                <p className="text-zinc-400">System Alert: No movement detected on {selectedApp?.node}.</p>
                <p>The recruiter is not taking action.</p>
                <p>Recommendation: Redirect your efforts. Look for other recruiters or alternative channels to ensure your application progresses.</p>
              </div>
            ) : (
              <div className="text-center text-zinc-600 mt-20">
                <p className="text-lg">Telemetry Stable.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}