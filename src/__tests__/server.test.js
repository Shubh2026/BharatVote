/**
 * Server proxy tests for server.js
 * Uses supertest to send real HTTP requests to the Express app.
 * The Gemini API is fully mocked via vi.mock.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';

// ── Mock @google/generative-ai before importing the app ──────────────────────
vi.mock('@google/generative-ai', () => {
  return {
    GoogleGenerativeAI: class {
      constructor() {}
      getGenerativeModel() {
        return {
          startChat: () => ({
            sendMessage: async () => ({
              response: {
                text: () => 'Mocked Gemini response',
                candidates: [{ groundingMetadata: null }],
              },
            }),
          }),
        };
      }
    },
  };
});

// Set env before importing the app so dotenv doesn't wipe it
process.env.GEMINI_API_KEY = 'test-key-123';
process.env.NODE_ENV = 'test';

const { default: app } = await import('../../server.js');

// ── Helper: build a valid request body ──────────────────────────────────────
const validBody = () => ({
  messages: [{ role: 'user', content: 'What is EVM?' }],
  lang: 'en',
});

describe('POST /api/chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 200 with a text field for a valid prompt', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send(validBody())
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('text');
    expect(typeof res.body.text).toBe('string');
  });

  it('returns 400 when prompt is an empty string', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ messages: [{ role: 'user', content: '' }], lang: 'en' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/non-empty/i);
  });

  it('returns 400 when prompt is whitespace only', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ messages: [{ role: 'user', content: '   ' }], lang: 'en' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/non-empty/i);
  });

  it('returns 400 when prompt exceeds 500 characters', async () => {
    const longPrompt = 'a'.repeat(501);
    const res = await request(app)
      .post('/api/chat')
      .send({ messages: [{ role: 'user', content: longPrompt }], lang: 'en' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/500/);
  });

  it('returns 400 when messages array is empty', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ messages: [], lang: 'en' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/non-empty array/i);
  });

  it('returns 400 when messages is not an array', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ messages: 'not-an-array', lang: 'en' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(400);
  });

  it('accepts a prompt of exactly 500 characters', async () => {
    const exactPrompt = 'a'.repeat(500);
    const res = await request(app)
      .post('/api/chat')
      .send({ messages: [{ role: 'user', content: exactPrompt }], lang: 'en' })
      .set('Content-Type', 'application/json');

    expect(res.status).toBe(200);
  });

  it('includes helmet security headers in the response', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send(validBody())
      .set('Content-Type', 'application/json');

    // helmet sets X-Content-Type-Options by default
    expect(res.headers['x-content-type-options']).toBe('nosniff');
  });
});
