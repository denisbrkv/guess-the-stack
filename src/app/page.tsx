import { Logo } from "@/shared/ui/logo";

import styles from "./page.module.css";

export default function Main() {
  return (
    <div className={styles.inner}>
      <Logo className={styles.logo} />
      <h1>Угадай стеки</h1>
    </div>
  );
}
