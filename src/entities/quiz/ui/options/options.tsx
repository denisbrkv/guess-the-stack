import { OptionsProps } from "./types";

import styles from "./options.module.css";

export const Options = ({ options, onSelect }: OptionsProps) => {
  return (
    <div className={styles.options}>
      {options.map((option) => (
        <button
          key={option}
          className={styles.options__item}
          onClick={() => onSelect?.(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
