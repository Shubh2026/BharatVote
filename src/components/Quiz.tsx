import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getQuizQuestions, type QuizQuestion } from "@/data/quiz-data";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, RefreshCcw } from "lucide-react";

interface QuizProps {
  questions?: QuizQuestion[];
  lang: 'en' | 'hi';
}

export function Quiz({ questions, lang }: QuizProps) {
  const allQuestions = useMemo(() => questions || getQuizQuestions(lang), [questions, lang]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswer = (idx: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(idx);
    const correct = idx === allQuestions[currentIdx].answer;
    setIsCorrect(correct);
    if (correct) setScore(prev => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx < allQuestions.length - 1) {
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
      <div className="max-w-xl mx-auto py-10">
        <Card className="text-center shadow-xl border-0 rounded-3xl overflow-hidden relative">
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
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-black text-primary mb-2">
              {score}/{allQuestions.length}
            </div>
            <p className="text-muted-foreground mb-6">
              {score >= allQuestions.length / 2 
                ? (lang === 'en' ? 'Great job! You know your elections.' : 'बहुत अच्छा! आप चुनावों के बारे में अच्छी तरह जानते हैं।')
                : (lang === 'en' ? 'Keep learning! Elections are vital for democracy.' : 'सीखते रहें! लोकतंत्र के लिए चुनाव महत्वपूर्ण हैं।')}
            </p>
            <Progress value={(score / allQuestions.length) * 100} className="h-3 mb-8" />
          </CardContent>
          <CardFooter className="justify-center">
            <Button onClick={resetQuiz} size="lg" className="gap-2">
              <RefreshCcw className="w-4 h-4" />
              {lang === 'en' ? 'Try Again' : 'फिर से प्रयास करें'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const currentQ = allQuestions[currentIdx];

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <Badge variant="secondary" className="px-3 py-1">
          {lang === 'en' ? `Question ${currentIdx + 1} of ${allQuestions.length}` : `प्रश्न ${currentIdx + 1} का ${allQuestions.length}`}
        </Badge>
        <div className="text-sm font-medium text-muted-foreground">
          {lang === 'en' ? 'Score: ' : 'स्कोर: '}{score}
        </div>
      </div>

      <Progress value={((currentIdx) / allQuestions.length) * 100} className="h-1.5 mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <Card className="shadow-xl border-0 rounded-3xl overflow-hidden relative">
            <CardHeader>
              <CardTitle className="text-xl leading-snug">
                {currentQ.q}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 px-6 pb-8">
              {currentQ.options.map((option, idx) => (
                <Button
                  key={idx}
                  variant={selectedAnswer === idx ? (isCorrect ? "default" : "destructive") : "outline"}
                  className={`w-full justify-start text-left h-auto py-5 px-6 rounded-2xl text-base ${
                    selectedAnswer === null ? "hover:border-primary/40 hover:bg-primary/5" : ""
                  }`}
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center mr-4 text-sm font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </Button>
              ))}
            </CardContent>
            
            {selectedAnswer !== null && (
              <div className="px-6 pb-6">
                <div className={`p-5 rounded-2xl border ${isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}>
                  <p className="text-sm opacity-90 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
                <Button onClick={nextQuestion} className="w-full mt-6 rounded-xl h-12" size="lg">
                  {currentIdx === allQuestions.length - 1 
                    ? (lang === 'en' ? 'Finish Quiz' : 'क्विज़ समाप्त करें') 
                    : (lang === 'en' ? 'Next Question' : 'अगला प्रश्न')}
                </Button>
              </div>
            )}
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
