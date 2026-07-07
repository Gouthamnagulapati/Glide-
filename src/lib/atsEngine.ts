export const calculateScore = (data: any) => {
  if (!data) return { score: 0, report: [] };
  
  let score = 0;
  const report: string[] = [];

  // 1. Mandatory Fields
  if (data.personal?.fullName && data.personal?.email) score += 20;
  else report.push("Add your full name and email.");

  // 2. Experience Quality
  const expCount = data.experience?.length || 0;
  if (expCount >= 2) score += 30;
  else report.push("Add at least 2 relevant work experiences.");

  // 3. Keyword/Summary Impact
  const hasSummary = data.experience?.some((e: any) => e.summary?.length > 50);
  if (hasSummary) score += 30;
  else report.push("Ensure your experience summaries are detailed (50+ characters).");

  // 4. Projects
  if (data.projects?.length > 0) score += 20;
  else report.push("Add projects to showcase technical skills.");

  return { score: Math.min(score, 100), report };
};