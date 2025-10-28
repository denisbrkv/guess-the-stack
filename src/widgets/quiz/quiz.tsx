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

import { STACKS } from "./constants";

export const Quiz = () => {
  const [step, setStep] = useState(1);
  const [selectedStack, setSelectedStack] = useState<string | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);

  const getTitle = () =>
    step === 3 ? (
      <>
        Теперь выбери <br /> своё настроение
      </>
    ) : step === 4 ? (
      <>
        И так, <br /> твой трек...
      </>
    ) : (
      "Угадай стеки"
    );

  const handleStackSelect = (stack: string) => {
    setSelectedStack(stack);
    setStep(2);
  };

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setStep(4);
  };

  return (
    <>
      <h1>{getTitle()}</h1>
      {step <= 2 && <Progress currentStep={step} totalSteps={4} />}
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
      {step === 3 && <TrackpadMood onConfirm={handleMoodSelect} />}
      {step === 4 && selectedStack && selectedMood && (
        <Result mood={selectedMood} />
      )}
    </>
  );
};
