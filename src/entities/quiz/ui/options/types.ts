export interface OptionsProps {
  question: string;
  options: string[];
  correctIndex: number;
  onAnswered: () => void;
}
