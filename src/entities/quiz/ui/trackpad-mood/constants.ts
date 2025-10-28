import { Mood } from "@/entities/quiz";

export const moodMap: Record<string, Mood> = {
  ЭНЕРГИЧНОЕ: "energetic",
  ВЕСЕЛОЕ: "happy",
  ГРУСТНОЕ: "sad",
  СПОКОЙНОЕ: "calm",
};

export type MoodLabel = keyof typeof moodMap;

export const initialPercent = { x: 0, y: 100 };
