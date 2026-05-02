import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot, Loader2, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "bot";
  content: string;
}

interface AIChatProps {
  lang: 'en' | 'hi';
}

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

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("DEBUG - Gemini API Key:", apiKey);

  if (!apiKey) {
    console.error("Gemini API key is missing");
  }

  const genAI = new GoogleGenerativeAI(apiKey || "missing_key");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    if (!apiKey) {
      setMessages(prev => [...prev, { 
        role: "bot", 
        content: lang === 'en'
          ? "API key not configured. Please add VITE_GEMINI_API_KEY to your .env file and restart the server."
          : "एपीआई कुंजी कॉन्फ़िगर नहीं की गई है। कृपया अपनी .env फ़ाइल में VITE_GEMINI_API_KEY जोड़ें।"
      }]);
      setIsLoading(false);
      return;
    }

    try {
      let history = messages.map(m => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));

      // Gemini SDK requires history to start with a 'user' role
      if (history.length > 0 && history[0].role === "model") {
        history.shift(); // Remove the initial bot greeting
      }

      const chat = model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 1000,
        },
        systemInstruction: `You are an expert AI assistant for "BharatVote Guide", an interactive platform to educate Indian citizens about the election process. 
          Provide accurate, unbiased, and helpful information about:
          - Voter registration and eligibility
          - Polling process (EVM, VVPAT, NOTA)
          - Election timeline and phases
          - Candidate requirements
          - Election Commission of India (ECI) rules
          - Indian democracy and Constitution
          
          Respond in the language the user speaks (${lang === 'en' ? 'English' : 'Hindi'}). 
          Keep responses concise, professional, and use markdown for formatting. 
          If you don't know something, suggest checking the official ECI website (eci.gov.in).`
      });

      const result = await chat.sendMessage(userMessage);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: "bot", content: responseText }]);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      
      let errorMessage = lang === 'en' 
        ? "Sorry, I encountered an error. Please check your API key or try again later." 
        : "क्षमा करें, मुझे एक त्रुटि हुई। कृपया अपनी API कुंजी जांचें या बाद में पुनः प्रयास करें।";

      if (!import.meta.env.VITE_GEMINI_API_KEY) {
        errorMessage = lang === 'en'
          ? "API Key is missing! If you just added it to the `.env` file, you need to **restart your development server** for Vite to load it."
          : "API कुंजी गायब है! यदि आपने इसे अभी `.env` फ़ाइल में जोड़ा है, तो आपको इसे लोड करने के लिए **अपना डेवलपमेंट सर्वर पुनरारंभ** करना होगा।";
      } else if (error?.message?.includes("API key not valid")) {
        errorMessage = lang === 'en'
          ? "The provided API key is invalid. Please check your `.env` file and ensure it is correct."
          : "प्रदान की गई API कुंजी अमान्य है। कृपया अपनी `.env` फ़ाइल जांचें।";
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

      <CardFooter className="p-4 border-t border-muted/50 bg-white dark:bg-slate-900">
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
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
          />
          <Button 
            type="submit" 
            disabled={isLoading || !input.trim()} 
            size="icon" 
            className="bg-gradient-to-r from-accent to-blue-600 hover:opacity-90 shrink-0 rounded-full w-10 h-10 shadow-md transition-transform active:scale-95"
          >
            <Send size={16} className="text-white ml-0.5" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
