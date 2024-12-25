import React, { useEffect, useRef } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';
import { useMLProcessing } from '../hooks/useMLProcessing';

interface WebcamMonitorProps {
  examId?: string;
  onFaceDetectionStatus: (status: { isFaceVisible: boolean; isLookingAway: boolean }) => void;
}

export function WebcamMonitor({ examId = 'test', onFaceDetectionStatus }: WebcamMonitorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = React.useState<string>('');
  const { startProcessing, warnings } = useMLProcessing(examId);

  useEffect(() => {
    if (warnings.length > 0) {
      // Extract face detection status from warnings
      const isFaceVisible = !warnings.includes('Face not detected');
      const isLookingAway = warnings.includes('Looking away from screen');
      onFaceDetectionStatus({ isFaceVisible, isLookingAway });
    }
  }, [warnings, onFaceDetectionStatus]);

  useEffect(() => {
    async function setupWebcam() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'user',
          },
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          startProcessing(videoRef.current);
        }
      } catch (err) {
        setError('Unable to access webcam. Please ensure you have granted camera permissions.');
      }
    }

    setupWebcam();

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [startProcessing]);

  return (
    <div className="fixed bottom-4 right-4 w-64">
      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-medium">Camera Error</span>
          </div>
          <p className="text-sm text-red-500 mt-1">{error}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-2 bg-gray-50 border-b flex items-center gap-2">
            <Camera className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Webcam Monitor</span>
          </div>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full aspect-video object-cover"
          />
        </div>
      )}
    </div>
  );
}