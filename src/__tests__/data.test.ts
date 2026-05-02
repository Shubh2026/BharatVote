import { describe, it, expect } from 'vitest';
import * as electionData from '@/data/election-data';
import * as quizData from '@/data/quiz-data';
import * as stateData from '@/data/state-data';

describe('Data validation', () => {
  it('should have valid election timeline data', () => {
    const timeline = electionData.getTimelineData('en');
    expect(Array.isArray(timeline)).toBe(true);
    expect(timeline.length).toBeGreaterThan(0);
    timeline.forEach(item => {
      expect(item).toHaveProperty('phase');
      expect(item).toHaveProperty('title');
    });
  });

  it('should have valid quiz data', () => {
    expect(Array.isArray(quizData.quizQuestions)).toBe(true);
    expect(quizData.quizQuestions.length).toBeGreaterThan(0);
    quizData.quizQuestions.forEach(q => {
      expect(q).toHaveProperty('q');
      expect(Array.isArray(q.options)).toBe(true);
      expect(typeof q.answer).toBe('number');
    });
  });

  it('should have valid state data', () => {
    expect(Array.isArray(stateData.statesData)).toBe(true);
    expect(stateData.statesData.length).toBeGreaterThan(0);
    stateData.statesData.forEach(state => {
      expect(state).toHaveProperty('id');
      expect(state).toHaveProperty('en_name');
      expect(state).toHaveProperty('hi_name');
      expect(typeof state.voters).toBe('number');
    });
  });
});
