import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function generatePropertySlug(
  neighborhood: string,
  propertyType: string,
  rooms: number,
  id: string
): string {
  const neighborhoodSlug = neighborhood.toLowerCase().replace(/_/g, '-')
  const typeSlug = propertyType.toLowerCase().replace(/_/g, '-')
  const shortId = id.slice(-6)
  return `${neighborhoodSlug}-${typeSlug}-${rooms}-rooms-${shortId}`
}
