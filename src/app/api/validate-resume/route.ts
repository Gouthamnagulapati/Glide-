import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const resumeData = await req.json();

    // 1. Data Integrity Check: If sections are missing or empty, return 0
    const hasExperience = resumeData.experience && resumeData.experience.length > 0;
    const hasSkills = resumeData.skills && (resumeData.skills.technical?.length > 0 || resumeData.skills.soft?.length > 0);

    if (!hasExperience && !hasSkills) {
      return NextResponse.json({ 
        totalScore: 0, 
        insights: ["Start by adding your experience and skills to generate a score."] 
      });
    }

    // 2. Start Scoring
    let score = 0;
    let insights = [];

    // Metric Enforcement (35 points)
    // Checks for numbers followed by % or $ in summaries
    const hasMetrics = resumeData.experience.some((exp: any) => /\d+[%$]/.test(exp.summary));
    if (hasMetrics) {
      score += 35;
    } else {
      insights.push("Add specific metrics (%, $) to your experience for higher impact.");
    }

    // Keyword Anchoring (35 points)
    const requiredKeywords = ["Leadership", "Communication", "Scalability", "TypeScript"];
    const allText = JSON.stringify(resumeData);
    const foundKeywords = requiredKeywords.filter(word => allText.includes(word));
    
    score += (foundKeywords.length / requiredKeywords.length) * 35;
    if (foundKeywords.length < requiredKeywords.length) {
      insights.push("Include more high-value keywords like Leadership or Scalability.");
    }

    // Structural Integrity (30 points)
    if (hasExperience && hasSkills) {
      score += 30;
    } else {
      insights.push("Ensure all sections (Experience, Skills) are fully populated.");
    }

    // Final result calculation
    const finalScore = Math.min(Math.round(score), 99);
    
    return NextResponse.json({ 
      totalScore: finalScore,
      insights: insights.length > 0 ? insights : ["Your resume is perfectly optimized!"]
    });

  } catch (error) {
    return NextResponse.json({ totalScore: 0, insights: ["Error processing resume data."] }, { status: 400 });
  }
}