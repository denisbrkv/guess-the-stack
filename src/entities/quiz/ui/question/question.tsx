import { useEffect, useState } from "react";
import clsx from "clsx";

import { DELAY_SHOW_ANSWER } from "@/entities/quiz/ui/question/constants";

import { OptionsProps } from "./types";

import styles from "./question.module.css";

export const Question = ({
  question,
  options,
  correctIndex,
  onAnswered,
}: OptionsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSelect = (index: number) => {
    if (showFeedback) return;
    setSelectedIndex(index);
    setShowFeedback(true);
  };

  useEffect(() => {
    if (showFeedback) {
      const timeout = setTimeout(() => {
        onAnswered();
        setShowFeedback(false);
        setSelectedIndex(null);
      }, DELAY_SHOW_ANSWER);
      return () => clearTimeout(timeout);
    }
  }, [showFeedback, onAnswered]);

  return (
    <div className={styles.question}>
      <p className={styles.question__text}>{question}</p>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = index === correctIndex;

        const className = clsx(styles.question__item, {
          [styles["question__item--correct"]]: showFeedback && isCorrect,
          [styles["question__item--incorrect"]]:
            showFeedback && isSelected && !isCorrect,
        });

        return (
          <button
            key={option}
            className={className}
            onClick={() => handleSelect(index)}
            disabled={showFeedback}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};
