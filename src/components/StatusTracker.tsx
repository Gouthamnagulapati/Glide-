'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

interface StatusTrackerProps {
  applicationId: string;
  initialStatus: string;
  className?: string;
}

export default function StatusTracker({ applicationId, initialStatus, className }: StatusTrackerProps) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    // THIS IS THE LINE YOU ARE MISSING:
    const supabase = createClient(); 
    
    const channel = supabase.channel(`status-update-${applicationId}`)
      .on('postgres_changes', { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'applications',
        filter: `id=eq.${applicationId}` 
      }, (payload: any) => { // Adding : any here also fixes the second error
        setStatus(payload.new.current_milestone);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel) };
  }, [applicationId]);

  return <span className={className}>{status}</span>;
}