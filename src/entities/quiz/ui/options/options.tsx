import { useEffect, useState } from "react";
import clsx from "clsx";

import { DELAY_SHOW_ANSWER } from "@/entities/quiz/ui/options/constants";

import { OptionsProps } from "./types";

import styles from "./options.module.css";

export const Options = ({
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
    <div className={styles.options}>
      <p className={styles.options__question}>{question}</p>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCorrect = index === correctIndex;

        const className = clsx(styles.options__item, {
          [styles["options__item--correct"]]: showFeedback && isCorrect,
          [styles["options__item--incorrect"]]:
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
