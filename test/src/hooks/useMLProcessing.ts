import { useEffect, useRef, useState } from 'react';
import { MLProcessor } from '../services/ml/MLProcessor';
import type { MLPrediction } from '../services/ml/types';
import { examAPI } from '../services/api/examAPI';

export function useMLProcessing(examId: string) {
  const processorRef = useRef<MLProcessor | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const processor = new MLProcessor(handlePrediction);
    processorRef.current = processor;

    return () => {
      processor.dispose();
    };
  }, []);

  const handlePrediction = async (prediction: MLPrediction) => {
    // Log security event to backend
    await examAPI.submitSecurityLog(examId, {
      timestamp: prediction.timestamp,
      type: prediction.type,
      details: prediction.result,
    });

    // Update warnings based on prediction
    if (prediction.type === 'face_detection') {
      const result = prediction.result as any; // Type will be FaceDetectionResult
      const newWarnings: string[] = [];

      if (!result.isFaceVisible) {
        newWarnings.push('Face not detected');
      }
      if (result.isLookingAway) {
        newWarnings.push('Looking away from screen');
      }
      if (result.multipleFaces) {
        newWarnings.push('Multiple faces detected');
      }
      if (!result.eyesOpen) {
        newWarnings.push('Please keep your eyes on the screen');
      }

      setWarnings(newWarnings);
    }
  };

  const startProcessing = async (videoElement: HTMLVideoElement) => {
    if (!processorRef.current) return;

    await processorRef.current.initialize(videoElement);
    processorRef.current.startProcessing();
    setIsProcessing(true);
  };

  const stopProcessing = () => {
    processorRef.current?.stopProcessing();
    setIsProcessing(false);
  };

  return {
    startProcessing,
    stopProcessing,
    isProcessing,
    warnings,
  };
}