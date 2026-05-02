import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { QuizQuestion } from "@/data/quiz-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, RefreshCcw, Award } from "lucide-react";
import { saveQuizResult } from "@/lib/firebase";
import { trackEvent } from "@/lib/analytics";

interface QuizProps {
  questions: QuizQuestion[];
  lang: 'en' | 'hi';
}

export function Quiz({ questions, lang }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Task 3: Save quiz results to Firestore
  // Task 1: Track GA4 event
  useEffect(() => {
    if (showResult) {
      saveQuizResult({ score, total: questions.length, lang })
        .catch(err => console.error("Failed to save results", err));
      
      trackEvent('quiz_completed', { 
        score, 
        total: questions.length, 
        lang 
      });
    }
  }, [showResult, score, questions.length, lang]);

  // Track start of quiz
  useEffect(() => {
    trackEvent('quiz_started', { lang });
  }, [lang]);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(idx);
    const correct = idx === questions[currentIdx].answer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIdx(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="max-w-xl mx-auto py-10"
      >
        <Card className="text-center shadow-xl shadow-primary/10 border-0 rounded-3xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-secondary" />
          <CardHeader>
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-primary/10 text-primary">
                <Award className="w-16 h-16" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold">
              {lang === 'en' ? 'Quiz Completed!' : 'क्विज़ समाप्त!'}
            </CardTitle>
            <CardDescription className="text-lg">
              {lang === 'en' ? 'Here is how you performed' : 'यहाँ आपका प्रदर्शन है'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-black text-primary mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-muted-foreground mb-6">
              {score >= questions.length / 2 
                ? (lang === 'en' ? 'Great job! You know your elections.' : 'बहुत अच्छा! आप चुनावों के बारे में अच्छी तरह जानते हैं।')
                : (lang === 'en' ? 'Keep learning! Elections are vital for democracy.' : 'सीखते रहें! लोकतंत्र के लिए चुनाव महत्वपूर्ण हैं।')}
            </p>
            <Progress value={(score / questions.length) * 100} className="h-3 mb-8" />
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={resetQuiz} size="lg" className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              {lang === 'en' ? 'Try Again' : 'फिर से प्रयास करें'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6 px-2">
        <Badge variant="secondary" className="px-3 py-1">
          {lang === 'en' ? `Question ${currentIdx + 1} of ${questions.length}` : `प्रश्न ${currentIdx + 1} का ${questions.length}`}
        </Badge>
        <div className="text-sm font-medium text-muted-foreground">
          {lang === 'en' ? 'Score: ' : 'स्कोर: '}{score}
        </div>
      </div>

      <Progress value={((currentIdx) / questions.length) * 100} className="h-1.5 mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <Card className="shadow-xl shadow-primary/5 border-0 rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent opacity-50" />
            <CardHeader>
              <CardTitle className="text-xl leading-snug">
                {currentQ.q}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-8">
              {currentQ.options.map((option, idx) => (
                <motion.div
                  key={idx}
                  whileHover={selectedAnswer === null ? { scale: 1.01, x: 4 } : {}}
                  whileTap={selectedAnswer === null ? { scale: 0.99 } : {}}
                >
                  <Button
                    variant={selectedAnswer === idx ? (isCorrect ? "default" : "destructive") : "outline"}
                    className={`w-full justify-start text-left h-auto py-5 px-6 rounded-2xl text-base transition-all duration-200 ${
                      selectedAnswer === null ? "hover:border-primary/40 hover:bg-primary/5 hover:shadow-md" : ""
                    } ${selectedAnswer !== null && idx === currentQ.answer && idx !== selectedAnswer ? "border-green-500 bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300" : ""}`}
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedAnswer !== null}
                  >
                  <span className="shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-4 text-sm font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                  {selectedAnswer === idx && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      {isCorrect ? <CheckCircle2 className="w-6 h-6 text-white" /> : <XCircle className="w-6 h-6 text-white" />}
                    </motion.div>
                  )}
                  </Button>
                </motion.div>
              ))}
            </CardContent>
            
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="px-6 pb-6"
              >
                <div className={`p-5 rounded-2xl border ${isCorrect ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300" : "bg-red-50 border-red-200 text-red-800 dark:bg-red-900/20 dark:border-red-800 dark:text-red-300"}`}>
                  <p className="text-base font-bold mb-1 flex items-center gap-2">
                    {isCorrect ? (lang === 'en' ? 'Correct!' : 'सही!') : (lang === 'en' ? 'Incorrect' : 'गलत')}
                  </p>
                  <p className="text-sm opacity-90 leading-relaxed">{currentQ.explanation}</p>
                </div>
                <Button onClick={nextQuestion} className="w-full mt-6 rounded-xl h-12 text-lg font-medium shadow-md hover:shadow-lg transition-all" size="lg">
                  {currentIdx === questions.length - 1 
                    ? (lang === 'en' ? 'Finish Quiz' : 'क्विज़ समाप्त करें') 
                    : (lang === 'en' ? 'Next Question' : 'अगला प्रश्न')}
                </Button>
              </motion.div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
