'use client'
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ATSValidator from '@/components/ATSValidator';
import BreathingBackground from '@/components/BreathingBackground';

export default function PreviewPage() {
  const [data, setData] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('resume-data');
    if (savedData) {
      try {
        setData(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse resume data:", e);
      }
    }
  }, []);

  const handleDownload = async () => {
    if (!printRef.current) return;
    try {
      const canvas = await html2canvas(printRef.current, { scale: 2, backgroundColor: '#ffffff' });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data?.personal?.fullName || 'Resume'}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  if (!data) return <main className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</main>;

  return (
    <main className="relative min-h-screen w-full flex flex-col lg:flex-row text-white overflow-hidden">
      <div className="fixed inset-0 z-0"><BreathingBackground /></div>

      {/* VISIBLE UI - GLASSMORPHIC */}
      <div className="relative z-10 w-full lg:w-2/3 p-6 md:p-20 border-r border-white/10 overflow-y-auto bg-black/30 backdrop-blur-md">
        <h1 className="text-3xl md:text-5xl font-black italic uppercase mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{data.personal?.fullName}</h1>
        
        <div className="space-y-8">
          <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-lg">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-4">Professional Summary</h2>
            <p className="text-white/80 leading-relaxed italic">{data.personal?.summary}</p>
          </div>

          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Experience</h2>
          {data.experience?.map((e: any, i: number) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"><p className="font-bold">{e.role} @ {e.company}</p><p className="text-white/60 text-sm">{e.summary}</p></div>
          ))}

          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Projects</h2>
          {data.projects?.map((p: any, i: number) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm"><p className="font-bold">{p.title}</p><p className="text-white/60 text-sm">{p.description}</p></div>
          ))}

          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Education</h2>
          {Object.entries(data.education || {}).map(([level, fields]: any, i: number) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5"><p className="text-blue-400 font-bold uppercase text-xs">{level}</p><p className="text-sm">{Object.values(fields).join(' - ')}</p></div>
          ))}
        </div>

        <button onClick={handleDownload} className="mt-10 px-8 py-4 bg-white/10 border border-white/20 backdrop-blur-md font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all rounded-full w-full lg:w-auto">Download PDF</button>
      </div>

      <div className="relative z-10 w-full lg:w-1/3 p-6 md:p-10 bg-black/40 backdrop-blur-xl">
        <ATSValidator resumeData={data} />
      </div>

      {/* HIDDEN PRINT CONTAINER - PROFESSIONAL WHITE THEME */}
      <div style={{ position: 'absolute', top: 0, left: 0, opacity: 0, zIndex: -1, pointerEvents: 'none', width: '100%' }}>
        <div ref={printRef} style={{ padding: '40px', backgroundColor: '#ffffff', color: '#000000', width: '800px', fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '5px' }}>{data.personal?.fullName}</h1>
          <div style={{ fontSize: '12px', color: '#555', marginBottom: '20px' }}>
            {data.personal?.email} | {data.personal?.phone} | {data.personal?.location}
          </div>
          
          <h3 style={{ fontSize: '14px', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>PROFESSIONAL SUMMARY</h3>
          <p style={{ fontSize: '13px', marginBottom: '20px', lineHeight: '1.4' }}>{data.personal?.summary}</p>

          <h3 style={{ fontSize: '14px', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>EXPERIENCE</h3>
          {data.experience?.map((e: any, i: number) => (
            <div key={i} style={{ marginBottom: '15px' }}>
              <p style={{ fontSize: '13px', fontWeight: 'bold', margin: 0 }}>{e.role} at {e.company}</p>
              <p style={{ fontSize: '12px', color: '#333', marginTop: '2px' }}>{e.summary}</p>
            </div>
          ))}

          <h3 style={{ fontSize: '14px', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>PROJECTS</h3>
          {data.projects?.map((p: any, i: number) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <p style={{ fontSize: '13px', fontWeight: 'bold', margin: 0 }}>{p.title}</p>
              <p style={{ fontSize: '12px', color: '#333', marginTop: '2px' }}>{p.description}</p>
            </div>
          ))}

          <div style={{ display: 'flex', gap: '40px', marginTop: '20px' }}>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '14px', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>EDUCATION</h3>
              {Object.entries(data.education || {}).map(([level, fields]: any, i: number) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <p style={{ fontSize: '12px', fontWeight: 'bold' }}>{level.toUpperCase()}</p>
                  <p style={{ fontSize: '11px' }}>{Object.values(fields).join(', ')}</p>
                </div>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '14px', borderBottom: '1px solid #000', paddingBottom: '2px', marginBottom: '10px' }}>SKILLS & CERTIFICATIONS</h3>
              <p style={{ fontSize: '12px' }}>{Object.values(data.skills || {}).join(', ')}</p>
              {data.certifications?.map((c: any, i: number) => (
                <p key={i} style={{ fontSize: '12px', margin: '0 0 5px 0' }}>{c.name} ({c.issuer})</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}