import { useState, useEffect } from "react";
import { MusicTerm, grades, gradeLabels, gradeLabelsChinese } from "../data/musicTerms";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { CheckCircle2, XCircle, RotateCcw, GraduationCap } from "lucide-react";
import { translations } from "../data/translations";

interface QuizProps {
  terms: MusicTerm[];
  cardLanguage?: "en" | "zh";
}

interface QuizQuestion {
  term: MusicTerm;
  options: string[];
  correctAnswer: string;
  wrongAnswerTerms: MusicTerm[]; // Store which terms were used as wrong answers
  optionTermMap: (MusicTerm | null)[]; // Map each option position to its term (null for correct answer)
}

export function Quiz({ terms, cardLanguage = "en" }: QuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const t = translations[cardLanguage];

  useEffect(() => {
    if (quizStarted && selectedGrade !== undefined) {
      // Only reinitialize when grade changes, not when language changes
      initializeQuiz();
    }
  }, [selectedGrade]);

  // Update question language when cardLanguage changes, without regenerating questions
  useEffect(() => {
    if (quizStarted && questions.length > 0) {
      updateQuestionsLanguage();
    }
  }, [cardLanguage]);

  const initializeQuiz = () => {
    // Filter terms by grade
    const filteredTerms = selectedGrade === 0 
      ? terms 
      : terms.filter(term => term.grade === selectedGrade);

    if (filteredTerms.length === 0) {
      return;
    }

    // Shuffle and select 10 random terms
    const shuffled = [...filteredTerms].sort(() => Math.random() - 0.5);
    const selectedTerms = shuffled.slice(0, Math.min(10, filteredTerms.length));

    // Generate questions
    const newQuestions: QuizQuestion[] = selectedTerms.map((term) => {
      // Get wrong answer terms (store the actual terms, not just the text)
      const wrongAnswerTerms = terms
        .filter((t) => t.id !== term.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      // Get wrong answer texts
      const wrongAnswers = wrongAnswerTerms.map((t) => cardLanguage === "zh" ? t.definitionChinese : t.definition);

      // Combine and shuffle all options
      const correctAnswer = cardLanguage === "zh" ? term.definitionChinese : term.definition;
      const allOptions = [correctAnswer, ...wrongAnswers];
      const shuffledIndices = allOptions.map((_, i) => i).sort(() => Math.random() - 0.5);
      const options = shuffledIndices.map(i => allOptions[i]);
      
      // Create a map of which term each option position corresponds to
      const optionTermMap: (MusicTerm | null)[] = shuffledIndices.map(i => {
        if (i === 0) return null; // Correct answer
        return wrongAnswerTerms[i - 1]; // Wrong answer terms
      });

      return {
        term,
        options,
        correctAnswer,
        wrongAnswerTerms, // Store the terms for later translation
        optionTermMap, // Map each option position to its term
      };
    });

    setQuestions(newQuestions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setQuizStarted(true);
  };

  const updateQuestionsLanguage = () => {
    // Store the current state before updating
    const currentQuestion = questions[currentQuestionIndex];
    const wasAnswered = showResult;
    const oldSelectedAnswer = selectedAnswer;
    
    // Find the index of the selected answer in the old options (if it exists)
    let selectedAnswerIndex: number | null = null;
    if (oldSelectedAnswer && currentQuestion) {
      selectedAnswerIndex = currentQuestion.options.findIndex((opt: string) => opt === oldSelectedAnswer);
    }
    
    // Update existing questions to use the new language without changing the terms or option order
    setQuestions((prevQuestions: QuizQuestion[]) => {
      const updatedQuestions = prevQuestions.map((question: QuizQuestion) => {
        // Translate correct answer
        const correctAnswer = cardLanguage === "zh" ? question.term.definitionChinese : question.term.definition;
        
        // Translate each option using the stored term mapping
        const newOptions = question.optionTermMap.map((term: MusicTerm | null) => {
          if (term === null) {
            // This is the correct answer position
            return correctAnswer;
          } else {
            // This is a wrong answer, translate it
            return cardLanguage === "zh" ? term.definitionChinese : term.definition;
          }
        });

        return {
          term: question.term, // Keep the same term
          options: newOptions, // Keep the same order, just translated
          correctAnswer,
          wrongAnswerTerms: question.wrongAnswerTerms, // Keep the same wrong answer terms
          optionTermMap: question.optionTermMap, // Keep the same mapping
        };
      });
      
      // Calculate the new selectedAnswer if an answer was selected (submitted or not)
      if (selectedAnswerIndex !== null && selectedAnswerIndex !== -1) {
        const updatedQuestion = updatedQuestions[currentQuestionIndex];
        if (updatedQuestion) {
          const newSelectedAnswer = updatedQuestion.options[selectedAnswerIndex];
          // Update selectedAnswer to the translated version
          setSelectedAnswer(newSelectedAnswer);
          // Preserve showResult state (true if submitted, false if just selected)
          setShowResult(wasAnswered);
        }
      } else {
        // No answer was selected, reset selection
        setSelectedAnswer(null);
        setShowResult(false);
      }
      
      return updatedQuestions;
    });
  };

  const handleStartQuiz = () => {
    initializeQuiz();
  };

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizComplete(true);
    }
  };

  if (!quizStarted || questions.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-6 w-6 text-purple-600" />
            <CardTitle>{t.filterByGrade}</CardTitle>
          </div>
          <CardDescription>
            {t.selectGradeDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {grades.map((grade) => (
              <Button
                key={grade}
                variant={selectedGrade === grade ? "default" : "outline"}
                onClick={() => setSelectedGrade(grade)}
                className="h-auto py-4"
              >
                <div className="text-center">
                  <div className="font-semibold">
                    {gradeLabels[grade]}
                  </div>
                  <div className="text-xs opacity-70 mt-1">
                    {grade === 0 
                      ? `${terms.length} ${t.terms}`
                      : `${terms.filter(t => t.grade === grade).length} ${t.terms}`}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleStartQuiz} className="w-full" size="lg">
            {t.startQuiz}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  if (quizComplete) {
    const percentage = (score / questions.length) * 100;
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">{t.quizComplete}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {percentage >= 80 ? "🎉" : percentage >= 60 ? "👏" : "📚"}
            </div>
            <p className="text-3xl mb-2">
              {score} / {questions.length}
            </p>
            <p className="text-muted-foreground">
              {percentage >= 80
                ? t.excellentWork
                : percentage >= 60
                ? t.goodJob
                : t.keepPracticing}
            </p>
          </div>
          <Progress value={percentage} className="h-3" />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button onClick={initializeQuiz} className="w-full">
            <RotateCcw className="mr-2 h-4 w-4" />
            {t.tryAgain}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => { setQuizStarted(false); setQuestions([]); }} 
            className="w-full"
          >
            {t.changeGrade}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {t.question} {currentQuestionIndex + 1} {t.of} {questions.length}
          </span>
          <span>{t.score}: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between mb-2 gap-2">
            <Badge variant="outline" className="bg-purple-50 border-purple-200">
              {gradeLabels[currentQuestion.term.grade]}
            </Badge>
          </div>
          <CardTitle>
            {t.whatIs} "{currentQuestion.term.term}"?
          </CardTitle>
          <CardDescription>{t.selectCorrect}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={showResult}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showCorrect
                    ? "border-green-500 bg-green-50"
                    : showIncorrect
                    ? "border-red-500 bg-red-50"
                    : isSelected
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-gray-300"
                } ${showResult ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex-1">{option}</span>
                  {showCorrect && (
                    <CheckCircle2 className="h-5 w-5 text-green-500 ml-2 flex-shrink-0" />
                  )}
                  {showIncorrect && (
                    <XCircle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </CardContent>
        <CardFooter>
          {!showResult ? (
            <Button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full"
            >
              {t.submitAnswer}
            </Button>
          ) : (
            <div className="w-full space-y-3">
              {((cardLanguage === "zh" && currentQuestion.term.exampleChinese) || 
                (cardLanguage === "en" && currentQuestion.term.example)) && (
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <span className="font-medium">{t.note}: </span>
                    {cardLanguage === "zh" ? currentQuestion.term.exampleChinese : currentQuestion.term.example}
                  </p>
                </div>
              )}
              <Button onClick={handleNext} className="w-full">
                {currentQuestionIndex < questions.length - 1
                  ? t.nextQuestion
                  : t.finishQuiz}
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
