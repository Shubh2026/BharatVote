import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

// Lazy load components for performance
const Timeline = lazy(() => import("./components").then(module => ({ default: module.Timeline })));
const Wizard = lazy(() => import("./components").then(module => ({ default: module.Wizard })));
const Quiz = lazy(() => import("./components").then(module => ({ default: module.Quiz })));
const AIChat = lazy(() => import("./components").then(module => ({ default: module.AIChat })));

import { 
  getTimelineData, 
  getWizardSteps, 
  getQuizQuestions, 
  getStatesList, 
  getStateInfo 
} from "./data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Languages, 
  Moon, 
  Sun, 
  Calendar, 
  Info, 
  Zap, 
  MessageSquare, 
  Vote, 
  MapPin,
  ExternalLink
} from "lucide-react";

// Loading Skeleton for Lazy Loaded Components
const LoadingSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="w-12 h-12 text-primary" />
    </motion.div>
    <p className="text-muted-foreground font-medium animate-pulse">Loading experience...</p>
  </div>
);

function App() {
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedState, setSelectedState] = useState<string>("Uttar Pradesh");
  const [activeTab, setActiveTab] = useState<string>("timeline");

  // Sync theme with DOM
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const timelineData = getTimelineData(lang);
  const wizardSteps = getWizardSteps(lang);
  const quizQuestions = getQuizQuestions(lang);
  const stateInfo = getStateInfo(selectedState, lang);
  const states = getStatesList();

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const features = [
    {
      id: 'timeline',
      icon: <Calendar className="w-8 h-8" />,
      title: lang === 'en' ? 'Election Journey' : 'चुनावी यात्रा',
      desc: lang === 'en' ? 'Track every key date from announcement to the final results.' : 'घोषणा से लेकर अंतिम परिणामों तक हर महत्वपूर्ण तिथि को ट्रैक करें।',
      color: 'bg-primary/10 text-primary',
      hover: 'hover:bg-primary/20 hover:border-primary/40'
    },
    {
      id: 'wizard',
      icon: <Info className="w-8 h-8" />,
      title: lang === 'en' ? 'Voting Guide' : 'मतदान मार्गदर्शिका',
      desc: lang === 'en' ? 'Step-by-step instructions on how to register and cast your vote.' : 'पंजीकरण कैसे करें और अपना वोट कैसे डालें, इस पर चरण-दर-चरण निर्देश।',
      color: 'bg-secondary/10 text-secondary',
      hover: 'hover:bg-secondary/20 hover:border-secondary/40'
    },
    {
      id: 'quiz',
      icon: <Zap className="w-8 h-8" />,
      title: lang === 'en' ? 'Voter Quiz' : 'मतदाता प्रश्नोत्तरी',
      desc: lang === 'en' ? 'Test your knowledge and learn fun facts about Indian elections.' : 'अपने ज्ञान का परीक्षण करें और भारतीय चुनावों के बारे में मजेदार तथ्य जानें।',
      color: 'bg-accent/10 text-accent',
      hover: 'hover:bg-accent/20 hover:border-accent/40'
    },
    {
      id: 'chat',
      icon: <MessageSquare className="w-8 h-8" />,
      title: lang === 'en' ? 'AI Assistant' : 'AI सहायक',
      desc: lang === 'en' ? 'Get instant answers to your questions from our AI election expert.' : 'हमारे AI चुनाव विशेषज्ञ से अपने सवालों के तुरंत जवाब पाएं।',
      color: 'bg-orange-500/10 text-orange-500',
      hover: 'hover:bg-orange-500/20 hover:border-orange-500/40'
    }
  ];

  return (
    <div className="min-h-screen bg-background/95 text-foreground transition-colors duration-300 relative selection:bg-primary/30">
      {/* Global Subtle Map Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none bg-no-repeat bg-center opacity-10 dark:opacity-5 mix-blend-multiply dark:mix-blend-screen" 
        style={{ 
          backgroundImage: 'url("/india-map-bg.png")', 
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }} 
      />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg group-hover:shadow-primary/20 group-hover:-rotate-12 transition-all duration-300 text-white">
              <Vote className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">BharatVote</h1>
              <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold">India Election Guide</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Button variant="ghost" size="icon" onClick={toggleLang} className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <Languages className="w-5 h-5" />
              <span className="sr-only">Toggle Language</span>
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <div className="hidden sm:block ml-3">
              <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5 px-3 py-1 shadow-sm">
                {lang === 'en' ? 'Voter Awareness' : 'मतदाता जागरूकता'}
              </Badge>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        {/* Background Decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_center,rgba(255,153,51,0.05)_0%,transparent_70%)] -z-10" />
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-[20%] right-[5%] w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
        
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 flex flex-col items-center text-center overflow-hidden rounded-3xl">

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#FF9933] to-[#22C55E] p-5 rounded-3xl shadow-2xl mb-8 flex items-center justify-center text-white"
          >
            <Vote size={40} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="relative z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm mb-6 shadow-md border border-slate-200 dark:border-slate-700"
          >
            <Zap size={16} className="text-[#FF9933] fill-current" />
            <span className="tracking-wide uppercase">{lang === 'en' ? 'Empowering Every Vote' : 'हर वोट को सशक्त बनाना'}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-10 text-5xl md:text-7xl font-black tracking-tight text-slate-900 dark:text-white mb-8 max-w-5xl leading-[1.1]"
          >
            {lang === 'en' ? 'The Digital Compass for ' : 'भारतीय '}
            {lang === 'en' ? (
              <span className="drop-shadow-sm whitespace-nowrap">
                <span className="text-[#FF9933] drop-shadow-md">Indian</span>{' '}
                <span className="text-[#22C55E] drop-shadow-md">Democracy</span>
              </span>
            ) : (
              <span className="drop-shadow-sm whitespace-nowrap">
                <span className="text-[#FF9933] drop-shadow-md">लोकतंत्र का</span>{' '}
                <span className="text-[#22C55E] drop-shadow-md">डिजिटल कंपास</span>
              </span>
            )}
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 text-xl md:text-2xl text-slate-700 dark:text-slate-200 max-w-3xl leading-relaxed font-medium mb-12"
          >
            {lang === 'en' ? 'Your trusted companion to navigate the world\'s largest election process with confidence and clarity.' : 'दुनिया की सबसे बड़ी चुनाव प्रक्रिया को विश्वास और स्पष्टता के साथ नेविगेट करने के लिए आपका भरोसेमंद साथी।'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 flex flex-wrap justify-center gap-4"
          >
            <Button size="lg" className="h-14 px-8 rounded-2xl text-lg font-bold bg-[#FF9933] hover:bg-[#e68a2e] text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-105 active:scale-95 border-none">
              {lang === 'en' ? 'Start Voting Guide' : 'वोटिंग गाइड शुरू करें'}
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg font-bold border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:scale-105 active:scale-95">
              {lang === 'en' ? 'Take Voter Quiz' : 'मतदाता प्रश्नोत्तरी लें'}
            </Button>
          </motion.div>
        </section>

        {/* Feature Highlights Grid */}
        <section className="mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={feat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (idx * 0.1) }}
                whileHover={{ y: -8 }}
                onClick={() => {
                  setActiveTab(feat.id);
                  document.getElementById('features-tabs')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-6 md:p-8 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none flex flex-col justify-between text-left group transition-all cursor-pointer hover:shadow-xl hover:border-primary/50 dark:hover:border-primary/50`}
              >
                <div className="flex flex-col h-full">
                  <div className={`w-14 h-14 flex items-center justify-center rounded-2xl mb-6 ${feat.color} transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100 leading-tight group-hover:text-primary transition-colors">{feat.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm font-medium flex-grow">
                    {feat.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-primary font-bold text-sm">
                  <span>{lang === 'en' ? 'Explore' : 'अन्वेषण करें'}</span>
                  <Zap size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* State Selector Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mb-16 max-w-5xl mx-auto"
        >
          <Card className="bg-card border border-border/60 shadow-xl shadow-primary/5 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full">
                  <div className="bg-gradient-to-br from-accent/10 to-accent/20 p-5 rounded-3xl text-accent shadow-inner shrink-0">
                    <MapPin size={32} />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white mb-2 leading-tight">
                      {lang === 'en' ? 'State Election Portal' : 'राज्य चुनाव पोर्टल'}
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium">
                      {lang === 'en' ? 'Real-time data on assembly size, capital, and direct links to official CEO resources.' : 'विधानसभा के आकार, राजधानी और आधिकारिक CEO संसाधनों के सीधे लिंक पर वास्तविक समय का डेटा।'}
                    </p>
                  </div>
                </div>
                <div className="w-full md:w-auto shrink-0">
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger className="w-full md:w-[320px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary/50 focus:ring-primary/20 h-16 rounded-2xl text-lg font-bold px-6 transition-all shadow-inner">
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl shadow-2xl border-slate-200 p-2">
                      {states.map(s => (
                        <SelectItem key={s} value={s} className="rounded-xl my-1 cursor-pointer py-3 text-base font-semibold focus:bg-primary/10 focus:text-primary transition-colors">{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* State Details Panel */}
          {stateInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              className="mt-6"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
                {[
                  { title: lang === 'en' ? 'Lok Sabha' : 'लोकसभा', value: stateInfo.lok_sabha, color: 'text-primary', bg: 'bg-white', icon: <Vote size={18}/> },
                  { title: lang === 'en' ? 'Assembly' : 'विधानसभा', value: stateInfo.assembly, color: 'text-secondary', bg: 'bg-white', icon: <Zap size={18}/> },
                  { title: lang === 'en' ? 'Capital' : 'राजधानी', value: stateInfo.capital, color: 'text-accent', bg: 'bg-white', icon: <MapPin size={18}/> },
                  { title: lang === 'en' ? 'Official Site' : 'आधिकारिक साइट', value: stateInfo.ceo_website, isLink: true, color: 'text-slate-800', bg: 'bg-white', icon: <ExternalLink size={18}/> }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none ${stat.bg} flex flex-col items-center justify-center text-center transition-all hover:-translate-y-2 hover:shadow-2xl duration-500 relative group overflow-hidden`}
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-muted transition-colors group-hover:bg-primary opacity-20" />
                    <div className={`mb-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 transition-colors group-hover:bg-primary/10 group-hover:text-primary ${stat.color}`}>
                      {stat.icon}
                    </div>
                    <p className="text-xs text-slate-400 uppercase font-black tracking-[0.15em] mb-2">{stat.title}</p>
                    {stat.isLink ? (
                      <a href={`https://${stat.value}`} target="_blank" rel="noopener noreferrer" className={`text-slate-800 dark:text-white hover:text-primary transition-colors flex items-center gap-1.5 text-base md:text-lg font-black break-all`}>
                        {lang === 'en' ? 'Visit CEO' : 'CEO देखें'}
                      </a>
                    ) : (
                      <p className={`text-3xl md:text-4xl font-black ${stat.color}`}>{stat.value}</p>
                    )}
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-center mt-6">
                <p className="text-sm text-muted-foreground italic flex items-center gap-2 bg-card p-3 px-5 rounded-xl border border-border/60 shadow-sm text-center">
                  <Info size={16} className="text-primary shrink-0" /> {stateInfo.note}
                </p>
              </div>
            </motion.div>
          )}
        </motion.section>

        {/* Impact & Rights Section */}
        <section className="mb-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 text-secondary font-black text-xs uppercase tracking-widest">
                <Info size={14} />
                <span>{lang === 'en' ? 'Knowledge is Power' : 'ज्ञान ही शक्ति है'}</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 dark:text-white leading-tight">
                {lang === 'en' ? 'Every Vote Shapes ' : 'हर वोट भारत के '}
                <span className="text-secondary">{lang === 'en' ? 'India\'s Future' : 'भविष्य को आकार देता है'}</span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {lang === 'en' 
                  ? "Voting is not just a right, it's a responsibility. Your single vote has the power to drive change, influence policy, and strengthen the foundations of our democracy."
                  : "मतदान केवल एक अधिकार नहीं है, यह एक जिम्मेदारी है। आपके एक वोट में बदलाव लाने, नीति को प्रभावित करने और हमारे लोकतंत्र की नींव को मजबूत करने की शक्ति है।"}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: lang === 'en' ? 'Right to Know' : 'जानने का अधिकार', desc: lang === 'en' ? 'Access candidate profiles and their criminal/financial records.' : 'उम्मीदवारों की प्रोफाइल और उनके आपराधिक/वित्तीय रिकॉर्ड तक पहुंचें।' },
                  { title: lang === 'en' ? 'Right to Vote' : 'वोट देने का अधिकार', desc: lang === 'en' ? 'Every citizen above 18 has the equal right to cast their vote.' : '18 वर्ष से ऊपर के प्रत्येक नागरिक को अपना वोट देने का समान अधिकार है।' }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 hover:border-secondary/30 transition-colors group">
                    <h4 className="font-black text-slate-800 dark:text-white mb-2 group-hover:text-secondary transition-colors">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-[3rem] blur-3xl -z-10" />
              <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                 <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-black text-slate-800 dark:text-white">
                      {lang === 'en' ? 'Why Your Vote Matters' : 'आपका वोट क्यों मायने रखता है'}
                    </h3>
                    <ul className="space-y-4">
                      {[
                        lang === 'en' ? 'Direct Participation in Governance' : 'शासन में प्रत्यक्ष भागीदारी',
                        lang === 'en' ? 'Protecting Your Constitutional Rights' : 'अपने संवैधानिक अधिकारों की रक्षा करना',
                        lang === 'en' ? 'Holding Leaders Accountable' : 'नेताओं को जवाबदेह ठहराना',
                        lang === 'en' ? 'Contributing to Nation Building' : 'राष्ट्र निर्माण में योगदान'
                      ].map((li, i) => (
                        <motion.li 
                          key={i}
                          whileHover={{ x: 10 }}
                          className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-bold"
                        >
                          <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                            <Zap size={12} className="fill-current" />
                          </div>
                          {li}
                        </motion.li>
                      ))}
                    </ul>
                    <Button className="w-full h-14 rounded-2xl bg-secondary hover:bg-secondary/90 text-white font-black text-lg shadow-xl shadow-secondary/20">
                      {lang === 'en' ? 'Learn More About Rights' : 'अधिकारों के बारे में और जानें'}
                    </Button>
                 </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Interaction Area */}
        <div id="features-tabs" className="scroll-mt-24 relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12 max-w-6xl mx-auto">
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <TabsList className="flex w-full max-w-4xl flex-wrap justify-center gap-2 md:gap-4 h-auto p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-slate-200/20">
              <TabsTrigger value="timeline" className="flex-1 min-w-[140px] rounded-2xl py-4 flex items-center justify-center gap-3 data-[state=active]:bg-primary/10 data-[state=active]:shadow-none data-[state=active]:text-primary transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                <Calendar size={22} className="shrink-0" />
                <span className="font-bold text-base">{lang === 'en' ? 'Timeline' : 'समय रेखा'}</span>
              </TabsTrigger>
              <TabsTrigger value="wizard" className="flex-1 min-w-[140px] rounded-2xl py-4 flex items-center justify-center gap-3 data-[state=active]:bg-secondary/10 data-[state=active]:shadow-none data-[state=active]:text-secondary transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                <Info size={22} className="shrink-0" />
                <span className="font-bold text-base">{lang === 'en' ? 'Guide' : 'मार्गदर्शिका'}</span>
              </TabsTrigger>
              <TabsTrigger value="quiz" className="flex-1 min-w-[140px] rounded-2xl py-4 flex items-center justify-center gap-3 data-[state=active]:bg-accent/10 data-[state=active]:shadow-none data-[state=active]:text-accent transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                <Zap size={22} className="shrink-0" />
                <span className="font-bold text-base">{lang === 'en' ? 'Quiz' : 'प्रश्नोत्तरी'}</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex-1 min-w-[140px] rounded-2xl py-4 flex items-center justify-center gap-3 data-[state=active]:bg-orange-500/10 data-[state=active]:shadow-none data-[state=active]:text-orange-500 transition-all hover:bg-slate-50 dark:hover:bg-slate-800">
                <MessageSquare size={22} className="shrink-0" />
                <span className="font-bold text-base">{lang === 'en' ? 'AI Chat' : 'AI चैट'}</span>
              </TabsTrigger>
            </TabsList>
          </motion.div>

          <AnimatePresence mode="wait">
            <TabsContent value="timeline" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">{lang === 'en' ? 'Election Journey' : 'चुनावी यात्रा'}</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{lang === 'en' ? 'From announcement to results — see how the world\'s largest democracy works.' : 'घोषणा से परिणाम तक — देखें कि दुनिया का सबसे बड़ा लोकतंत्र कैसे काम करता है।'}</p>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Timeline data={timelineData} lang={lang} />
                </Suspense>
              </motion.div>
            </TabsContent>

            <TabsContent value="wizard" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">{lang === 'en' ? 'Step-by-Step Guide' : 'चरण-दर-चरण मार्गदर्शिका'}</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{lang === 'en' ? 'Everything you need to know to become an active citizen and exercise your right to vote.' : 'एक सक्रिय नागरिक बनने और अपने वोट देने के अधिकार का प्रयोग करने के लिए आपको जो कुछ भी जानना आवश्यक है।'}</p>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Wizard steps={wizardSteps} lang={lang} />
                </Suspense>
              </motion.div>
            </TabsContent>

            <TabsContent value="quiz" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">{lang === 'en' ? 'Test Your Knowledge' : 'अपने ज्ञान का परीक्षण करें'}</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{lang === 'en' ? 'Are you a pro voter? Take the interactive quiz to find out and learn more!' : 'क्या आप एक प्रो वोटर हैं? जानने और अधिक जानने के लिए इंटरैक्टिव क्विज़ लें!'}</p>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <Quiz questions={quizQuestions} lang={lang} />
                </Suspense>
              </motion.div>
            </TabsContent>

            <TabsContent value="chat" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="text-center mb-12">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight">{lang === 'en' ? 'Ask BharatVote AI' : 'भारतवोट AI से पूछें'}</h3>
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{lang === 'en' ? 'Have questions? Our Gemini-powered AI assistant is here to help with 24/7 answers.' : 'प्रश्न हैं? हमारा जेमिनी-संचालित AI सहायक 24/7 उत्तरों के साथ मदद के लिए यहाँ है।'}</p>
                </div>
                <Suspense fallback={<LoadingSkeleton />}>
                  <AIChat lang={lang} />
                </Suspense>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-32 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="space-y-6 col-span-1 md:col-span-2">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 cursor-pointer w-fit"
              >
                <div className="bg-gradient-to-br from-primary to-accent p-2.5 rounded-xl shadow-lg text-white">
                  <Vote className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-2xl font-black tracking-tight text-slate-800 dark:text-white">BharatVote</h4>
                  <p className="text-[10px] text-primary uppercase tracking-[0.2em] font-bold">India Election Guide</p>
                </div>
              </motion.div>
              <p className="text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-md">
                {lang === 'en' 
                  ? "Revolutionizing voter education with AI and interactive experiences. Every vote is a voice, every voice is a choice." 
                  : "AI और इंटरैक्टिव अनुभवों के साथ मतदाता शिक्षा में क्रांति लाना। हर वोट एक आवाज है, हर आवाज एक विकल्प है।"}
              </p>
              <div className="flex gap-4">
                {['twitter', 'facebook', 'instagram', 'youtube'].map((social) => (
                  <motion.div
                    key={social}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <div className="w-5 h-5 bg-current mask-icon" style={{ WebkitMaskImage: `url(https://cdn.simpleicons.org/${social})`, maskImage: `url(https://cdn.simpleicons.org/${social})` }} />
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{lang === 'en' ? 'Official Resources' : 'आधिकारिक संसाधन'}</h4>
              <ul className="space-y-4">
                {[
                  { name: 'ECI Voter Portal', url: 'https://voters.eci.gov.in' },
                  { name: 'Check Your Name', url: 'https://electoralsearch.eci.gov.in' },
                  { name: 'Election Schedule', url: 'https://eci.gov.in' },
                  { name: 'Candidate Affidavits', url: 'https://affidavit.eci.gov.in' }
                ].map((link, i) => (
                  <li key={i}>
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold hover:text-primary transition-colors">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-primary transition-colors" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">{lang === 'en' ? 'Support' : 'सहायता'}</h4>
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-400 font-black uppercase mb-1">{lang === 'en' ? 'Voter Helpline' : 'मतदाता हेल्पलाइन'}</p>
                  <p className="text-xl font-black text-primary">1950</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <p className="text-xs text-slate-400 font-black uppercase mb-1">{lang === 'en' ? 'ECI Email' : 'ECI ईमेल'}</p>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-300 break-all">complaints@eci.gov.in</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-16 opacity-30" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-slate-400 font-bold">© 2026 BharatVote India. All Rights Reserved.</p>
              <p className="text-xs text-slate-400 flex items-center gap-2">
                Made with <span className="text-rose-500">❤️</span> for Indian Democracy.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Disclaimer'].map((item) => (
                <a key={item} href="#" className="text-sm text-slate-400 font-bold hover:text-primary transition-colors">{item}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
