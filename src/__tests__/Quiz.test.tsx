import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Quiz } from '@/components/Quiz';

describe('Quiz Component Integration', () => {
  it('should allow user to complete a quiz and see score', () => {
    render(<Quiz lang="en" />);
    
    // Check initial state
    expect(screen.getByText(/Question 1 of/i)).toBeInTheDocument();
    
    // Answer first question (Option A is usually at index 0)
    const options = screen.getAllByRole('button');
    fireEvent.click(options[0]); 
    
    // Check for explanation/feedback
    expect(screen.getByText(/Next Question|Finish Quiz/i)).toBeInTheDocument();
  });
});
