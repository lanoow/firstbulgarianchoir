import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLocaleFromPath(path: string) {
  const match = path.match(/^\/(en|bg)/);
  return match ? match[1] : null;
}

export function getPathWithLocale(path: string, locale: string) {
  return path.replace(/^\/(en|bg)/, `/${locale}`);
}

export function getPathWithoutLocale(path: string) {
  return path.replace(/^\/(en|bg)/, "");
}
