export const parseDateToString = (date: Date): string => {
  return new Date(date).toISOString();
}