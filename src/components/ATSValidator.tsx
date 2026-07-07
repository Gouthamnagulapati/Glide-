'use client'
import { calculateScore } from '@/lib/atsEngine';

/**
 * ATSValidator component
 * This component accepts the entire resume object as a prop
 * and calculates the impact score in real-time.
 */
export default function ATSValidator({ resumeData }: { resumeData: any }) {
  // The calculation happens on every render. Because this is a child component,
  // it will re-render and update the score whenever the parent state updates.
  const { score, report } = calculateScore(resumeData);

  return (
    <div className="bg-black/40 p-6 border border-white/10 rounded-xl backdrop-blur-md">
      <h2 className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
        Real-Time Impact Score
      </h2>
      
      {/* SCORE DISPLAY */}
      <div className="text-5xl font-black italic mb-6">
        {score} <span className="text-xl text-white/20">/ 100</span>
      </div>
      
      {/* DIAGNOSTIC REPORT */}
      <div className="space-y-3">
        {report.length > 0 ? (
          report.map((item, i) => (
            <p key={i} className="text-xs text-blue-400 flex items-start">
              <span className="mr-2">⚡</span> {item}
            </p>
          ))
        ) : (
          <p className="text-xs text-green-400">
            ✅ Resume is fully optimized!
          </p>
        )}
      </div>
    </div>
  );
}