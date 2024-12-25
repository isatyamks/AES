import type { FaceDetectionResult, MLPrediction } from './types';

export class MLProcessor {
  private worker: Worker | null = null;
  private videoElement: HTMLVideoElement | null = null;
  private isProcessing = false;
  private onPrediction: (prediction: MLPrediction) => void;

  constructor(onPrediction: (prediction: MLPrediction) => void) {
    this.onPrediction = onPrediction;
  }

  public async initialize(videoElement: HTMLVideoElement): Promise<void> {
    this.videoElement = videoElement;
    // Will be initialized when you add ML models
    // this.worker = new Worker(new URL('./ml.worker.ts', import.meta.url));
    // this.worker.onmessage = this.handleWorkerMessage;
  }

  public startProcessing(): void {
    if (this.isProcessing) return;
    this.isProcessing = true;
    this.processFrame();
  }

  public stopProcessing(): void {
    this.isProcessing = false;
  }

  private processFrame = async (): Promise<void> => {
    if (!this.isProcessing || !this.videoElement) return;

    // Placeholder for ML processing
    // When you add the models, this will send video frames to the worker
    const mockPrediction: MLPrediction = {
      type: 'face_detection',
      result: {
        isFaceVisible: true,
        isLookingAway: false,
        eyesOpen: true,
        multipleFaces: false,
        confidence: 0.95,
      } as FaceDetectionResult,
      timestamp: Date.now(),
    };

    this.onPrediction(mockPrediction);

    // Continue processing frames
    requestAnimationFrame(this.processFrame);
  };

  private handleWorkerMessage = (event: MessageEvent): void => {
    const prediction: MLPrediction = event.data;
    this.onPrediction(prediction);
  };

  public dispose(): void {
    this.stopProcessing();
    this.worker?.terminate();
  }
}