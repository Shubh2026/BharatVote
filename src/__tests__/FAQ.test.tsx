/**
 * FAQ Tests
 * The FAQ content is sourced from quiz-data and election-data.
 * These tests verify the data integrity that powers the Q&A section.
 */
import { describe, it, expect } from 'vitest';
import { getQuizQuestions } from '../data/quiz-data';
import { getTimelineData, getWizardSteps } from '../data/election-data';

describe('FAQ / Q&A Content Tests', () => {
  describe('Quiz Questions (used as FAQ items)', () => {
    it('returns 10 questions in English', () => {
      const questions = getQuizQuestions('en');
      expect(questions).toHaveLength(10);
    });

    it('returns 10 questions in Hindi', () => {
      const questions = getQuizQuestions('hi');
      expect(questions).toHaveLength(10);
    });

    it('every question has a non-empty question string', () => {
      getQuizQuestions('en').forEach((q, i) => {
        expect(q.q, `Question ${i} is empty`).toBeTruthy();
        expect(q.q.length, `Question ${i} too short`).toBeGreaterThan(5);
      });
    });

    it('every question has at least 2 options', () => {
      getQuizQuestions('en').forEach((q, i) => {
        expect(q.options.length, `Q${i} has fewer than 2 options`).toBeGreaterThanOrEqual(2);
      });
    });

    it('answer index is within options range for every question', () => {
      getQuizQuestions('en').forEach((q, i) => {
        expect(q.answer, `Q${i} answer out of bounds`).toBeGreaterThanOrEqual(0);
        expect(q.answer, `Q${i} answer out of bounds`).toBeLessThan(q.options.length);
      });
    });

    it('every question has a non-empty explanation', () => {
      getQuizQuestions('en').forEach((q, i) => {
        expect(q.explanation, `Q${i} has no explanation`).toBeTruthy();
      });
    });

    it('Hindi answers reference the same index as English answers', () => {
      const en = getQuizQuestions('en');
      const hi = getQuizQuestions('hi');
      en.forEach((q, i) => {
        expect(hi[i].answer).toBe(q.answer);
      });
    });
  });

  describe('Election Timeline (informational FAQ content)', () => {
    it('covers 6 phases in English', () => {
      const data = getTimelineData('en');
      expect(data).toHaveLength(6);
    });

    it('covers 6 phases in Hindi', () => {
      const data = getTimelineData('hi');
      expect(data).toHaveLength(6);
    });

    it('each phase has required fields', () => {
      getTimelineData('en').forEach((item, i) => {
        expect(item.phase, `phase ${i} missing`).toBeTruthy();
        expect(item.title, `title ${i} missing`).toBeTruthy();
        expect(item.desc, `desc ${i} missing`).toBeTruthy();
        expect(item.details, `details ${i} missing`).toBeTruthy();
        expect(item.icon, `icon ${i} missing`).toBeTruthy();
        expect(item.date, `date ${i} missing`).toBeTruthy();
      });
    });
  });

  describe('Wizard Steps (step-by-step FAQ content)', () => {
    it('has 6 steps in English', () => {
      expect(getWizardSteps('en')).toHaveLength(6);
    });

    it('has 6 steps in Hindi', () => {
      expect(getWizardSteps('hi')).toHaveLength(6);
    });

    it('step numbers are sequential starting at 1', () => {
      getWizardSteps('en').forEach((step, i) => {
        expect(step.step).toBe(i + 1);
      });
    });

    it('each step has non-empty content', () => {
      getWizardSteps('en').forEach((step, i) => {
        expect(step.content, `step ${i} has no content`).toBeTruthy();
        expect(step.content.length).toBeGreaterThan(20);
      });
    });
  });
});
