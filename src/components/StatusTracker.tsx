'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

// Defining the expected properties to fix the 'any' type errors
interface StatusTrackerProps {
  applicationId: string;
  initialStatus: string;
  className?: string;
}

export default function StatusTracker({ applicationId, initialStatus, className }: StatusTrackerProps) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    const channel = supabase.channel(`status-update-${applicationId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'applications',
        filter: `id=eq.${applicationId}` 
      }, (payload) => {
        // @ts-ignore - payload.new is dynamic based on database schema
        setStatus(payload.new.current_milestone);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel) };
  }, [applicationId]);

  return <span className={className}>{status}</span>;
}