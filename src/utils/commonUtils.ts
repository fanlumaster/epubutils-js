/**
 * Get the innermost directory of a file path
 * @param path - The file path as a string
 * @returns The innermost directory as a string
 */
export function getInnermostDirectory(path: string): string {
  const parts = path.split("/");
  const newParts = parts.slice(0, parts.length - 1);
  return newParts.join("/");
}
