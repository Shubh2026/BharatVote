/**
 * @module lib
 * Barrel exports for all utility functions and service integrations.
 * Import from this file for clean, single-source-of-truth imports:
 * @example
 * import { cn, trackEvent, saveQuizResult } from '@/lib';
 */
export { cn } from './utils';
export { trackEvent } from './analytics';
export { db, saveQuizResult } from './firebase';
