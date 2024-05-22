export const parseStringArrayStructuredToArray = (stringArray: string): Array<string> => {
  return stringArray.replace(/[\[\]'""]/g, "").split(',').map((string) => string.trim()).filter(item => item);
}