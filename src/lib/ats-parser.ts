export const parseResume = (data: any) => {
  const issues = [];
  if (!data.fullName) issues.push("MISSING_NAME");
  if (data.skills.length < 3) issues.push("NEED_MORE_SKILLS");
  
  return {
    score: issues.length === 0 ? 99 : 50,
    issues: issues,
    isPassable: issues.length === 0
  };
};