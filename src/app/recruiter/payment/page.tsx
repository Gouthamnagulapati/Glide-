'use client'

import { motion } from 'framer-motion'

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-[#030611] text-zinc-300 font-mono flex items-center justify-center p-6 overflow-hidden relative">
      
      {/* Fluid Background Animation */}
      <motion.div 
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 30%, #4f46e5 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, #7e22ce 0%, transparent 50%)",
            "radial-gradient(circle at 20% 30%, #4f46e5 0%, transparent 50%)"
          ] 
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-0 opacity-30"
      />

      {/* Main Card - 60% Width */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-[60%] border border-white/10 bg-[#050812]/40 backdrop-blur-2xl p-12 rounded-2xl text-center shadow-2xl"
      >
        <h1 className="text-purple-500 font-bold tracking-[0.3em] text-xl mb-6 uppercase">
          Authorization Required
        </h1>
        
        <p className="text-sm text-zinc-400 mb-10 leading-relaxed max-w-sm mx-auto">
          Accessing this candidate profile requires a premium verification credit. 
          Proceed to initiate the secure UPI transaction.
        </p>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          animate={{ 
            boxShadow: [
              "0 0 0px rgba(168, 85, 247, 0)", 
              "0 0 25px rgba(168, 85, 247, 0.5)", 
              "0 0 0px rgba(168, 85, 247, 0)"
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          onClick={() => alert("Connecting to payment gateway...")}
          className="bg-purple-600 hover:bg-purple-500 text-white py-4 px-12 rounded-lg text-sm uppercase font-bold tracking-widest transition-all w-full max-w-md"
        >
          Initialize UPI Payment
        </motion.button>
        
        <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
          Secure Tunnel v2.6-fluid
        </p>
      </motion.div>
    </div>
  )
}