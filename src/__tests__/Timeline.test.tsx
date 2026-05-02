import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Timeline } from '../components/Timeline';
import { getTimelineData } from '../data/election-data';
import type { TimelineItem } from '../data/election-data';

// Global mocks for framer-motion are handled in setup.ts


const enData = getTimelineData('en');
const hiData = getTimelineData('hi');

describe('Timeline Component', () => {
  describe('Normal data (6 phases)', () => {
    it('renders all phase titles', () => {
      render(<Timeline data={enData} lang="en" />);
      enData.forEach(item => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('renders phase badges in English', () => {
      render(<Timeline data={enData} lang="en" />);
      enData.forEach(item => {
        expect(screen.getByText(`Phase ${item.phase}`)).toBeInTheDocument();
      });
    });

    it('renders phase badges in Hindi', () => {
      render(<Timeline data={hiData} lang="hi" />);
      hiData.forEach(item => {
        expect(screen.getByText(`चरण ${item.phase}`)).toBeInTheDocument();
      });
    });

    it('renders all phase dates', () => {
      render(<Timeline data={enData} lang="en" />);
      enData.forEach(item => {
        expect(screen.getByText(item.date)).toBeInTheDocument();
      });
    });

    it('renders all phase descriptions', () => {
      render(<Timeline data={enData} lang="en" />);
      enData.forEach(item => {
        expect(screen.getByText(item.desc)).toBeInTheDocument();
      });
    });

    it('renders "Learn More" buttons in English', () => {
      render(<Timeline data={enData} lang="en" />);
      const learnMoreBtns = screen.getAllByText('Learn More');
      expect(learnMoreBtns).toHaveLength(enData.length);
    });

    it('renders "अधिक जानें" in Hindi', () => {
      render(<Timeline data={hiData} lang="hi" />);
      const learnMoreBtns = screen.getAllByText('अधिक जानें');
      expect(learnMoreBtns).toHaveLength(hiData.length);
    });
  });

  describe('Edge case: empty data array', () => {
    it('renders without crashing when data is empty', () => {
      const { container } = render(<Timeline data={[]} lang="en" />);
      expect(container).toBeInTheDocument();
    });

    it('renders no phase cards when data is empty', () => {
      render(<Timeline data={[]} lang="en" />);
      expect(screen.queryByText(/Phase/i)).not.toBeInTheDocument();
    });
  });

  describe('Edge case: single item', () => {
    const singleItem: TimelineItem[] = [{
      phase: '1',
      title: 'Test Phase',
      icon: '📢',
      date: 'Jan 2025',
      desc: 'A single test phase description.',
      details: '• Detail one\n• Detail two',
    }];

    it('renders without crashing with a single item', () => {
      render(<Timeline data={singleItem} lang="en" />);
      expect(screen.getByText('Test Phase')).toBeInTheDocument();
    });

    it('renders exactly one phase badge', () => {
      render(<Timeline data={singleItem} lang="en" />);
      expect(screen.getAllByText('Phase 1')).toHaveLength(1);
    });

    it('renders the single item icon', () => {
      render(<Timeline data={singleItem} lang="en" />);
      // dicebear avatars are rendered for phase 1 items
      expect(screen.getByText('Test Phase')).toBeInTheDocument();
    });

    it('renders the date for a single item', () => {
      render(<Timeline data={singleItem} lang="en" />);
      expect(screen.getByText('Jan 2025')).toBeInTheDocument();
    });
  });
});
