'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signUp({ email, password })
    setLoading(false)
    if (error) {
      setMessage({ text: error.message, isError: true })
    } else {
      setMessage({ text: 'Success! Check your email for a confirmation link.', isError: false })
    }
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    
    if (error) {
      setMessage({ text: error.message, isError: true })
    } else {
      setMessage({ text: 'Welcome back! Redirecting...', isError: false })
      setTimeout(() => {
        router.push('/dashboard')
      }, 800)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#030611] flex items-center justify-center p-6 selection:bg-blue-500/30">
      
      {/* --- GRAPHIC GRADIENT BACKDROP --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Deep Sapphire Left Ambient Bleed */}
        <div 
          className="absolute -top-[200px] -left-[200px] w-[800px] h-[800px] rounded-full blur-[120px] opacity-40 mix-blend-screen" 
          style={{ background: 'radial-gradient(circle, #0a2342 0%, transparent 70%)' }}
        />
        
        {/* Soft Royal Purple Top-Right Bleed */}
        <div 
          className="absolute -top-[150px] -right-[150px] w-[700px] h-[700px] rounded-full blur-[120px] opacity-40 mix-blend-screen" 
          style={{ background: 'radial-gradient(circle, #1b0e3a 0%, transparent 70%)' }}
        />

        {/* Deep Teal Bottom-Right Bleed */}
        <div 
          className="absolute -bottom-[200px] -right-[150px] w-[750px] h-[750px] rounded-full blur-[130px] opacity-35 mix-blend-screen" 
          style={{ background: 'radial-gradient(circle, #062c2b 0%, transparent 70%)' }}
        />

        {/* Dark Violet Bottom-Left Bleed */}
        <div 
          className="absolute -bottom-[200px] left-[10%] w-[800px] h-[800px] rounded-full blur-[120px] opacity-40 mix-blend-screen" 
          style={{ background: 'radial-gradient(circle, #160925 0%, transparent 70%)' }}
        />
        
        {/* Structural Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_80%,transparent_100%)]" />

        {/* Subtle Star Vector */}
        <div className="absolute bottom-[15%] right-[12%] opacity-10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
            <path d="M12 0L14.8 9.2L24 12L14.8 14.8L12 24L9.2 14.8L0 12L9.2 9.2L12 0Z" fill="currentColor"/>
          </svg>
        </div>
      </div>

      {/* --- LOGIN CARD --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.99, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        className="group relative z-10 w-full max-w-[420px] rounded-2xl bg-[#0d111c]/60 backdrop-blur-3xl border border-white/[0.04] p-8 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)]"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
          style={{
            background: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
            border: '1px solid rgba(255, 255, 255, 0.1)',
            maskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent)`,
            WebkitMaskImage: useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent)`
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/[0.08] flex items-center justify-center mb-4 shadow-xl">
              <span className="text-white font-bold text-xs tracking-wider">G</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-white">Sign in to Glide</h1>
            <p className="text-xs text-zinc-400 mt-1.5">Enter your details to access your dashboard</p>
          </div>

          <form className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full bg-[#05070f]/60 border border-white/[0.05] rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/10 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full bg-[#05070f]/60 border border-white/[0.05] rounded-xl py-2.5 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500/10 transition-all"
                  required
                />
              </div>
            </div>

            {message && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`text-xs text-center font-medium pt-1 ${message.isError ? 'text-rose-400' : 'text-zinc-400'}`}>
                {message.text}
              </motion.p>
            )}

            <div className="flex flex-col gap-2.5 pt-4">
              <button onClick={handleSignIn} disabled={loading} className="w-full flex items-center justify-center bg-zinc-100 hover:bg-white disabled:opacity-50 text-zinc-950 font-medium text-sm py-2.5 rounded-xl transition-all active:scale-[0.99] shadow-md cursor-pointer">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continue'}
              </button>
              
              <button onClick={handleSignUp} disabled={loading} className="w-full flex items-center justify-center bg-transparent hover:bg-white/[0.02] border border-white/[0.06] text-zinc-300 font-medium text-sm py-2.5 rounded-xl transition-all active:scale-[0.99] cursor-pointer">
                Create account
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
}