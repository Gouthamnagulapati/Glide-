// src/components/responsive/AdaptiveContainer.tsx
import React from 'react';

interface AdaptiveContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function AdaptiveContainer({ 
  children, 
  className = "" 
}: AdaptiveContainerProps) {
  return (
    // Added 'h-full' and 'flex flex-col' to ensure a vertical stack by default
    // Added 'overflow-x-hidden' to strictly prevent horizontal stretching
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-[1440px] flex flex-col h-full overflow-x-hidden ${className}`}>
      {children}
    </div>
  );
}