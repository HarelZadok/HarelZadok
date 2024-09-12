export function isBeta() {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    return hostname.startsWith('beta.');
  }
  return false;
}
