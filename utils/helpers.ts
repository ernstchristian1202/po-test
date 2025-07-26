export const generatePage = (name: string, icon: 'info' | 'doc' | 'check') => ({
  id: crypto.randomUUID(),
  name,
  icon,
});