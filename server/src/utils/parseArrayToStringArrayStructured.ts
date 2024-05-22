export const parseArrayToStringArrayStructured = (array: Array<string>): string => {
  return `[${array.map((string) => `"${string}"`).join(", ")}]`;
}