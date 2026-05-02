import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot, Loader2, RefreshCw, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/** Maximum number of characters allowed in a single message. */
const MAX_CHARS = 500;

interface Message {
  role: "user" | "bot";
  content: string;
  groundingMetadata?: {
    groundingChunks?: Array<{ web?: { uri: string; title: string } }>;
  };
}

interface AIChatProps {
  /** The active UI language: 'en' for English, 'hi' for Hindi. */
  lang: 'en' | 'hi';
}

/**
 * Strips HTML tags from a string to prevent XSS via the proxy.
 * @param raw - The raw user-supplied string.
 * @returns A plain-text string with all HTML tags removed.
 */
function stripHtml(raw: string): string {
  return raw.replace(/<[^>]*>/g, '');
}

/**
 * Sanitizes user input before sending to the server-side proxy.
 * - Strips HTML tags
 * - Trims whitespace
 * - Truncates to MAX_CHARS
 * @param raw - The raw value from the input field.
 * @returns A sanitized string.
 */
function sanitizeInput(raw: string): string {
  return stripHtml(raw).trim().slice(0, MAX_CHARS);
}

/**
 * AIChat component — a fully interactive AI chat panel backed by a
 * server-side Gemini proxy. User input is sanitized and validated
 * client-side before dispatch; a character counter enforces the limit.
 *
 * @param props - {@link AIChatProps}
 */
export function AIChat({ lang }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: lang === 'en'
        ? "Namaste! I am your BharatVote Assistant. How can I help you today regarding Indian elections?"
        : "नमस्ते! मैं आपका भारतवोट सहायक हूँ। भारतीय चुनावों के बारे में मैं आज आपकी क्या सहायता कर सकता हूँ?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const charsRemaining = MAX_CHARS - input.length;
  const isOverLimit = charsRemaining < 0;
  const isSendDisabled = isLoading || !input.trim() || isOverLimit;

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    const sanitized = sanitizeInput(input);
    if (!sanitized || isLoading || isOverLimit) return;

    setInput("");
    setMessages(prev => [...prev, { role: "user", content: sanitized }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: sanitized }],
          lang: lang
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { error?: string };
        throw new Error(errorData.error || 'Failed to get response from AI');
      }

      const data = await response.json() as { text: string; groundingMetadata?: Message['groundingMetadata'] };
      setMessages(prev => [...prev, {
        role: "bot",
        content: data.text,
        groundingMetadata: data.groundingMetadata
      }]);
    } catch (error: unknown) {
      console.error("Chat Error:", error);

      const errMsg = error instanceof Error ? error.message : '';
      let errorMessage = lang === 'en'
        ? "Sorry, I encountered an error. Please try again later."
        : "क्षमा करें, मुझे एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।";

      if (errMsg.includes('API key')) {
        errorMessage = lang === 'en'
          ? "The server is not configured correctly. Please contact support."
          : "सर्वर सही ढंग से कॉन्फ़िगर नहीं किया गया है।";
      }

      setMessages(prev => [...prev, {
        role: "bot",
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: "bot",
      content: lang === 'en'
        ? "Namaste! I am your BharatVote Assistant. How can I help you today regarding Indian elections?"
        : "नमस्ते! मैं आपका भारतवोट सहायक हूँ। भारतीय चुनावों के बारे में मैं आज आपकी क्या सहायता कर सकता हूँ?"
    }]);
  };

  return (
    <Card className="h-[600px] flex flex-col shadow-xl shadow-primary/5 border-0 rounded-3xl overflow-hidden relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-primary" />
      <CardHeader className="flex flex-row items-center justify-between border-b border-muted/50 bg-muted/10 py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-blue-600 flex items-center justify-center text-white shadow-md">
            <Bot size={20} />
          </div>
          <div>
            <CardTitle className="text-lg font-bold">{lang === 'en' ? 'AI Assistant' : 'AI सहायक'}</CardTitle>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {lang === 'en' ? 'Online' : 'ऑनलाइन'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={clearChat} title="Clear Chat" className="rounded-full hover:bg-muted/50">
          <RefreshCw size={18} className="text-muted-foreground" />
        </Button>
      </CardHeader>

      <CardContent className="flex-1 overflow-hidden p-0 bg-slate-50/50 dark:bg-slate-950/50">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <Avatar className={`w-8 h-8 border ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground"}`}>
                  <AvatarFallback className="text-xs">
                    {m.role === "user" ? <User size={14} /> : <Bot size={14} />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted text-foreground rounded-tl-none border shadow-sm"
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {m.content}
                    </ReactMarkdown>

                    {/* Grounding Citations */}
                    {m.groundingMetadata?.groundingChunks && (
                      <div className="mt-4 pt-3 border-t border-muted-foreground/20">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                          <ExternalLink size={10} />
                          {lang === 'en' ? 'Sources' : 'स्रोत'}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {m.groundingMetadata.groundingChunks.map((chunk, cIdx) => (
                            chunk.web && (
                              <a
                                key={cIdx}
                                href={chunk.web.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] bg-muted-foreground/10 hover:bg-accent hover:text-white px-2 py-1 rounded-md transition-colors flex items-center gap-1 max-w-[150px] truncate"
                                title={chunk.web.title}
                              >
                                {cIdx + 1}. {chunk.web.title}
                              </a>
                            )
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 border bg-accent text-accent-foreground">
                  <AvatarFallback><Bot size={14} /></AvatarFallback>
                </Avatar>
                <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-none border shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 border-t border-muted/50 bg-white dark:bg-slate-900 flex-col gap-1 items-stretch">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex w-full gap-3 items-center bg-muted/30 p-1.5 rounded-full border focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-accent transition-all"
        >
          <Input
            placeholder={lang === 'en' ? "Ask about elections..." : "चुनावों के बारे में पूछें..."}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            maxLength={MAX_CHARS + 10}
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
            aria-label={lang === 'en' ? "Chat message input" : "संदेश इनपुट"}
          />
          <Button
            type="submit"
            disabled={isSendDisabled}
            size="icon"
            className="bg-gradient-to-r from-accent to-blue-600 hover:opacity-90 shrink-0 rounded-full w-10 h-10 shadow-md transition-transform active:scale-95"
            aria-label={lang === 'en' ? "Send message" : "संदेश भेजें"}
          >
            <Send size={16} className="text-white ml-0.5" />
          </Button>
        </form>
        {/* Character counter */}
        <p
          className={`text-xs text-right pr-2 tabular-nums transition-colors ${
            isOverLimit
              ? 'text-red-500 font-semibold'
              : charsRemaining <= 50
              ? 'text-amber-500'
              : 'text-muted-foreground'
          }`}
          aria-live="polite"
          aria-label={`${charsRemaining} characters remaining`}
        >
          {charsRemaining < MAX_CHARS ? `${charsRemaining} / ${MAX_CHARS}` : ''}
        </p>
      </CardFooter>
    </Card>
  );
}
