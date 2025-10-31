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
        <div className={styles.result__box}>
          <QRCodeSVG
            value={botLink}
            level="H"
            fgColor="#000000"
            bgColor="#ffffff"
            style={{ width: "100%", height: "auto" }}
            marginSize={1}
          />
        </div>
        <p className={styles.result__text}>
          Переходи по QR-коду в Телеграм, чтобы бот засчитал тебе задание!
        </p>
      </div>
    </div>
  );
};
