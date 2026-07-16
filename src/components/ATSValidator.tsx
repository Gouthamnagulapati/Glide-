'use client'
import { calculateScore } from '@/lib/atsEngine';

export default function ATSValidator({ resumeData }: { resumeData: any }) {
  const { score, report } = calculateScore(resumeData);
  
  // Dynamic color coding based on industry standards
  const getScoreColor = (s: number) => {
    if (s >= 80) return "text-green-400";
    if (s >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="bg-black/40 p-8 border border-white/10 rounded-2xl backdrop-blur-2xl transition-all duration-500 shadow-2xl">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-6">
        ATS Impact Score
      </h2>
      
      <div className="flex items-baseline gap-2 mb-8">
        <span className={`text-6xl font-black italic ${getScoreColor(score)}`}>
          {score}
        </span>
        <span className="text-xl text-white/30 font-light">/ 100</span>
      </div>

      <div className="space-y-4">
        {report.length > 0 ? (
          report.map((item, i) => (
            <div key={i} className="flex gap-3 text-xs text-white/60 bg-white/5 p-3 rounded-lg border border-white/5">
              <span className="text-blue-400 mt-0.5">ⓘ</span>
              <p>{item}</p>
            </div>
          ))
        ) : (
          <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest bg-green-400/10 p-4 rounded-lg">
            <span>✓</span> Profile Optimized for ATS
          </div>
        )}
      </div>
    </div>
  );
}