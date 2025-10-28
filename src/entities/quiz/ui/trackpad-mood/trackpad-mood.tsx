import { useRef, useState } from "react";

import { Mood } from "@/entities/quiz";

import styles from "./trackpad-mood.module.css";

export const TrackpadMood = ({
  onSelect,
}: {
  onSelect?: (mood: Mood) => void;
}) => {
  const [currentMood, setCurrentMood] =
    useState<keyof typeof moodMap>("Грустное");
  const [position, setPosition] = useState({ x: 25, y: 25 });
  const [dragging, setDragging] = useState(false);
  const trackpadRef = useRef<HTMLDivElement>(null);

  const moodMap: Record<string, Mood> = {
    Энергичное: "energetic",
    Весёлое: "happy",
    Грустное: "sad",
    Спокойное: "calm",
  };

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackpadRef.current) return;

    const rect = trackpadRef.current.getBoundingClientRect();

    const xPx = e.clientX - rect.left;
    const yPx = e.clientY - rect.top;

    const xPct = (xPx / rect.width) * 100;
    const yPct = (yPx / rect.height) * 100;

    trackpadRef.current.style.setProperty("--thumb-x-pct", `${xPct}%`);
    trackpadRef.current.style.setProperty("--thumb-y-pct", `${yPct}%`);

    setPosition({ x: xPct, y: yPct });

    let mood = "";
    if (yPct < 50 && xPct < 50) mood = "Энергичное";
    else if (yPct < 50 && xPct >= 50) mood = "Весёлое";
    else if (yPct >= 50 && xPct < 50) mood = "Грустное";
    else mood = "Спокойное";

    setCurrentMood(mood);
  };

  return (
    <div className={styles.trackpad}>
      <div
        ref={trackpadRef}
        className={styles.trackpad__inner}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className={styles.trackpad__image} />

        <div
          className={styles.thumb}
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            setDragging(true);
          }}
        >
          <div className={styles.thumb__center} />
        </div>
        <div className={styles.labels}>
          <div className={styles.labels__row}>
            <span>ЭНЕРГИЧНОЕ</span>
            <span>ВЕСЁЛОЕ</span>
          </div>
          <div className={styles.labels__row}>
            <span>ГРУСТНОЕ</span>
            <span>СПОКОЙНОЕ</span>
          </div>
        </div>
      </div>
      <button
        className={styles.trackpad__result}
        onClick={() => onSelect?.(moodMap[currentMood])}
      >
        Узнать результаты
      </button>
    </div>
  );
};
