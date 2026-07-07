'use client'
import { useResume } from '@/context/ResumeContext'
import { useRouter } from 'next/navigation'
import BreathingBackground from '@/components/BreathingBackground'

export default function BuilderPage() {
  const router = useRouter()
  const { data, setData } = useResume()

  const handleInputChange = (section: string, field: string, value: string, index?: number) => {
    if (index !== undefined) {
      const list = [...(data as any)[section]];
      list[index][field] = value;
      setData({ ...data, [section]: list });
    } else {
      setData({ ...data, [section]: { ...(data as any)[section], [field]: value } });
    }
  }

  const addEntry = (section: 'experience' | 'projects' | 'certifications') => {
    const templates = { 
      experience: { company: '', role: '', duration: '', summary: '' }, 
      projects: { title: '', techStack: '', description: '' }, 
      certifications: { name: '', issuer: '', year: '' } 
    };
    setData({ ...data, [section]: [...(data as any)[section], templates[section]] });
  }

  const handlePreview = () => {
    localStorage.setItem('resume-data', JSON.stringify(data))
    router.push('/builder/preview')
  }

  return (
    <main className="relative min-h-screen w-full">
      {/* Background container updated to force full viewport coverage */}
      <div className="fixed inset-0 z-0 h-screen w-full overflow-hidden">
        <BreathingBackground />
      </div>

      <div className="relative z-10 p-10 md:p-20 text-white">
        <div className="max-w-5xl mx-auto space-y-20">
          <header className="border-b border-white/10 pb-10">
            <h1 className="text-7xl font-black italic tracking-tighter">ARCHITECT.</h1>
            <p className="text-white/40 tracking-[0.3em] uppercase text-xs mt-2">Professional Data Composition</p>
          </header>

          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(data.personal).map(([key, value]) => (
                <input key={key} value={value} onChange={(e) => handleInputChange('personal', key, e.target.value)} placeholder={key.toUpperCase()} className="bg-white/5 border-b border-white/10 p-4 outline-none focus:border-blue-400 transition-all text-white placeholder-white/30" />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Education</h2>
            {Object.entries(data.education).map(([level, fields]) => (
              <div key={level} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                <span className="text-[10px] font-bold uppercase mb-4 block text-blue-400">{level}</span>
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(fields as object).map(([key, value]) => (
                    <input key={key} value={value as string} onChange={(e) => {
                      const updatedEdu = { ...data.education, [level]: { ...(data.education as any)[level], [key]: e.target.value } };
                      setData({ ...data, education: updatedEdu });
                    }} placeholder={key.toUpperCase()} className="bg-black/20 p-3 rounded-lg border border-white/5 text-white placeholder-white/30" />
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-6">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Skills</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(data.skills).map(([key, value]) => (
                <input key={key} value={value} onChange={(e) => setData({...data, skills: {...data.skills, [key]: e.target.value}})} placeholder={key.toUpperCase()} className="bg-white/5 border-b border-white/10 p-4 outline-none focus:border-blue-400 transition-all text-white placeholder-white/30" />
              ))}
            </div>
          </section>

          {(['experience', 'projects', 'certifications'] as const).map((section) => (
            <section key={section} className="space-y-6">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{section}</h2>
              {(data[section] as any[]).map((item, i) => (
                <div key={i} className="grid grid-cols-2 gap-4 bg-white/5 p-6 rounded-2xl border border-white/5">
                  {Object.keys(item).map(field => (
                    <input key={field} value={item[field]} onChange={(e) => handleInputChange(section, field, e.target.value, i)} placeholder={field.toUpperCase()} className="bg-black/20 p-3 rounded-lg border border-white/5 text-white placeholder-white/30" />
                  ))}
                </div>
              ))}
              <button onClick={() => addEntry(section)} className="text-[10px] uppercase tracking-widest border border-white/20 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">+ Add {section}</button>
            </section>
          ))}

          <button onClick={handlePreview} className="w-full py-10 border border-white/20 font-black uppercase tracking-[0.5em] hover:bg-blue-600 hover:border-blue-600 transition-all">
            Finalize Composition
          </button>
        </div>
      </div>
    </main>
  )
}