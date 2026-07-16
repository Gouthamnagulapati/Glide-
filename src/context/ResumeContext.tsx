'use client'
import { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your resume data
interface ResumeData {
  personal: { fullName: string; email: string; phone: string; location: string; summary: string }; // Added ;
  experience: any[];
  education: any;
  projects: any[];
  certifications: any[];
  skills: { technical: string; soft: string }; 
}

const ResumeContext = createContext<{
  data: ResumeData;
  setData: (data: ResumeData) => void;
} | null>(null);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  // Initial state structure - added summary: '' here
  const [data, setData] = useState<ResumeData>({
    personal: { fullName: '', email: '', phone: '', location: '', summary: '' },
    experience: [],
    education: { 
      ten: { school: '', year: '', percentage: '' }, 
      twelve: { school: '', year: '', percentage: '' }, 
      grad: { college: '', degree: '', year: '', cgpa: '' } 
    },
    projects: [],
    certifications: [],
    skills: { technical: '', soft: '' }
  });

  return (
    <ResumeContext.Provider value={{ data, setData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};