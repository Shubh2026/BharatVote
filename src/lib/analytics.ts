/**
 * Google Analytics 4 Custom Event Tracker
 * Usage: trackEvent('quiz_started') or trackEvent('language_switched', { lang: 'hi' })
 */

declare global {
  interface Window {
    gtag: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, any>
    ) => void;
  }
}

export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
    console.log(`[Analytics] Tracked event: ${eventName}`, eventParams || '');
  } else {
    console.warn('[Analytics] gtag not found. Event skipped:', eventName);
  }
};
