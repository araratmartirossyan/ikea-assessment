/**
 * 
 * @param str Json string which you need validate
 * @returns False in case if JSON not valid
 */

export function isValidJSONString(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}