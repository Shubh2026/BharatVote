import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import React from 'react';

// Runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});

// Mock framer-motion globally to avoid animation issues and prop warnings
const motionProps = [
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileInView', 'viewport', 'layout',
  'onAnimationStart', 'onAnimationComplete', 'onUpdate',
  'onHoverStart', 'onHoverEnd', 'onTapStart', 'onTap', 'onTapCancel',
  'onPanStart', 'onPan', 'onPanEnd'
];

const filterProps = (props: any) => {
  const filtered = { ...props };
  motionProps.forEach(p => delete filtered[p]);
  return filtered;
};

vi.mock('framer-motion', () => ({
  motion: {
    div: React.forwardRef(({ children, ...props }: any, ref) => (
      <div {...filterProps(props)} ref={ref}>{children}</div>
    )),
    button: React.forwardRef(({ children, ...props }: any, ref) => (
      <button {...filterProps(props)} ref={ref}>{children}</button>
    )),
    span: React.forwardRef(({ children, ...props }: any, ref) => (
      <span {...filterProps(props)} ref={ref}>{children}</span>
    )),
    p: React.forwardRef(({ children, ...props }: any, ref) => (
      <p {...filterProps(props)} ref={ref}>{children}</p>
    )),
    h1: React.forwardRef(({ children, ...props }: any, ref) => (
      <h1 {...filterProps(props)} ref={ref}>{children}</h1>
    )),
    h2: React.forwardRef(({ children, ...props }: any, ref) => (
      <h2 {...filterProps(props)} ref={ref}>{children}</h2>
    )),
    h3: React.forwardRef(({ children, ...props }: any, ref) => (
      <h3 {...filterProps(props)} ref={ref}>{children}</h3>
    )),
    li: React.forwardRef(({ children, ...props }: any, ref) => (
      <li {...filterProps(props)} ref={ref}>{children}</li>
    )),
    ul: React.forwardRef(({ children, ...props }: any, ref) => (
      <ul {...filterProps(props)} ref={ref}>{children}</ul>
    )),
    nav: React.forwardRef(({ children, ...props }: any, ref) => (
      <nav {...filterProps(props)} ref={ref}>{children}</nav>
    )),
    section: React.forwardRef(({ children, ...props }: any, ref) => (
      <section {...filterProps(props)} ref={ref}>{children}</section>
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { onChange: vi.fn() } }),
  useSpring: (val: any) => val,
}));

// Mock react-markdown and remark-gfm
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => <div data-testid="markdown">{children}</div>,
}));
vi.mock('remark-gfm', () => ({ default: () => {} }));

