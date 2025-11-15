import React, { useState } from 'react';
import { Scenario, PlayerStats } from '../types';
import { UserIcon } from './icons/UserIcon';
import { WalletIcon } from './icons/WalletIcon';

interface GameScreenProps {
  scenario: Scenario;
  playerStats: PlayerStats;
  onAnswerSubmit: (answer: string) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ scenario, playerStats, onAnswerSubmit }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption) return;
    setIsLoading(true);
    onAnswerSubmit(selectedOption);
  };

  return (
    <div className="p-6 md:p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-xl shadow">
        <div className="flex items-center space-x-3">
          <UserIcon className="w-8 h-8 text-cyan-500" />
          <div>
            <span className="text-sm text-gray-500">Age</span>
            <p className="font-bold text-xl">{playerStats.age}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <WalletIcon className="w-8 h-8 text-emerald-500" />
          <div>
            <span className="text-sm text-gray-500">Net Worth</span>
            <p className="font-bold text-xl">${playerStats.netWorth.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg">
          <>
            <p className="text-gray-600 mb-4 leading-relaxed">{scenario.scenario}</p>
            <h2 className="text-xl font-semibold mb-5">{scenario.question}</h2>
            <div className="space-y-3">
              {scenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOption(option.text)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedOption === option.text
                      ? 'bg-cyan-500 border-cyan-600 text-white shadow-md'
                      : 'bg-gray-100 border-gray-200 hover:bg-cyan-100 hover:border-cyan-300'
                  }`}
                >
                  {option.text}
                </button>
              ))}
            </div>
            <div className="mt-6 text-center">
              <button
                onClick={handleSubmit}
                disabled={!selectedOption || isLoading}
                className="px-8 py-3 bg-emerald-500 text-white font-bold rounded-full shadow-md hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div> : 'Make Choice'}
              </button>
            </div>
          </>
      </div>
    </div>
  );
};

export default GameScreen;
