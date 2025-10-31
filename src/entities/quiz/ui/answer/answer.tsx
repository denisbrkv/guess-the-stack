import { DescriptionProps } from "./types";

import styles from "./answer.module.css";

export const Answer = ({ title, description, onNext }: DescriptionProps) => {
  return (
    <div className={styles.answer}>
      <div className={styles.answer__inner}>
        <h2 className={styles.answer__title}>{title}</h2>
        <div
          className={styles.answer__text}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      <button className={styles.answer__button} onClick={onNext}>
        Далее
      </button>
    </div>
  );
};
