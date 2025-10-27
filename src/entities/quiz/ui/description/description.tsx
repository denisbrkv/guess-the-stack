import { DescriptionProps } from "./types";

import styles from "./description.module.css";

export const Description = ({
  title,
  description,
  onNext,
}: DescriptionProps) => {
  return (
    <div className={styles.description}>
      <div className={styles.description__inner}>
        <h2 className={styles.description__title}>{title}</h2>
        <p className={styles.description__text}>{description}</p>
      </div>
      <button className={styles.description__button} onClick={onNext}>
        Далее
      </button>
    </div>
  );
};
