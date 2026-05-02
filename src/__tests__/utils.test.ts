import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('Utility Tests', () => {
  describe('cn (Tailwind Merge)', () => {
    it('should merge classes correctly', () => {
      expect(cn('p-4', 'p-2')).toBe('p-2');
      expect(cn('flex', 'items-center')).toBe('flex items-center');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const isHidden = false;
      expect(cn('base', isActive && 'active', isHidden && 'hidden')).toBe('base active');
    });
  });
});
