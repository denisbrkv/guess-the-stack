import { useEffect, useRef } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

import { Mood } from "@/entities/quiz";

import { botName, trackByMood } from "./constants";

import styles from "./result.module.css";

interface ResultProps {
  mood: Mood;
}

export const Result = ({ mood }: ResultProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const track = trackByMood[mood];
  const botLink = `https://t.me/${botName}?start=${mood}`;

  useEffect(() => {
    audioRef.current?.play().catch(() => {});
  }, [mood]);

  return (
    <div className={styles.result}>
      <div className={styles.result__track}>
        <Image
          src={track.cover}
          alt={track.title}
          width={174}
          height={174}
          className={styles.result__cover}
        />
        <div className={styles.result__column}>
          <div className={styles.result__artist}>{track.artist}</div>
          <div className={styles.result__title}>{track.title}</div>
        </div>
      </div>
      <audio ref={audioRef} src={track.audio} loop />
      <div className={styles.result__qr}>
        <QRCodeSVG
          value={botLink}
          size={267}
          level="H"
          fgColor="#000000"
          bgColor="#ffffff"
          marginSize={1}
        />
        <p className={styles.result__text}>
          Следите за новыми <br />
          вакансиями и статьями <br />
          от наших экспертов
        </p>
      </div>
    </div>
  );
};
