import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names intelligently, resolving conflicts.
 *
 * Combines `clsx` (for conditional class logic) with `tailwind-merge`
 * (to deduplicate and resolve conflicting Tailwind utility classes).
 *
 * @param inputs - Any number of class values: strings, arrays, or objects.
 * @returns A single merged class name string with no Tailwind conflicts.
 *
 * @example
 * cn('p-4', 'p-2')          // → 'p-2'  (p-4 is overridden)
 * cn('flex', isActive && 'text-primary') // → 'flex text-primary' or 'flex'
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
