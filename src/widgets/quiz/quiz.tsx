"use client";

import { useState } from "react";

import {
  Description,
  Mood,
  Options,
  Progress,
  Result,
  TrackpadMood,
} from "@/entities/quiz";

import { QUIZ_QUESTIONS } from "./constants";

export const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const totalSteps = QUIZ_QUESTIONS.length * 2 + 2;
  const currentQuestionIndex = Math.floor((step - 1) / 2);
  const current = QUIZ_QUESTIONS[currentQuestionIndex];

  const getTitle = () =>
    step <= QUIZ_QUESTIONS.length * 2 ? (
      "Угадай стек Звука"
    ) : step === totalSteps - 1 ? (
      <>
        Теперь выбери <br /> своё настроение
      </>
    ) : (
      <>
        Итак, <br /> твой трек...
      </>
    );

  const handleOptionAnswered = () => {
    setStep(step + 1);
    setSelectedIndex(null);
  };

  const handleNextFromDescription = () => {
    setSelectedIndex(null);
    setStep(step + 1);
  };

  const handleMoodConfirm = (mood: Mood) => {
    setSelectedMood(mood);
    setStep(totalSteps);
  };

  return (
    <>
      <h1>{getTitle()}</h1>
      {step <= QUIZ_QUESTIONS.length * 2 && (
        <Progress
          currentStep={Math.ceil(step / 2)}
          totalSteps={QUIZ_QUESTIONS.length}
        />
      )}
      {step % 2 === 1 && step <= QUIZ_QUESTIONS.length * 2 && (
        <Options
          question={current.question}
          options={current.options}
          correctIndex={current.correctIndex}
          onAnswered={handleOptionAnswered}
        />
      )}
      {step % 2 === 0 && step <= QUIZ_QUESTIONS.length * 2 && (
        <Description
          title={current.options[current.correctIndex]}
          description={current.explanation}
          onNext={handleNextFromDescription}
        />
      )}
      {step === totalSteps - 1 && (
        <TrackpadMood onConfirm={handleMoodConfirm} />
      )}
      {step === totalSteps && selectedMood && <Result mood={selectedMood} />}
    </>
  );
};
