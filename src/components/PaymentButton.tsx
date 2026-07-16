'use client';
import { useState } from 'react';
import Script from 'next/script';

export default function PaymentButton({ amount, userId }: { amount: number, userId: string | null }) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!userId) {
      alert("Please log in to make a payment.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount }),
      });
      const { orderId } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        order_id: orderId,
        theme: { color: "#ffffff" },
        handler: async (response: any) => {
          const verifyRes = await fetch('/api/verify-payment', {
            method: 'POST',
            body: JSON.stringify({ ...response, userId }), // Sending userId here
          });
          const result = await verifyRes.json();
          if (result.status === 'success') {
            alert('Payment Successful! You are now a premium member.');
          }
          setLoading(false);
        },
        modal: { ondismiss: () => setLoading(false) }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <button 
        onClick={handlePayment}
        disabled={loading || !userId}
        className={`w-full py-5 font-black text-center rounded-2xl transition-all active:scale-[0.98] 
          ${loading ? "bg-white/50 cursor-not-allowed" : "bg-white text-black hover:bg-white/90"}`}
      >
        {loading ? "Processing..." : `Pay ₹${amount}`}
      </button>
    </>
  );
}