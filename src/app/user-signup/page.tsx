'use client';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the confirmation link!');
      router.push('/login');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleSignUp} className="p-8 border rounded shadow-md">
        <h1 className="mb-4 text-xl">Sign Up</h1>
        <input className="block w-full p-2 mb-2 border" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input className="block w-full p-2 mb-4 border" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full p-2 text-white bg-blue-600 rounded">Sign Up</button>
      </form>
    </div>
  );
}