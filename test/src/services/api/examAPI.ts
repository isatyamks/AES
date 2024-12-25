import type { Question } from '../../types';

const API_BASE_URL = 'http://localhost:5000/api';

export interface ExamSubmission {
  examId: string;
  studentId: string;
  answers: Record<string, number>;
  securityLogs: SecurityLog[];
}

export interface SecurityLog {
  timestamp: number;
  type: 'face_detection' | 'object_detection' | 'activity';
  details: Record<string, any>;
}

export const examAPI = {
  async startExam(examId: string): Promise<{
    questions: Question[];
    duration: number;
    examId: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/exams/${examId}/start`, {
      method: 'POST',
      credentials: 'include',
    });
    return response.json();
  },

  async submitExam(submission: ExamSubmission): Promise<{
    success: boolean;
    score?: number;
    message?: string;
  }> {
    const response = await fetch(`${API_BASE_URL}/exams/${submission.examId}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(submission),
    });
    return response.json();
  },

  async submitSecurityLog(examId: string, log: SecurityLog): Promise<void> {
    await fetch(`${API_BASE_URL}/exams/${examId}/security-log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(log),
    });
  },
}