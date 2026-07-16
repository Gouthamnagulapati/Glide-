export default function BreathingBackground() {
  return (
    // Changed z-50 to -z-10 so it sits behind all other content
    <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden">
      {/* GLIDE Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <h1 className="text-[20vw] font-black text-white/[0.03] tracking-tighter">
          GLIDE
        </h1>
      </div>

      {/* Breathing Orbs */}
      <div className="relative w-full h-full">
        {/* Orb 1 */}
        <div 
          className="absolute top-1/4 -left-10 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[150px] animate-breathe"
        />
        {/* Orb 2 - Staggered with style */}
        <div 
          className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[150px] animate-breathe"
          style={{ animationDelay: '2s' }} 
        />
      </div>
    </div>
  );
}