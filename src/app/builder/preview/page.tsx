'use client'
import { useEffect, useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import ATSValidator from '@/components/ATSValidator';
import BreathingBackground from '@/components/BreathingBackground';

export default function PreviewPage() {
  const [data, setData] = useState<any>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('resume-data');
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  const handleDownload = async () => {
    const element = resumeRef.current;
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, { 
        scale: 2, 
        backgroundColor: '#000000',
        onclone: (clonedDoc) => {
          // Aggressively remove stylesheets to prevent 'oklab' parsing errors
          const sheets = clonedDoc.styleSheets;
          for (let i = 0; i < sheets.length; i++) {
            try {
              if (sheets[i].ownerNode) {
                (sheets[i].ownerNode as HTMLElement).remove();
              }
            } catch (e) {
              console.warn("Could not remove stylesheet", e);
            }
          }
          
          // Inject basic, compatible styles
          const styleElement = clonedDoc.createElement('style');
          styleElement.innerHTML = `
            * { color: #ffffff !important; background-color: #000000 !important; font-family: sans-serif !important; }
          `;
          clonedDoc.head.appendChild(styleElement);
        }
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = data?.personal?.fullName 
        ? `${data.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf` 
        : 'Resume.pdf';
        
      pdf.save(fileName);
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("PDF generation failed. Please check the console for details.");
    }
  };

  if (!data) return <main className="min-h-screen bg-black text-white p-20">Loading Composition...</main>;

  return (
    <main className="relative min-h-screen w-full flex">
      {/* BACKGROUND ANIMATION */}
      <div className="fixed inset-0 z-0">
        <BreathingBackground />
      </div>

      {/* LEFT: THE RESUME LAYOUT */}
      <div 
        ref={resumeRef} 
        className="relative z-10 w-2/3 p-20 border-r border-white/10 overflow-y-auto bg-black text-white" 
        id="resume-content"
      >
        <header className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter uppercase">{data.personal.fullName}</h1>
          <p className="text-white/50 mt-2">{data.personal.email} • {data.personal.phone} • {data.personal.location}</p>
        </header>

        <section className="mb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-4">Experience</h3>
          {data.experience?.map((exp: any, i: number) => (
            <div key={i} className="mb-4">
              <h4 className="font-bold text-lg">{exp.role} @ {exp.company}</h4>
              <p className="text-white/60 text-sm">{exp.duration}</p>
              <p className="mt-2 text-white/80">{exp.summary}</p>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-4">Education</h3>
          <div className="grid grid-cols-2 gap-4">
            {data.education && Object.entries(data.education).map(([key, edu]: any) => (
              <div key={key} className="mb-2">
                <p className="font-bold">{edu.college || edu.school}</p>
                <p className="text-sm text-white/60">{edu.degree || edu.year}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-4">Projects</h3>
          {data.projects?.map((proj: any, i: number) => (
            <div key={i} className="mb-4">
              <h4 className="font-bold">{proj.title}</h4>
              <p className="text-sm text-blue-400">{proj.techStack}</p>
              <p className="text-white/80">{proj.description}</p>
            </div>
          ))}
        </section>

        <section className="mb-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500 mb-4">Certifications</h3>
          {data.certifications?.map((cert: any, i: number) => (
            <div key={i} className="flex justify-between mb-2">
              <p className="font-bold">{cert.name} <span className="text-white/50 font-normal">({cert.issuer})</span></p>
              <p className="text-sm text-white/60">{cert.year}</p>
            </div>
          ))}
        </section>

        <button 
          onClick={handleDownload} 
          className="mt-10 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
        >
          Download Actual PDF
        </button>
      </div>

      {/* RIGHT: THE ATS VALIDATOR */}
      <div className="relative z-10 w-1/3 p-10 bg-black/40 backdrop-blur-xl">
        <div className="sticky top-10">
          <ATSValidator resumeData={data} />
        </div>
      </div>
    </main>
  );
}