import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Wizard } from '@/components/Wizard';

describe('Wizard Component', () => {
  it('renders and progresses through steps', async () => {
    render(<Wizard lang="en" />);
    
    // Step 1
    expect(screen.getByText(/Voter Registration/i)).toBeInTheDocument();
    
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    
    // Step 2
    await waitFor(() => {
      expect(screen.getByText(/Nomination Process/i)).toBeInTheDocument();
    });
  });
});
