export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface ExamState {
  currentQuestion: number;
  timeRemaining: number;
  answers: Record<string, number>;
  isWebcamActive: boolean;
  faceDetectionWarnings: string[];
}

export interface FaceDetectionStatus {
  isFaceVisible: boolean;
  isLookingAway: boolean;
  warning?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
  } | null;
}