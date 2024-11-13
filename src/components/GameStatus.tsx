import React from 'react';

interface GameStatusProps {
  clickCount: number;
  gameEnded: boolean;
  isWinner: boolean;
}

export function GameStatus({ clickCount, gameEnded, isWinner }: GameStatusProps) {
  return (
    <div className="mt-6 space-y-2">
      <div className="text-gray-400">
        Clicks: {clickCount}
      </div>
      
      {!isWinner && clickCount > 0 && !gameEnded && (
        <div className="text-gray-500">
          まだチャンスです！ (1/20の確率)
        </div>
      )}
      
      {gameEnded && !isWinner && (
        <div className="text-gray-500">
          ゲーム終了 - リセットして再チャレンジ
        </div>
      )}
    </div>
  );
}