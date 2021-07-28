export function debounce<Params extends any[]>(
  func: (...args: Params) => any,
): (timeout: number, ...args: Params) => void {
  let timer: NodeJS.Timeout;
  return (timeout: number, ...args: Params) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}