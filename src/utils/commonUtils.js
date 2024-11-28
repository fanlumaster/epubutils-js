/**
 * get the inner most directory of a file path
 * @param path
 * @returns
 */
export function getInnermostDirectory(path) {
  const parts = path.split("/");
  const newParts = parts.slice(0, parts.length - 1);
  return newParts.join("/");
}
