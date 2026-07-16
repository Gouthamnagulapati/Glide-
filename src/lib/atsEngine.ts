export const calculateScore = (data: any) => {
  if (!data) return { score: 0, report: [] };
  
  let score = 0;
  const report: string[] = [];

  // WEIGHTED SCORING CRITERIA
  
  // 1. Structural Integrity (20%)
  if (data.personal?.fullName && data.personal?.email && data.personal?.location && data.personal?.summary?.length > 100) {
    score += 20;
  } else {
    report.push("Professional summary is too short or missing contact info.");
  }

  // 2. Experience Quality (30%) - The "Greenhouse" standard
  const exp = data.experience || [];
  if (exp.length >= 2) {
    const detailedExp = exp.filter((e: any) => e.summary?.length > 150);
    if (detailedExp.length === exp.length) {
      score += 30; // Perfect quality
    } else {
      score += 15;
      report.push("Some experience entries lack sufficient detail (aim for 150+ chars).");
    }
  } else {
    report.push("Missing required work history (at least 2 roles recommended).");
  }

  // 3. Technical Competency & Keywords (25%)
  const skills = (data.skills?.technical || "").split(",").filter((s: string) => s.trim().length > 0);
  if (skills.length >= 5) {
    score += 25;
  } else {
    report.push("Add more technical skills to improve ATS keyword match rate.");
  }

  // 4. Project & Education Verification (25%)
  const projects = data.projects || [];
  const education = data.education || {};
  
  if (projects.length >= 1 && Object.keys(education).length > 0) {
    score += 25;
  } else {
    report.push("Missing verifiable education or project experience.");
  }

  return { score: Math.min(score, 100), report };
};