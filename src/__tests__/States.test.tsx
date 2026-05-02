import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { States } from '@/components/States';

describe('States Component', () => {
  it('renders and filters states', () => {
    render(<States lang="en" />);

    expect(screen.getByText(/State & UT Information/i)).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText(/Search state or Union Territory/i);
    fireEvent.change(searchInput, { target: { value: 'Uttar Pradesh' } });

    expect(screen.getByText(/Uttar Pradesh/i)).toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: 'NonExistentState' } });
    expect(screen.queryByText(/Uttar Pradesh/i)).not.toBeInTheDocument();
    expect(screen.getByText(/No states found/i)).toBeInTheDocument();
  });
});
