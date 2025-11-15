import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConceptProgress } from '../types/concept';

// Concept Progress Context
// Phase 2, Step 2.3

type ConceptContextType = {
  conceptProgress: Map<string, ConceptProgress>;
  getProgress: (conceptId: string) => ConceptProgress;
  updateProgress: (conceptId: string, updates: Partial<ConceptProgress>) => void;
  markConceptComplete: (conceptId: string, quizScore: number) => void;
  getTotalCompleted: () => number;
  getAverageQuizScore: () => number;
};

const ConceptContext = createContext<ConceptContextType | undefined>(undefined);

export function ConceptProvider({ children }: { children: ReactNode }) {
  const [conceptProgress, setConceptProgress] = useState<Map<string, ConceptProgress>>(new Map());

  const getProgress = (conceptId: string): ConceptProgress => {
    return conceptProgress.get(conceptId) || {
      conceptId,
      status: 'not_started',
      quizAttempts: 0,
      timeSpent: 0,
    };
  };

  const updateProgress = (conceptId: string, updates: Partial<ConceptProgress>) => {
    const current = getProgress(conceptId);
    const updated: ConceptProgress = {
      ...current,
      ...updates,
      lastAccessed: new Date(),
    };

    setConceptProgress(prev => new Map(prev).set(conceptId, updated));
  };

  const markConceptComplete = (conceptId: string, quizScore: number) => {
    const current = getProgress(conceptId);
    const updated: ConceptProgress = {
      ...current,
      status: 'completed',
      quizScore,
      quizAttempts: current.quizAttempts + 1,
      completedDate: new Date(),
      lastAccessed: new Date(),
    };

    setConceptProgress(prev => new Map(prev).set(conceptId, updated));
  };

  const getTotalCompleted = (): number => {
    return Array.from(conceptProgress.values()).filter(p => p.status === 'completed').length;
  };

  const getAverageQuizScore = (): number => {
    const completed = Array.from(conceptProgress.values()).filter(
      p => p.status === 'completed' && p.quizScore !== undefined
    );

    if (completed.length === 0) return 0;

    const sum = completed.reduce((acc, p) => acc + (p.quizScore || 0), 0);
    return Math.round(sum / completed.length);
  };

  return (
    <ConceptContext.Provider
      value={{
        conceptProgress,
        getProgress,
        updateProgress,
        markConceptComplete,
        getTotalCompleted,
        getAverageQuizScore,
      }}
    >
      {children}
    </ConceptContext.Provider>
  );
}

export function useConceptContext() {
  const context = useContext(ConceptContext);
  if (context === undefined) {
    throw new Error('useConceptContext must be used within a ConceptProvider');
  }
  return context;
}

