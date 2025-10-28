import { useEffect, useRef, useState } from "react";

import { Mood } from "@/entities/quiz";

import { initialPercent, type MoodLabel, moodMap } from "./constants";
import { TrackpadMoodProps } from "./types";

import styles from "./trackpad-mood.module.css";

const getLabel = (xPct: number, yPct: number): MoodLabel => {
  if (yPct < 50 && xPct < 50) return "ЭНЕРГИЧНОЕ";
  if (yPct < 50 && xPct >= 50) return "ВЕСЕЛОЕ";
  if (yPct >= 50 && xPct < 50) return "ГРУСТНОЕ";
  return "СПОКОЙНОЕ";
};

export const TrackpadMood = ({ onConfirm }: TrackpadMoodProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [currentMood, setCurrentMood] = useState<Mood>("sad");
  const [activeOffset, setActiveOffset] = useState({ x: 0, y: 0 });

  const padRef = useRef<HTMLDivElement>(null);

  const getActiveAreaMetrics = () => {
    const rect = padRef.current?.getBoundingClientRect();
    const parentRect = padRef.current?.offsetParent?.getBoundingClientRect();

    if (!rect || !parentRect) return null;

    const offsetX = rect.left - parentRect.left;
    const offsetY = rect.top - parentRect.top;

    return { rect, offset: { x: offsetX, y: offsetY } };
  };

  const updatePosition = (clientX: number, clientY: number) => {
    const metrics = getActiveAreaMetrics();
    if (!metrics) return;

    const { rect, offset } = metrics;
    setActiveOffset(offset);

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const clampedX = Math.max(0, Math.min(x, rect.width));
    const clampedY = Math.max(0, Math.min(y, rect.height));

    setPosition({ x: clampedX, y: clampedY });

    const xPct = (clampedX / rect.width) * 100;
    const yPct = (clampedY / rect.height) * 100;

    const label = getLabel(xPct, yPct);
    setCurrentMood(moodMap[label]);
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragging(true);
    const point = "touches" in e ? e.touches[0] : e;
    updatePosition(point.clientX, point.clientY);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const point = "touches" in e ? e.touches[0] : e;
    updatePosition(point.clientX, point.clientY);
  };

  const handleEnd = () => setDragging(false);

  useEffect(() => {
    const metrics = getActiveAreaMetrics();
    if (!metrics) return;

    const { rect, offset } = metrics;
    setActiveOffset(offset);

    const xPx = (initialPercent.x / 100) * rect.width;
    const yPx = (initialPercent.y / 100) * rect.height;

    setPosition({ x: xPx, y: yPx });

    const label = getLabel(initialPercent.x, initialPercent.y);
    setCurrentMood(moodMap[label]);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.trackpad}>
        <div className={styles.trackpad__labels}>
          <div className={styles.trackpad__row}>
            <span>ЭНЕРГИЧНОЕ</span>
            <span>ВЕСЕЛОЕ</span>
          </div>
          <div className={styles.trackpad__row}>
            <span>ГРУСТНОЕ</span>
            <span>СПОКОЙНОЕ</span>
          </div>
        </div>
        <div
          className={styles.trackpad__overlay}
          style={{
            maskImage: `radial-gradient(120px at ${position.x + activeOffset.x}px ${position.y + activeOffset.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)`,
            WebkitMaskImage: `radial-gradient(120px at ${position.x + activeOffset.x}px ${position.y + activeOffset.y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)`,
          }}
        >
          <img
            src="/images/trackpad.png"
            alt="trackpad"
            className={styles.trackpad__gradient}
          />
        </div>
        <div
          className={styles.trackpad__area}
          ref={padRef}
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          onMouseUp={handleEnd}
          onTouchEnd={handleEnd}
          onMouseLeave={handleEnd}
        >
          <div
            className={styles.trackpad__thumb}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          />

          <div className={styles.trackpad__dots}>
            {[...Array(7)].map((_, row) =>
              [...Array(40)].map((_, col) => (
                <div key={`${row}-${col}`} className={styles.trackpad__dot} />
              )),
            )}
          </div>
        </div>
      </div>

      <button
        className={styles.trackpad__result}
        onClick={() => onConfirm(currentMood)}
      >
        Узнать результат
      </button>
    </div>
  );
};
