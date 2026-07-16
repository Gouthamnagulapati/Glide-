'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BreathingBackground from '@/components/BreathingBackground';
import PaymentButton from '@/components/PaymentButton';
import { createClient } from '@/utils/supabase/client';

export default function Payment() {
  const [selectedPlan] = useState({ name: 'Professional', price: 199 });
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    }
    getUser();
  }, [supabase]);
  
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4">
      <BreathingBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg p-8 bg-black/20 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <h1 className="text-2xl font-black text-white mb-6">Complete Payment</h1>
        
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
          <div className="flex justify-between text-white">
            <span>{selectedPlan.name} Plan</span>
            <span className="font-bold">₹{selectedPlan.price}</span>
          </div>
        </div>

        <div className="w-full">
          {/* Passed userId here */}
          <PaymentButton amount={selectedPlan.price} userId={userId} />
        </div>
        
        <p className="text-center mt-6 text-white/30 text-xs">
          Secure payment powered by Razorpay.
        </p>
      </motion.div>
    </main>
  );
}