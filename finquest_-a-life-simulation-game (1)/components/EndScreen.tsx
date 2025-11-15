
import React, { useState } from 'react';
import { ConceptToReview } from '../types';
import { TrophyIcon } from './icons/TrophyIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';

interface EndScreenProps {
  summary: {
    overallSummary: string;
    conceptsToReview: ConceptToReview[];
  };
  onPlayAgain: () => void;
}

const ConceptReviewCard: React.FC<{ concept: ConceptToReview }> = ({ concept }) => {
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleAnswerSelect = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
        setShowResult(true);
    }
    
    return (
        <div className="bg-white p-5 rounded-xl shadow-md transition-all hover:shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
                <BookOpenIcon className="w-6 h-6 text-cyan-500"/>
                <h3 className="text-xl font-bold text-cyan-700">{concept.concept}</h3>
            </div>
            <p className="text-gray-600 mb-4">{concept.description}</p>
            <p className="font-semibold text-gray-800 mb-3">{concept.question}</p>
            <div className="space-y-2 mb-4">
                {concept.options.map((option, index) => {
                    let buttonClass = "w-full text-left p-3 rounded-lg border-2 transition-all duration-200 ";
                    if(showResult) {
                        if (index === concept.correctAnswerIndex) {
                            buttonClass += "bg-emerald-100 border-emerald-400 text-emerald-800";
                        } else if (index === selectedAnswer) {
                            buttonClass += "bg-red-100 border-red-400 text-red-800";
                        } else {
                            buttonClass += "bg-gray-100 border-gray-200";
                        }
                    } else {
                         buttonClass += "bg-gray-100 border-gray-200 hover:bg-cyan-100 hover:border-cyan-300";
                    }

                    return (
                        <button key={index} onClick={() => handleAnswerSelect(index)} disabled={showResult} className={buttonClass}>
                            {option}
                        </button>
                    );
                })}
            </div>
            {showResult && (
                 <div className="bg-blue-50 border-l-4 border-blue-400 text-blue-800 p-4 rounded-r-lg">
                    <p className="font-bold">Explanation:</p>
                    <p>{concept.explanation}</p>
                </div>
            )}
        </div>
    )
}

const EndScreen: React.FC<EndScreenProps> = ({ summary, onPlayAgain }) => {
  return (
    <div className="p-6 md:p-8 bg-gray-50">
      <div className="text-center p-6 bg-gradient-to-br from-emerald-400 to-cyan-500 text-white rounded-2xl shadow-lg mb-6">
        <TrophyIcon className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Financial Journey Summary</h1>
        <p className="text-lg">{summary.overallSummary}</p>
      </div>

      {summary.conceptsToReview.length > 0 && (
        <div className="mb-6">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Areas to Strengthen</h2>
            <div className="space-y-4">
                {summary.conceptsToReview.map(concept => <ConceptReviewCard key={concept.concept} concept={concept}/>)}
            </div>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={onPlayAgain}
          className="px-8 py-4 bg-emerald-500 text-white font-bold text-xl rounded-full shadow-lg hover:bg-emerald-600 transform hover:scale-105 transition-all duration-300 ease-in-out"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default EndScreen;
