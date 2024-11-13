import React from 'react';

interface WinMessageProps {
  clickCount: number;
  effectType: 'normal' | 'delay' | 'blackout';
}

export function WinMessage({ clickCount, effectType }: WinMessageProps) {
  const animationClass = effectType === 'normal' ? 'animate-bounce' : 'animate-fade-in';

  return (
    <div className={`mt-8 flex flex-col gap-4 ${animationClass}`}>
      <div className="rainbow-text text-5xl font-bold tracking-wider">
        GOGO BTC!
      </div>
      <div className="text-xl text-yellow-400">
        {clickCount === 1 ? (
          <>１G連おめでとう！素晴らしいヒキ！いらっしゃいませ～</>
        ) : (
          <>{clickCount}回目で当たりを引きました！おめでとう！</>
        )}
      </div>
    </div>
  );
}