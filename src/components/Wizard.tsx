import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { WizardStep } from "@/data/election-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface WizardProps {
  /** Array of step objects defining the wizard flow. */
  steps: WizardStep[];
  /** The active UI language: 'en' for English, 'hi' for Hindi. */
  lang: 'en' | 'hi';
}

/**
 * Wizard component — renders a multi-step guide with animated step
 * indicator, progress bar, and navigable content cards.
 *
 * @param props - {@link WizardProps}
 */
export function Wizard({ steps, lang }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
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
      {/* Step Indicator */}
      <div className="relative mb-14 px-4 max-w-2xl mx-auto">
        <div className="absolute top-1/2 left-0 w-full h-1.5 bg-muted/50 rounded-full -translate-y-1/2 z-0" />
        <motion.div
          className="absolute top-1/2 left-0 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full -translate-y-1/2 z-0"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <div className="relative flex justify-between z-10">
          {steps.map((step, idx) => (
            <motion.button
              key={step.step}
              onClick={() => setCurrentStep(idx)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={`Go to step ${step.step}`}
              aria-current={idx === currentStep ? 'step' : undefined}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${
                idx <= currentStep
                  ? "bg-primary border-white text-primary-foreground shadow-lg shadow-primary/30 dark:border-slate-900"
                  : "bg-background border-muted text-muted-foreground hover:border-primary/30"
              }`}
            >
              {idx < currentStep ? <Check className="w-6 h-6" /> : <span className="font-bold">{step.step}</span>}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <Card className="shadow-xl shadow-primary/5 border-0 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
            <CardHeader className="text-center pt-10 pb-4">
              <div className="text-4xl mb-4">{steps[currentStep].icon}</div>
              <CardTitle className="text-3xl font-black tracking-tight text-slate-800 dark:text-white">
                {lang === 'en' ? `Step ${steps[currentStep].step}: ` : `चरण ${steps[currentStep].step}: `}
                <span className="text-primary">{steps[currentStep].title}</span>
              </CardTitle>
              <CardDescription className="text-base mt-2">
                {lang === 'en' ? 'Follow these instructions carefully' : 'इन निर्देशों का ध्यानपूर्वक पालन करें'}
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-lg dark:prose-invert max-w-none px-8 py-6 text-slate-600 dark:text-slate-300 leading-relaxed">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {steps[currentStep].content}
              </ReactMarkdown>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="flex justify-between mt-10 max-w-2xl mx-auto">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="gap-2 rounded-xl px-6 h-12 font-medium hover:bg-muted/50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          {lang === 'en' ? 'Previous' : 'पिछला'}
        </Button>
        <Button
          onClick={nextStep}
          disabled={currentStep === steps.length - 1}
          className="gap-2 bg-primary hover:bg-primary/90 rounded-xl px-8 h-12 font-medium shadow-md shadow-primary/20 hover:shadow-lg transition-all"
        >
          {lang === 'en' ? 'Next' : 'अगला'}
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
