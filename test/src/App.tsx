import React, { useState, useCallback } from 'react';
import { ExamTimer } from './components/ExamTimer';
import { WebcamMonitor } from './components/WebcamMonitor';
import { QuestionCard } from './components/QuestionCard';
import { LoginForm } from './components/LoginForm';
import type { Question, ExamState, FaceDetectionStatus, AuthState } from './types';

const EXAM_DURATION = 30 * 60; // 30 minutes in seconds

const sampleQuestions: Question[] = [
  {
    id: '1',
    text: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 2,
  },
  {
    id: '2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 1,
  },
];

function App() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const [examState, setExamState] = useState<ExamState>({
    currentQuestion: 0,
    timeRemaining: EXAM_DURATION,
    answers: {},
    isWebcamActive: false,
    faceDetectionWarnings: [],
  });

  const handleLogin = async (email: string, password: string) => {
    // TODO: Implement actual authentication
    // This is a mock implementation
    if (email && password) {
      setAuth({
        isAuthenticated: true,
        user: {
          id: '1',
          email,
        },
      });
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const handleAnswerSelect = useCallback((answerId: number) => {
    setExamState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [sampleQuestions[prev.currentQuestion].id]: answerId,
      },
    }));
  }, []);

  const handleTimeEnd = useCallback(() => {
    // Handle exam submission when time runs out
    console.log('Exam time ended');
  }, []);

  const handleTimeTick = useCallback((newTime: number) => {
    setExamState(prev => ({
      ...prev,
      timeRemaining: newTime,
    }));
  }, []);

  const handleFaceDetectionStatus = useCallback(({ isFaceVisible, isLookingAway }: FaceDetectionStatus) => {
    setExamState(prev => ({
      ...prev,
      faceDetectionWarnings: [
        ...prev.faceDetectionWarnings,
        !isFaceVisible
          ? 'Face not detected'
          : isLookingAway
          ? 'Looking away from screen'
          : '',
      ].filter(Boolean),
    }));
  }, []);

  if (!auth.isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const currentQuestion = sampleQuestions[examState.currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50">
      <ExamTimer
        timeRemaining={examState.timeRemaining}
        onTimeEnd={handleTimeEnd}
        onTick={handleTimeTick}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 text-center">Online Exam System</h1>
          <p className="text-gray-600 text-center mt-2">
            Question {examState.currentQuestion + 1} of {sampleQuestions.length}
          </p>
        </div>

        {currentQuestion && (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={examState.answers[currentQuestion.id]}
            onAnswerSelect={handleAnswerSelect}
          />
        )}

        {examState.faceDetectionWarnings.length > 0 && (
          <div className="fixed top-4 left-4 max-w-md">
            {examState.faceDetectionWarnings.map((warning, index) => (
              <div
                key={index}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-2"
              >
                <p className="text-red-700">{warning}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <WebcamMonitor onFaceDetectionStatus={handleFaceDetectionStatus} />
    </div>
  );
}

export default App;