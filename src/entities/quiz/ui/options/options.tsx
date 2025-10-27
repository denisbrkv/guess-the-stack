import { OptionsProps } from "./types";

import styles from "./options.module.css";

export const Options = ({ options }: OptionsProps) => {
  return (
    <div className={styles.options}>
      {options.map((option) => (
        <button key={option} className={styles.options__item}>
          {option}
        </button>
      ))}
    </div>
  );
};
