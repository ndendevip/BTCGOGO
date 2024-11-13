import React from 'react';
import { Bitcoin } from 'lucide-react';

interface BitcoinButtonProps {
  onClick: () => void;
  disabled: boolean;
  isWinner: boolean;
}

export function BitcoinButton({ onClick, disabled, isWinner }: BitcoinButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`
        group relative
        w-24 h-24 rounded-full
        ${isWinner 
          ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 scale-110' 
          : 'bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600'
        }
        transform hover:scale-105 transition-all duration-200
        shadow-lg hover:shadow-xl
        flex items-center justify-center
        ${disabled 
          ? 'opacity-90 cursor-not-allowed pointer-events-none' 
          : 'hover:scale-105'
        }
        ${disabled && !isWinner && 'grayscale'}
      `}
    >
      <Bitcoin 
        className={`
          w-12 h-12 
          ${isWinner ? 'text-white animate-spin' : 'text-white'}
        `} 
      />
      {disabled && !isWinner && (
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center">
          <span className="text-white text-sm">ゲーム終了</span>
        </div>
      )}
    </button>
  );
}