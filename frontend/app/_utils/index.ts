export const getGradeLevel = (gradeLevel: number) => {
  if (gradeLevel <= 6) return gradeLevel + "학년";
  if (gradeLevel >= 7 && gradeLevel <= 9) return gradeLevel-6 + "학년";
  if (gradeLevel >= 10 && gradeLevel <= 12) return gradeLevel-9 + "학년";
}

export const formatDate = (date: Date, separator: string = '-') => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  return [year, month.toString().padStart(2, '0'), day.toString().padStart(2, '0')].join(separator);
}

export const isNew = (date: Date) => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
}