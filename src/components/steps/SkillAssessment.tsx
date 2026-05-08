// src/components/onboarding/steps/SkillAssessment.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { mockAssessmentQuestions } from "@/lib/skill-tags";
import type { AssessmentResult } from "@/types/onboarding";
import { Clock, AlertTriangle } from "lucide-react";

interface SkillAssessmentProps {
  onComplete: (result: AssessmentResult) => void;
}

export function SkillAssessment({ onComplete }: SkillAssessmentProps) {
  const [questions] = useState(mockAssessmentQuestions.digital);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(questions[0]?.time_limit_seconds || 30);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const timerRef = useRef<NodeJS.Timeout>();
  const question = questions[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;

  // Timer
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(question.time_limit_seconds);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [currentQuestion]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleTimeUp = () => {
    // Auto-submit on timeout
    if (currentQuestion < questions.length - 1) {
      setAnswers([...answers, -1]); // -1 = no answer
      setCurrentQuestion((prev) => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const handleAnswer = (optionIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (isLast) {
      finishAssessment(newAnswers);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const finishAssessment = (finalAnswers?: number[]) => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const answered = finalAnswers || answers;
    const correct = answered.filter((a, i) => a === questions[i]?.correct_index).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    const result: AssessmentResult = {
      score,
      passed,
      feedback: passed
        ? `Great job! You scored ${score}%.`
        : `You scored ${score}%. 70% required to pass.`,
      cooldown_days: passed ? undefined : 7,
    };

    setResult(result);
    setTimeout(() => onComplete(result), 1500);
  };

  if (isFinished && result) {
    return (
      <div className="space-y-6 text-center">
        <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center ${
          result.passed ? "bg-success/10" : "bg-warning/10"
        }`}>
          <span className={`text-3xl font-bold ${
            result.passed ? "text-success" : "text-warning"
          }`}>
            {result.score}%
          </span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-primary">
            {result.passed ? "You passed!" : "Not quite there"}
          </h2>
          <p className="text-sm text-primary-300 mt-1">{result.feedback}</p>
        </div>

        {!result.passed && result.cooldown_days && (
          <div className="bg-warning/5 border border-warning/20 rounded-card p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-warning">7-day cooldown</p>
              <p className="text-xs text-primary-300 mt-1">
                You can retake this assessment after {result.cooldown_days} days. Study and try again.
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Timer */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-primary-300">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${
          timeLeft <= 10 ? "text-danger" : timeLeft <= 20 ? "text-warning" : "text-primary"
        }`}>
          <Clock className="w-4 h-4" />
          {timeLeft}s
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 bg-primary-100 rounded-pill overflow-hidden">
        <div
          className={`h-full rounded-pill transition-all duration-1000 ${
            timeLeft <= 10 ? "bg-danger" : timeLeft <= 20 ? "bg-warning" : "bg-success"
          }`}
          style={{
            width: `${(timeLeft / question.time_limit_seconds) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div>
        <h3 className="text-md font-semibold text-primary">
          {question.question}
        </h3>
      </div>

      {/* Options */}
      <div className="grid gap-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full p-4 rounded-card border-2 border-primary-100 hover:border-accent-300 hover:bg-accent-50/30 text-left text-sm text-primary transition-colors"
          >
            <span className="font-medium text-primary-300 mr-2">
              {String.fromCharCode(65 + index)}.
            </span>
            {option}
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-primary-300">
        Timer will auto-submit when it reaches 0
      </p>
    </div>
  );
}
