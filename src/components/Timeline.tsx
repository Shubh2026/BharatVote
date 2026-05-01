import { motion } from "framer-motion";
import type { TimelineItem } from "@/data/election-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Zap } from "lucide-react";

interface TimelineProps {
  data: TimelineItem[];
  lang: 'en' | 'hi';
}

export function Timeline({ data, lang }: TimelineProps) {
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

      {/* Background Glows */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -z-10" />

      <div className="space-y-24 relative z-10">
        {data.map((item, index) => (
          <motion.div
            key={`${item.phase}-${index}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.1, 
              type: "spring", 
              stiffness: 80,
              damping: 15
            }}
            className={`relative flex flex-col md:flex-row items-center gap-12 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Date Indicator (Mobile Side / Desktop Center) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
               <motion.div 
                 whileHover={{ scale: 1.2, rotate: 360 }}
                 transition={{ type: "spring", stiffness: 200 }}
                 className="w-16 h-16 rounded-3xl bg-white dark:bg-slate-900 border-4 border-background shadow-2xl flex items-center justify-center text-3xl cursor-pointer group"
               >
                 <span className="group-hover:scale-125 transition-transform">{item.icon}</span>
                 <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
               </motion.div>
            </div>

            {/* Mobile Icon */}
            <div className="md:hidden absolute left-0 top-0 z-20">
               <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent border-2 border-white shadow-xl flex items-center justify-center text-xl text-white">
                 {item.icon}
               </div>
            </div>

            {/* Content Card */}
            <div className="w-full md:w-[42%] ml-12 md:ml-0">
              <motion.div
                whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
                className="group relative"
              >
                {/* Decorative glow behind card */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${index % 2 === 0 ? 'from-primary to-accent' : 'from-accent to-secondary'} rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-500`} />
                
                <Card className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-none shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500 group-hover:ring-1 ring-primary/20">
                  <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${index % 2 === 0 ? 'from-primary to-accent' : 'from-accent to-secondary'}`} />
                  
                  <CardHeader className="p-8 pb-4">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <Badge className={`${index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} hover:bg-opacity-20 border-none font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-widest`}>
                        {lang === 'en' ? `Phase ${item.phase}` : `चरण ${item.phase}`}
                      </Badge>
                      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-1.5 rounded-full">
                        <Calendar size={14} className="text-muted-foreground" />
                        <span className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-tighter">{item.date}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-black text-slate-800 dark:text-white leading-tight">
                      {item.title}
                    </CardTitle>
                    <CardDescription className="text-lg font-medium text-slate-500 dark:text-slate-400 mt-3 leading-relaxed">
                      {item.desc}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-8 pt-0">
                    <div className="bg-slate-50/50 dark:bg-slate-800/30 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 leading-loose text-sm md:text-base font-medium whitespace-pre-wrap italic">
                      {item.details}
                    </div>
                    
                    <div className="mt-8 flex items-center justify-between">
                       <div className="flex -space-x-2">
                         {[1,2,3].map(i => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 dark:bg-slate-700 overflow-hidden shadow-sm">
                             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${item.phase}${i}`} alt="voter" />
                           </div>
                         ))}
                         <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">
                           +12k
                         </div>
                       </div>
                       <motion.button 
                         whileHover={{ x: 5 }}
                         className={`text-sm font-black flex items-center gap-2 ${index % 2 === 0 ? 'text-primary' : 'text-accent'}`}
                       >
                         {lang === 'en' ? 'Learn More' : 'अधिक जानें'}
                         <Zap size={14} className="fill-current" />
                       </motion.button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Empty space for the other side on desktop */}
            <div className="hidden md:block md:w-[42%]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
