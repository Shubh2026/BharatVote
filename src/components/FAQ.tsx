import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, BookOpen, AlertCircle } from "lucide-react";
import { faqData } from '@/data/faq-data';

interface FAQProps {
  lang: 'en' | 'hi';
}

export function FAQ({ lang }: FAQProps) {
  const t = {
    en: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common queries about the Indian electoral process."
    },
    hi: {
      title: "सामान्यतः पूछे जाने वाले प्रश्न",
      subtitle: "भारतीय चुनावी प्रक्रिया के बारे में सामान्य प्रश्नों के उत्तर प्राप्त करें।"
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
          <HelpCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t[lang].title}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t[lang].subtitle}</p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm overflow-hidden">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100 dark:border-slate-800 px-6 last:border-0">
              <AccordionTrigger className="text-left py-6 hover:text-primary transition-colors hover:no-underline font-semibold">
                {lang === 'en' ? faq.en_question : faq.hi_question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 dark:text-slate-400 pb-6 leading-relaxed">
                {lang === 'en' ? faq.en_answer : faq.hi_answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>
      
      <div className="bg-accent/10 rounded-2xl p-6 flex items-start gap-4 border border-accent/20">
        <AlertCircle className="text-accent shrink-0 mt-1" size={20} />
        <div>
          <h4 className="font-bold text-accent">
            {lang === 'en' ? "Still have questions?" : "अभी भी प्रश्न हैं?"}
          </h4>
          <p className="text-sm text-accent/80 mt-1">
            {lang === 'en' 
              ? "Use our AI Assistant for real-time answers tailored to your specific situation or visit the official ECI website."
              : "अपनी विशिष्ट स्थिति के अनुरूप रीयल-टाइम उत्तरों के लिए हमारे AI सहायक का उपयोग करें या आधिकारिक ECI वेबसाइट पर जाएँ।"}
          </p>
        </div>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card";
