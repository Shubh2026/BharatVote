import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWizardSteps, type WizardStep } from "@/data/election-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface WizardProps {
  steps?: WizardStep[];
  lang: 'en' | 'hi';
}

export function Wizard({ steps, lang }: WizardProps) {
  const wizardSteps = steps || getWizardSteps(lang);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < wizardSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="relative mb-14 px-4 max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-muted/50 rounded-full -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full -translate-y-1/2 z-0" 
          animate={{ width: `${(currentStep / (wizardSteps.length - 1)) * 100}%` }}
        />
        <div className="relative flex justify-between z-10">
          {wizardSteps.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setCurrentStep(idx)}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all ${
                idx <= currentStep 
                  ? "bg-primary border-white text-primary-foreground shadow-lg shadow-primary/30 dark:border-slate-900" 
                  : "bg-background border-muted text-muted-foreground"
              }`}
            >
              {idx < currentStep ? <Check className="w-6 h-6" /> : <span className="font-bold">{step.step}</span>}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
            <CardHeader className="text-center pt-10 pb-4">
              <div className="text-4xl mb-4">{wizardSteps[currentStep].icon}</div>
              <CardTitle className="text-3xl font-black text-slate-800 dark:text-white">
                {lang === 'en' ? `Step ${wizardSteps[currentStep].step}: ` : `चरण ${wizardSteps[currentStep].step}: `}
                <span className="text-primary">{wizardSteps[currentStep].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none px-8 py-6 text-slate-600 dark:text-slate-300">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {wizardSteps[currentStep].content}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between mt-10 max-w-2xl mx-auto px-4">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 0}>
          <ChevronLeft className="mr-2 h-4 w-4" /> {lang === 'en' ? 'Previous' : 'पिछला'}
        </Button>
        <Button onClick={nextStep} disabled={currentStep === wizardSteps.length - 1}>
          {lang === 'en' ? 'Next' : 'अगला'} <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
