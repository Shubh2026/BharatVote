import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Wizard } from '../components/Wizard';
import { getWizardSteps } from '../data/election-data';

// Global mocks for framer-motion, react-markdown, and remark-gfm are handled in setup.ts


const enSteps = getWizardSteps('en');
const hiSteps = getWizardSteps('hi');

describe('Wizard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the first step by default', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
    expect(screen.getByText(enSteps[0].title)).toBeInTheDocument();
  });

  it('renders step indicators for every step', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    // Each step has an aria-label button
    const stepBtns = screen.getAllByRole('button', { name: /Go to step/i });
    expect(stepBtns).toHaveLength(enSteps.length);
  });

  it('Previous button is disabled on the first step', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    const prevBtn = screen.getByRole('button', { name: /Previous/i });
    expect(prevBtn).toBeDisabled();
  });

  it('Next button advances to the next step', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    const nextBtn = screen.getByRole('button', { name: /Next/i });
    fireEvent.click(nextBtn);
    expect(screen.getByText(/Step 2/i)).toBeInTheDocument();
    expect(screen.getByText(enSteps[1].title)).toBeInTheDocument();
  });

  it('Next button is disabled on the last step', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    // Navigate to last step
    for (let i = 0; i < enSteps.length - 1; i++) {
      fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    }
    expect(screen.getByRole('button', { name: /Next/i })).toBeDisabled();
  });

  it('Previous button navigates back', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    fireEvent.click(screen.getByRole('button', { name: /Next/i }));
    fireEvent.click(screen.getByRole('button', { name: /Previous/i }));
    expect(screen.getByText(/Step 1/i)).toBeInTheDocument();
  });

  it('clicking a step indicator jumps to that step', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    const step3Btn = screen.getByRole('button', { name: 'Go to step 3' });
    fireEvent.click(step3Btn);
    expect(screen.getByText(/Step 3/i)).toBeInTheDocument();
  });

  it('renders Hindi labels when lang is hi', () => {
    render(<Wizard steps={hiSteps} lang="hi" />);
    expect(screen.getByText(/चरण 1/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /अगला/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /पिछला/i })).toBeInTheDocument();
  });

  it('renders the step icon', () => {
    render(<Wizard steps={enSteps} lang="en" />);
    expect(screen.getByText(enSteps[0].icon)).toBeInTheDocument();
  });
});
