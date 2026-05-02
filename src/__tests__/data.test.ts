import { describe, it, expect } from 'vitest';
import { getQuizQuestions } from '../data/quiz-data';
import { getTimelineData, getWizardSteps } from '../data/election-data';
import { getStatesList, getStateInfo } from '../data/state-data';

describe('Data Integrity Tests', () => {
  describe('Quiz Data', () => {
    it('should return questions for both English and Hindi', () => {
      const enQuestions = getQuizQuestions('en');
      const hiQuestions = getQuizQuestions('hi');
      
      expect(enQuestions.length).toBeGreaterThan(0);
      expect(hiQuestions.length).toBeGreaterThan(0);
      expect(enQuestions.length).toBe(hiQuestions.length);
    });

    it('should have valid question structure', () => {
      const questions = getQuizQuestions('en');
      questions.forEach(q => {
        expect(q).toHaveProperty('q');
        expect(q).toHaveProperty('options');
        expect(q).toHaveProperty('answer');
        expect(q).toHaveProperty('explanation');
        expect(q.options.length).toBeGreaterThan(1);
      });
    });
  });

  describe('Election Data', () => {
    it('should return timeline data', () => {
      const timeline = getTimelineData('en');
      expect(timeline.length).toBeGreaterThan(0);
      expect(timeline[0]).toHaveProperty('phase');
      expect(timeline[0]).toHaveProperty('title');
    });

    it('should return wizard steps', () => {
      const steps = getWizardSteps('en');
      expect(steps.length).toBeGreaterThan(0);
      expect(steps[0]).toHaveProperty('title');
    });
  });

  describe('State Data', () => {
    it('should list all states', () => {
      const states = getStatesList();
      expect(states.length).toBeGreaterThan(20);
    });

    it('should return valid state info', () => {
      const info = getStateInfo('Uttar Pradesh', 'en');
      expect(info).toBeDefined();
      expect(info?.capital).toBe('Lucknow');
    });
  });
});
