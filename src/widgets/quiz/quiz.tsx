"use client";

import { useState } from "react";

import { Description, Options, Progress, TrackpadMood } from "@/entities/quiz";

import { STACKS } from "./constants";

export const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleStackSelect = (stack: string) => {
    setSelectedStack(stack);
    setStep(2);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setStep(4);
  };

  return (
    <>
      <h1>Угадай стеки</h1>
      <Progress currentStep={step} totalSteps={4} />
      {step === 1 && (
        <Options
          options={STACKS.map((stack) => stack.title)}
          onSelect={handleStackSelect}
        />
      )}
      {step === 2 && selectedStack && (
        <Description
          title={selectedStack}
          description={
            STACKS.find((s) => s.title === selectedStack)?.description
          }
          onNext={() => setStep(3)}
        />
      )}
      {step === 3 && <TrackpadMood />}
      {step === 4 && selectedStack && selectedMood && (
        <div>
          <h2>Результат</h2>
          <p>Стек: {selectedStack}</p>
          <p>Настроение: {selectedMood}</p>
          <button onClick={() => setStep(1)}>Пройти ещё раз</button>
        </div>
      )}
    </>
  );
};
