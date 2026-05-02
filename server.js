import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.API_PORT || 3000;

// Security: Rate limiting
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per windowMs
  message: { error: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

app.post('/api/chat', limiter, async (req, res) => {
  const { message, history, lang } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Gemini API key is not configured on the server.' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash-latest",
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
          
          Respond in the language the user speaks (${lang === 'hi' ? 'Hindi' : 'English'}). 
          Keep responses concise, professional, and use markdown for formatting. 
          If you don't know something, suggest checking the official ECI website (eci.gov.in).` }]
      }
    });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const result = await chat.sendMessage(message);
    const responseText = result.response.text();
    
    res.json({ text: responseText });
  } catch (error) {
    console.error('Gemini Proxy Error:', error);
    const status = error.status || 500;
    const message = error.message || 'An error occurred while communicating with Gemini.';
    res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`API Proxy Server running on port ${PORT}`);
});
