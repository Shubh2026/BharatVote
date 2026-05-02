import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Quiz } from '../components/Quiz';
import { getQuizQuestions } from '../data/quiz-data';

// Global mocks for framer-motion are handled in setup.ts


// Mock firebase
vi.mock('@/lib/firebase', () => ({
  saveQuizResult: vi.fn().mockResolvedValue(undefined),
}));

// Mock analytics
vi.mock('@/lib/analytics', () => ({
  trackEvent: vi.fn(),
}));

const questions = getQuizQuestions('en');

describe('Quiz Component Integration Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('completes the full quiz flow and calculates score correctly', async () => {
    render(<Quiz questions={questions.slice(0, 3)} lang="en" />); // Use 3 questions for speed

    // Question 1
    expect(screen.getByText(questions[0].q)).toBeInTheDocument();
    const correctIdx1 = questions[0].answer;
    fireEvent.click(screen.getByText(questions[0].options[correctIdx1]));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next Question'));

    // Question 2 (wrong answer)
    expect(screen.getByText(questions[1].q)).toBeInTheDocument();
    const wrongIdx2 = questions[1].answer === 0 ? 1 : 0;
    fireEvent.click(screen.getByText(questions[1].options[wrongIdx2]));
    expect(screen.getByText('Incorrect')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next Question'));

    // Question 3
    expect(screen.getByText(questions[2].q)).toBeInTheDocument();
    const correctIdx3 = questions[2].answer;
    fireEvent.click(screen.getByText(questions[2].options[correctIdx3]));
    expect(screen.getByText('Correct!')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Finish Quiz'));

    // Verify Score Screen
    expect(screen.getByText('Quiz Completed!')).toBeInTheDocument();
    expect(screen.getByText('2/3')).toBeInTheDocument();
    
    // Test replay
    fireEvent.click(screen.getByText('Try Again'));
    expect(screen.getByText(questions[0].q)).toBeInTheDocument();
  });
});
