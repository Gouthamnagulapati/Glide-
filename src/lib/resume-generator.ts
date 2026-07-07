export const generateATSSchema = (formData: any) => {
  return {
    ...formData,
    generatedAt: new Date().toISOString()
  };
};