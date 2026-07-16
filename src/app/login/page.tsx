'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { Lock, Mail, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    // Initialize the client here
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    
    if (error) {
      setMessage({ text: error.message, isError: true })
    } else {
      setMessage({ text: 'Welcome back! Redirecting...', isError: false })
      setTimeout(() => {
        router.push('/hub')
      }, 800)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative py-12 px-6">
      
      {/* GLIDE Watermark (Consistent with Signup page) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[20vw] font-black text-white/[0.03] tracking-tighter">
          GLIDE
        </h1>
      </div>

      {/* Login Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-20 w-full max-w-md p-8 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-white/50 text-sm">Enter your credentials to access your account.</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-white/20" />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-white/20" />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all"
              required
            />
          </div>

          {message && (
            <p className={`text-xs text-center ${message.isError ? 'text-red-400' : 'text-blue-400'}`}>
              {message.text}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all cursor-pointer"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Sign In'}
          </button>

          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              router.push('/usersignup'); 
            }} 
            className="w-full py-4 bg-white/5 border border-white/10 text-white font-medium rounded-2xl hover:bg-white/10 transition-all cursor-pointer"
          >
            Create an account
          </button>
        </form>
      </motion.div>
    </div>
  )
}