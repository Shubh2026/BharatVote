import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { rateLimit } from 'express-rate-limit';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

/** Production Cloud Run origin — used for CORS restriction. */
const ALLOWED_ORIGIN = 'https://bharatvote-95155929385.asia-south1.run.app';

/** Maximum prompt length accepted by the proxy. */
const MAX_PROMPT_LENGTH = 500;

// ── Security: HTTP headers via helmet ────────────────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // Handled by nginx for the static frontend
}));

// ── Security: CORS — restricted to production domain in prod, open in dev ───
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' ? ALLOWED_ORIGIN : true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

// ── Security: Rate limiting ──────────────────────────────────────────────────
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(limiter);

app.use(express.json());

// ── Request logger (no sensitive data) ──────────────────────────────────────
app.use((req, _res, next) => {
  const ts = new Date().toISOString();
  console.log(`[${ts}] ${req.method} ${req.path}`);
  next();
});

// ── Serve static files from the Vite build directory ────────────────────────
app.use(express.static(path.join(__dirname, 'dist')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/chat', async (req, res) => {
  // ── Input validation ───────────────────────────────────────────────────────
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  const { messages, lang } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages must be a non-empty array.' });
  }

  const lastMessage = messages[messages.length - 1]?.content;

  if (!lastMessage || typeof lastMessage !== 'string' || !lastMessage.trim()) {
    return res.status(400).json({ error: 'Invalid request: prompt must be a non-empty string.' });
  }

  if (lastMessage.trim().length > MAX_PROMPT_LENGTH) {
    return res.status(400).json({
      error: `Invalid request: prompt exceeds maximum length of ${MAX_PROMPT_LENGTH} characters.`
    });
  }

  try {
    let model;
    try {
      // Try with Google Search Grounding first
      model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        tools: [{ googleSearchRetrieval: {} }],
        systemInstruction: {
          role: "system",
          parts: [{ text: `You are an expert AI assistant for "BharatVote Guide", an interactive platform to educate Indian citizens about the election process.
            Provide accurate, unbiased, and helpful information about:
            - Voter registration and eligibility
            - Polling process (EVM, VVPAT, NOTA)
            - Election timeline and phases
            - Candidate requirements
            - Election Commission of India (ECI) rules
            - Indian democracy and Constitution

            Respond in the language the user speaks (${lang === 'en' ? 'English' : 'Hindi'}).
            Keep responses concise, professional, and use markdown for formatting.
            If you don't know something, suggest checking the official ECI website (eci.gov.in).` }]
        }
      });
    } catch (toolError) {
      console.warn('Failed to initialize model with tools, falling back to basic model:', toolError);
      model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash-latest",
        systemInstruction: {
          role: "system",
          parts: [{ text: `You are an expert AI assistant for "BharatVote Guide". Respond in ${lang === 'en' ? 'English' : 'Hindi'}. Keep responses concise and use markdown.` }]
        }
      });
    }

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    // Gemini SDK requires history to start with a 'user' role if present
    const validHistory = history.length > 0 && history[0].role === 'model' ? history.slice(1) : history;

    const chat = model.startChat({
      history: validHistory,
      generationConfig: { maxOutputTokens: 1000 },
    });

    const result = await chat.sendMessage(lastMessage);
    const response = await result.response;
    const text = response.text();
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;

    res.json({ text, groundingMetadata });
  } catch (error) {
    console.error('[API] Gemini error:', error instanceof Error ? error.message : error);

    if (error instanceof Error && (error.message.includes('tools') || error.message.includes('grounding'))) {
      try {
        const basicModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const basicResult = await basicModel.generateContent(lastMessage);
        const basicResponse = await basicResult.response;
        return res.json({ text: basicResponse.text() });
      } catch (innerError) {
        return res.status(500).json({ error: 'Failed to communicate with Gemini AI' });
      }
    }
    res.status(500).json({ error: 'Failed to communicate with Gemini AI' });
  }
});

// ── Fallback to index.html for SPA routing ───────────────────────────────────
app.get(/^(?!\/api).+/, (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${port}`);
});

export default app;
