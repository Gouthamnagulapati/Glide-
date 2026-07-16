// src/components/responsive/ResponsiveGrid.tsx
import React from 'react';

interface ResponsiveGridProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  className?: string;
  // Added a variant to allow us to choose 'list' or 'grid' mode
  variant?: 'grid' | 'list'; 
}

export default function ResponsiveGrid({ 
  children, 
  sidebar, 
  className = "",
  variant = 'grid'
}: ResponsiveGridProps) {
  
  if (!sidebar) {
    // If it's a list (like your dashboard), use flex-col instead of grid
    // This allows children to define their own responsive width (full width)
    if (variant === 'list') {
      return (
        <div className={`flex flex-col gap-4 w-full ${className}`}>
          {children}
        </div>
      );
    }

    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:grid lg:grid-cols-12 gap-8 w-full ${className}`}>
      {/* Sidebar: Add padding/container breathing room for mobile */}
      <aside className="lg:col-span-3 w-full px-2">
        {sidebar}
      </aside>
      <main className="lg:col-span-9 w-full">
        {children}
      </main>
    </div>
  );
}