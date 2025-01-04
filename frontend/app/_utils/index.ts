export const getGradeLevel = (gradeLevel: number) => {
  if (gradeLevel <= 6) return gradeLevel + "학년";
  if (gradeLevel >= 7 && gradeLevel <= 9) return gradeLevel-6 + "학년";
  if (gradeLevel >= 10 && gradeLevel <= 12) return gradeLevel-9 + "학년";
}