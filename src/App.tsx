import { useState, useEffect, lazy, Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages, MapPin, CheckCircle2, Info, MessageSquare } from "lucide-react";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

// Lazy loaded components
const Timeline = lazy(() => import("@/components/Timeline").then(m => ({ default: m.Timeline })));
const Wizard = lazy(() => import("@/components/Wizard").then(m => ({ default: m.Wizard })));
const Quiz = lazy(() => import("@/components/Quiz").then(m => ({ default: m.Quiz })));
const FAQ = lazy(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })));
const States = lazy(() => import("@/components/States").then(m => ({ default: m.States })));
const AIChat = lazy(() => import("@/components/AIChat").then(m => ({ default: m.AIChat })));

function App() {
  const [lang, setLang] = useState<'en' | 'hi'>(() => {
    return (localStorage.getItem('lang') as 'en' | 'hi') || 'en';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = {
    en: {
      title: "BharatVote Guide",
      subtitle: "Your comprehensive companion for the Indian General Elections",
      hero_cta: "Start Your Voting Journey",
      tab_timeline: "Timeline",
      tab_guide: "Step-by-Step Guide",
      tab_quiz: "Election Quiz",
      tab_states: "State Info",
      tab_faq: "FAQ",
      tab_ai: "AI Assistant",
      footer: "Developed for a stronger democracy. Empowering 1.4 billion voices.",
    },
    hi: {
      title: "भारतवोट गाइड",
      subtitle: "भारतीय आम चुनावों के लिए आपका व्यापक साथी",
      hero_cta: "अपनी मतदान यात्रा शुरू करें",
      tab_timeline: "समयरेखा",
      tab_guide: "चरण-दर-चरण मार्गदर्शिका",
      tab_quiz: "चुनाव प्रश्नोत्तरी",
      tab_states: "राज्य की जानकारी",
      tab_faq: "सामान्य प्रश्न",
      tab_ai: "AI सहायक",
      footer: "एक मजबूत लोकतंत्र के लिए विकसित। 1.4 अरब आवाजों को सशक्त बनाना।",
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 font-sans selection:bg-accent/30">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-800/50 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">B</div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t[lang].title}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
              title={lang === 'en' ? "Switch to Hindi" : "अंग्रेजी में बदलें"}
            >
              <Languages size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
              title={theme === 'light' ? "Dark Mode" : "Light Mode"}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30 dark:opacity-10 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] rounded-full bg-primary/20 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-accent/20 blur-[120px]" />
          </div>
          
          <div className="container mx-auto px-4 text-center space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {lang === 'en' ? 'Election 2024 Special Edition' : 'चुनाव 2024 विशेष संस्करण'}
            </div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700">
              {t[lang].subtitle}
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
              {lang === 'en' 
                ? "Every vote counts in shaping India's future. Join the democratic festival with knowledge and confidence."
                : "भारत के भविष्य को आकार देने में हर वोट मायने रखता है। ज्ञान और आत्मविश्वास के साथ लोकतांत्रिक उत्सव में शामिल हों।"}
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
              <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                {t[lang].hero_cta}
              </Button>
              <Button variant="outline" size="lg" className="rounded-full px-8 backdrop-blur-sm">
                {lang === 'en' ? 'Watch Guide' : 'गाइड देखें'}
              </Button>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <div className="container mx-auto px-4 pb-20">
          <Tabs defaultValue="timeline" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="h-14 p-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl inline-flex overflow-x-auto no-scrollbar max-w-full">
                <TabsTrigger value="timeline" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <span className="flex items-center gap-2 whitespace-nowrap"><Info size={16} /> {t[lang].tab_timeline}</span>
                </TabsTrigger>
                <TabsTrigger value="guide" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <span className="flex items-center gap-2 whitespace-nowrap"><CheckCircle2 size={16} /> {t[lang].tab_guide}</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <span className="flex items-center gap-2 whitespace-nowrap"><MapPin size={16} /> {t[lang].tab_quiz}</span>
                </TabsTrigger>
                <TabsTrigger value="states" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <span className="flex items-center gap-2 whitespace-nowrap"><MapPin size={16} /> {t[lang].tab_states}</span>
                </TabsTrigger>
                <TabsTrigger value="faq" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <span className="flex items-center gap-2 whitespace-nowrap"><Info size={16} /> {t[lang].tab_faq}</span>
                </TabsTrigger>
                <TabsTrigger value="ai" className="rounded-full px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <span className="flex items-center gap-2 whitespace-nowrap"><MessageSquare size={16} /> {t[lang].tab_ai}</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <Suspense fallback={<LoadingSkeleton />}>
              <TabsContent value="timeline" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <Timeline lang={lang} />
              </TabsContent>
              <TabsContent value="guide" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <Wizard lang={lang} />
              </TabsContent>
              <TabsContent value="quiz" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <Quiz lang={lang} />
              </TabsContent>
              <TabsContent value="states" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <States lang={lang} />
              </TabsContent>
              <TabsContent value="faq" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <FAQ lang={lang} />
              </TabsContent>
              <TabsContent value="ai" className="animate-in fade-in slide-in-from-bottom-4 duration-500 outline-none">
                <div className="max-w-4xl mx-auto">
                  <AIChat lang={lang} />
                </div>
              </TabsContent>
            </Suspense>
          </Tabs>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">B</div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {t[lang].title}
            </h1>
          </div>
          <p className="text-slate-500 text-sm max-w-md text-center md:text-right">
            {t[lang].footer}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
