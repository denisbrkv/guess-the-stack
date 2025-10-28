import { Mood } from "@/entities/quiz";

export interface TrackpadMoodProps {
  onConfirm: (mood: Mood) => void;
}
