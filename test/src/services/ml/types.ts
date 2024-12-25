export interface FaceDetectionResult {
  isFaceVisible: boolean;
  isLookingAway: boolean;
  eyesOpen: boolean;
  multipleFaces: boolean;
  confidence: number;
  landmarks?: {
    eyes: { left: Point; right: Point };
    nose: Point;
    mouth: Point[];
  };
}

export interface Point {
  x: number;
  y: number;
}

export interface MLPrediction {
  type: 'face_detection' | 'object_detection' | 'activity_recognition';
  result: FaceDetectionResult | ObjectDetectionResult | ActivityResult;
  timestamp: number;
}

export interface ObjectDetectionResult {
  objects: DetectedObject[];
  hasPhone: boolean;
  hasSecondScreen: boolean;
}

export interface ActivityResult {
  isTyping: boolean;
  isMoving: boolean;
  confidence: number;
}

interface DetectedObject {
  class: string;
  confidence: number;
  bbox: [number, number, number, number]; // [x, y, width, height]
}