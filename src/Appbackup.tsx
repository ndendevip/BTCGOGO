import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { BitcoinButton } from './components/BitcoinButton';
import { WinMessage } from './components/WinMessage';
import { GameStatus } from './components/GameStatus';

function App() {
  const [isGlowing, setIsGlowing] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [winEffectType, setWinEffectType] = useState<'normal' | 'delay' | 'drop' | 'blackout'>('normal');
  const [showButton, setShowButton] = useState(true);
  const [blackoutComplete, setBlackoutComplete] = useState(false);

  const handleClick = () => {
    if (gameEnded) return;
    
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    const random = Math.floor(Math.random() * 20);
    const isWin = random === 0;
    
    if (isWin) {
      setIsGlowing(true);
      setGameEnded(true);
      
      const effectRandom = Math.random();
      if (effectRandom < 0.2) { // 20% delay effect
        setWinEffectType('delay');
        setTimeout(() => {
          setShowWinMessage(true);
        }, 1800);
      } else if (effectRandom < 0.4) { // 20% drop effect
        setWinEffectType('drop');
        setShowWinMessage(true);
      } else if (effectRandom < 0.9) { // 20% blackout effect
        setWinEffectType('blackout');
        setShowButton(false);
        setTimeout(() => {
          setBlackoutComplete(true);
          setShowWinMessage(true);
        }, 3500);
      } else { // 40% normal effect
        setWinEffectType('normal');
        setShowWinMessage(true);
      }
    }
  };

  const handleReset = () => {
    setIsGlowing(false);
    setClickCount(0);
    setGameEnded(false);
    setShowWinMessage(false);
    setWinEffectType('normal');
    setShowButton(true);
    setBlackoutComplete(false); // リセット時に追加
  };

  return (
  <div className={`
      min-h-screen transition-colors duration-1000 
      ${winEffectType === 'blackout' && !blackoutComplete ? 'bg-black' : 'bg-gradient-to-b from-gray-900 to-gray-800'} 
      flex flex-col items-center justify-center p-4
    `}>
      <div className={`text-center ${isGlowing ? 'animate-pulse' : ''}`}>
        <div className="flex flex-col items-center">
          {showButton && (
            <BitcoinButton 
              onClick={handleClick} 
              disabled={gameEnded}
              isWinner={isGlowing}
            />
          )}
          
          {isGlowing && showWinMessage && (
            <WinMessage 
              clickCount={clickCount} 
              effectType={winEffectType}
            />
          )}
          
          <GameStatus 
            clickCount={clickCount} 
            gameEnded={gameEnded} 
            isWinner={isGlowing}
          />

          {gameEnded && (
            <div className="mt-12">
              <button
                onClick={handleReset}
                className="
                  px-6 py-3 rounded-full
                  bg-green-600 hover:bg-green-700 
                  text-white animate-pulse
                  flex items-center gap-2 
                  transition-all duration-200
                  shadow-md hover:shadow-lg
                  text-lg font-medium
                "
              >
                <RotateCcw className="w-5 h-5" />
                新しいゲームを始める
              </button>
            </div>
          )}

          {!gameEnded && (
            <button
              onClick={handleReset}
              className="
                mt-4 px-4 py-2 rounded-full
                bg-gray-700 hover:bg-gray-600 
                text-gray-300
                flex items-center gap-2 
                transition-all duration-200
                shadow-md hover:shadow-lg
                text-sm
              "
            >
              <RotateCcw className="w-4 h-4" />
              リセット
            </button>
          )}
        </div>
      </div>

      <div className="fixed bottom-4 text-sm text-gray-600">
        Probability: 1/20 (5%)
      </div>
    </div>
  );
}

export default App;