import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AIChat } from '@/components/AIChat';

// Mock the global fetch
global.fetch = vi.fn();

describe('AIChat Component', () => {
  it('renders correctly', () => {
    render(<AIChat lang="en" />);
    expect(screen.getByText(/BharatVote Assistant/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Ask about elections/i)).toBeInTheDocument();
  });

  it('sends a message and displays bot response', async () => {
    (fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ text: 'This is a test response from Gemini.' }),
    });

    render(<AIChat lang="en" />);
    
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const sendButton = screen.getByLabelText(/Send message/i);

    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    expect(screen.getByText('Hello')).toBeInTheDocument();
    
    await waitFor(() => {
      expect(screen.getByText('This is a test response from Gemini.')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    (fetch as any).mockRejectedValue(new Error('API Failure'));

    render(<AIChat lang="en" />);
    
    const input = screen.getByPlaceholderText(/Ask about elections/i);
    const sendButton = screen.getByLabelText(/Send message/i);

    fireEvent.change(input, { target: { value: 'Trigger Error' } });
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText(/having trouble connecting/i)).toBeInTheDocument();
    });
  });
});
