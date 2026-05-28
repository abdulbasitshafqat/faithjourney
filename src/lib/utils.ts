import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSurahSlug(id: number, nameSimple: string): string {
  const slug = nameSimple
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
  return `${id}-${slug}`;
}

export function getBookSlug(id: string): string {
  if (id === 'bukhari') return 'sahih-al-bukhari';
  if (id === 'muslim') return 'sahih-al-muslim';
  if (id === 'abudawud') return 'sunan-abu-dawud';
  return id;
}
