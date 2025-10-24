import clsx from "clsx";

import { ProgressProps } from "./types";

import styles from "./progress.module.css";

export const Progress = ({ currentStep, totalSteps }: ProgressProps) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles["progress"]}>
      {steps.map((step, index) => (
        <div key={step} className={styles["progress__item"]}>
          <div
            className={clsx(styles["progress__circle"], {
              [styles["progress__circle--active"]]: step === currentStep,
              [styles["progress__circle--completed"]]: step < currentStep,
            })}
          />
          {index !== steps.length - 1 && (
            <div
              className={clsx(styles["progress__line"], {
                [styles["progress__line--completed"]]: step <= currentStep,
              })}
            />
          )}
        </div>
      ))}
    </div>
  );
};
