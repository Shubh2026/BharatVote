import { motion } from "framer-motion";
import { getTimelineData, type TimelineItem } from "@/data/election-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Zap } from "lucide-react";

interface TimelineProps {
  data?: TimelineItem[];
  lang: 'en' | 'hi';
}

export function Timeline({ data, lang }: TimelineProps) {
  const timelineData = data || getTimelineData(lang);
  
  return (
    <div className="relative max-w-5xl mx-auto py-12 px-4 md:px-0">
      {/* Central Animated Line */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-1.5 overflow-hidden">
        <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-full" />
        <motion.div 
          initial={{ height: 0 }}
          whileInView={{ height: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-accent to-secondary rounded-full"
        />
      </div>

      <div className="space-y-24 relative z-10">
        {timelineData.map((item, index) => (
          <motion.div
            key={`${item.phase}-${index}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`relative flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Desktop Center Icon */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
               <motion.div 
                 whileHover={{ scale: 1.2, rotate: 360 }}
                 className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border-4 border-background shadow-2xl flex items-center justify-center text-3xl cursor-pointer group"
               >
                 <span>{item.icon}</span>
               </motion.div>
            </div>

            {/* Content Card */}
            <div className="w-full md:w-[42%] ml-12 md:ml-0">
              <Card className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1.5 rounded-full text-xs uppercase">
                      {lang === 'en' ? `Phase ${item.phase}` : `चरण ${item.phase}`}
                    </Badge>
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full">
                      <Calendar size={14} className="text-muted-foreground" />
                      <span className="text-xs font-black text-slate-500">{item.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-black">{item.title}</CardTitle>
                  <CardDescription className="text-lg mt-3">{item.desc}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 italic whitespace-pre-wrap">
                    {item.details}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="hidden md:block md:w-[42%]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
