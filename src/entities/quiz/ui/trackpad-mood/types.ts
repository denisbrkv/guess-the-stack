import { Mood } from "@/entities/quiz";

export interface TrackpadMoodProps {
  onSelect?: (mood: Mood) => void;
}
