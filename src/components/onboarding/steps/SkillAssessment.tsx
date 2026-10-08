// src/components/onboarding/steps/SkillAssessment.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { mockAssessmentQuestions } from "@/lib/skill-tags";
import type { AssessmentResult, WorkerCategory } from "@/types/onboarding";
import { Clock, AlertTriangle, CheckCircle2, Award, ArrowRight, RotateCcw, Sparkles } from "lucide-react";

interface SkillAssessmentProps {
  category?: WorkerCategory | null;
  onComplete: (result: AssessmentResult) => void;
}

export function SkillAssessment({ category = "digital", onComplete }: SkillAssessmentProps) {
  const categoryKey = category && mockAssessmentQuestions[category as keyof typeof mockAssessmentQuestions]
    ? (category as keyof typeof mockAssessmentQuestions)
    : "digital";

  const [questions] = useState(mockAssessmentQuestions[categoryKey] || mockAssessmentQuestions.digital);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const question = questions[currentQuestion];
  const isLast = currentQuestion === questions.length - 1;

  const timeLimit = question?.time_limit_seconds && question.time_limit_seconds > 0
    ? question.time_limit_seconds
    : 30;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(timeLimit);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timeLimit]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handleTimeUp = useCallback(() => {
    setCurrentQuestion((prev) => {
      if (prev < questions.length - 1) {
        setAnswers((prevAnswers) => [...prevAnswers, -1]);
        return prev + 1;
      }
      return prev;
    });
  }, [questions.length]);

  useEffect(() => {
    if (timeLeft === 0 && !isFinished) {
      handleTimeUp();
    }
  }, [timeLeft, isFinished, handleTimeUp]);

  const handleAnswer = (optionIndex: number) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setAnswers((prev) => {
      const newAnswers = [...prev, optionIndex];

      if (isLast) {
        finishAssessment(newAnswers);
      } else {
        setCurrentQuestion((prevQ) => prevQ + 1);
      }

      return newAnswers;
    });
  };

  const finishAssessment = (finalAnswers: number[]) => {
    setIsFinished(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const correct = finalAnswers.filter((a, i) => a === questions[i]?.correct_index).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= 70;

    const assessmentResult: AssessmentResult = {
      score,
      passed,
      feedback: passed
        ? `Exemplary performance! You scored ${score}% and unlocked the Verified Skill Badge.`
        : `You scored ${score}%. 70% is required to pass verification.`,
      cooldown_days: passed ? undefined : 7,
    };

    setResult(assessmentResult);
    setTimeout(() => onComplete(assessmentResult), 1800);
  };

  if (isFinished && result) {
    return (
      <div className="space-y-8 text-center max-w-lg mx-auto py-6">
        {/* Result Ring Badge */}
        <div
          className={`w-28 h-28 rounded-3xl mx-auto flex flex-col items-center justify-center shadow-lg transition-transform ${
            result.passed
              ? "bg-emerald-500 text-white shadow-emerald-500/25 ring-8 ring-emerald-100"
              : "bg-amber-500 text-white shadow-amber-500/25 ring-8 ring-amber-100"
          }`}
        >
          {result.passed ? (
            <Award className="w-8 h-8 mb-1" />
          ) : (
            <AlertTriangle className="w-8 h-8 mb-1" />
          )}
          <span className="text-3xl font-black">{result.score}%</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-gray-900">
            {result.passed ? "Assessment Passed!" : "Assessment Needs Review"}
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto">
            {result.feedback}
          </p>
        </div>

        {result.passed ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-left flex items-start gap-3.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                Verified Skill Credential Granted
              </h4>
              <p className="text-xs text-emerald-700 mt-1 leading-relaxed">
                Your Trust Score has increased by +15 points. This badge will be highlighted in all employer search feeds.
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left flex items-start gap-3.5">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                {result.cooldown_days}-Day Retake Window
              </h4>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                You can continue onboarding and build your portfolio. You can re-attempt this quiz after the cooldown window closes.
              </p>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400">
          Advancing to portfolio step automatically...
        </p>
      </div>
    );
  }

  if (!question) return null;

  const timerRatio = timeLeft / timeLimit;
  const isTimeCritical = timeLeft <= 5;
  const isTimeWarning = timeLeft <= 10;

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Skills Evaluation
          </span>
          <p className="text-sm font-bold text-gray-800">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Timer pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-sm font-extrabold border transition-colors ${
            isTimeCritical
              ? "bg-red-50 text-red-600 border-red-200 animate-pulse"
              : isTimeWarning
              ? "bg-amber-50 text-amber-600 border-amber-200"
              : "bg-gray-100 text-gray-700 border-gray-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Timer Bar */}
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            isTimeCritical
              ? "bg-red-500"
              : isTimeWarning
              ? "bg-amber-500"
              : "bg-blue-600"
          }`}
          style={{ width: `${timerRatio * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gray-50/80 border border-gray-200/90 shadow-xs">
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const letter = String.fromCharCode(65 + index);
          return (
            <button
              key={index}
              type="button"
              onClick={() => handleAnswer(index)}
              className="group p-4 sm:p-5 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50/40 text-left transition-all flex items-center gap-4 cursor-pointer shadow-xs hover:shadow-sm"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-100 group-hover:bg-[#2563EB] group-hover:text-white text-gray-700 font-bold text-sm flex items-center justify-center shrink-0 transition-colors">
                {letter}
              </div>
              <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-900 transition-colors flex-1">
                {option}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100" />
            </button>
          );
        })}
      </div>

      <p className="text-center text-xs text-gray-400">
        Answers are locked once selected. Timer will advance automatically if countdown reaches zero.
      </p>
    </div>
  );
}
