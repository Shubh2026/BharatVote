import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Users, Info } from "lucide-react";
import { statesData as defaultStatesData, type StateInfo } from '../data/state-data';

interface StatesProps {
  lang: 'en' | 'hi';
  data?: StateInfo[];
}

export function States({ lang, data }: StatesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const currentStatesData = data || defaultStatesData || [];

  const t = {
    en: {
      title: "State & UT Information",
      placeholder: "Search state or union territory...",
      voters: "Total Voters",
      constituencies: "Constituencies",
      last_poll: "Last Polling Date",
      info: "Select a state to see detailed election information."
    },
    hi: {
      title: "राज्य और केंद्र शासित प्रदेश की जानकारी",
      placeholder: "राज्य या केंद्र शासित प्रदेश खोजें...",
      voters: "कुल मतदाता",
      constituencies: "निर्वाचन क्षेत्र",
      last_poll: "पिछली मतदान तिथि",
      info: "विस्तृत चुनाव जानकारी देखने के लिए एक राज्य चुनें।"
    }
  };

  const filteredStates = currentStatesData.filter(state => 
    state.en_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    state.hi_name.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{t[lang].title}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{t[lang].info}</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            className="pl-10 rounded-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            placeholder={t[lang].placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStates.map((state) => (
          <Card key={state.id} className="group hover:shadow-xl transition-all duration-300 border-slate-200 dark:border-slate-800 overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                  {lang === 'en' ? state.en_name : state.hi_name}
                </CardTitle>
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  {state.id}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Users size={16} className="text-primary" />
                <span>{t[lang].voters}: <strong>{state.voters.toLocaleString()}</strong></span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <MapPin size={16} className="text-primary" />
                <span>{t[lang].constituencies}: <strong>{state.constituencies}</strong></span>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-medium text-slate-400">
                <span className="flex items-center gap-1"><Info size={12} /> {t[lang].last_poll}</span>
                <span>2024</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredStates.length === 0 && (
        <div className="text-center py-20 bg-white/50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500">{lang === 'en' ? "No states found matching your search." : "आपकी खोज से मेल खाने वाला कोई राज्य नहीं मिला।"}</p>
        </div>
      )}
    </div>
  );
}
