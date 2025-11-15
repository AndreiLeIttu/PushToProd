
import React from 'react';
import { PiggyBankIcon } from './icons/PiggyBankIcon';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 text-center bg-gradient-to-br from-emerald-400 to-cyan-500 text-white min-h-[500px]">
      <PiggyBankIcon className="w-24 h-24 mb-6 text-white" />
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to FinQuest!</h1>
      <p className="text-lg md:text-xl max-w-lg mb-8">
        Navigate life's financial journey, make smart choices, and master the world of money in this interactive simulation.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-white text-emerald-500 font-bold text-xl rounded-full shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 ease-in-out"
      >
        Start Your Life
      </button>
    </div>
  );
};

export default StartScreen;
