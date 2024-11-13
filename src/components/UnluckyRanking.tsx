import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

interface UnluckyPlayer {
  name: string;
  attempts: number;
  timestamp: number;
}

interface UnluckyRankingProps {
  attempts: number;
  show: boolean;
}

export function UnluckyRanking({ attempts, show }: UnluckyRankingProps) {
  const [playerName, setPlayerName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!show || attempts < 5) return null;

  const getTopPlayers = (): UnluckyPlayer[] => {
    const players = JSON.parse(localStorage.getItem('unluckyPlayers') || '[]');
    return players.sort((a: UnluckyPlayer, b: UnluckyPlayer) => b.attempts - a.attempts).slice(0, 3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || submitted) return;

    const newPlayer: UnluckyPlayer = {
      name: playerName.trim(),
      attempts,
      timestamp: Date.now()
    };

    const players = JSON.parse(localStorage.getItem('unluckyPlayers') || '[]');
    players.push(newPlayer);
    
    // Keep only top 3 players
    const topPlayers = players
      .sort((a: UnluckyPlayer, b: UnluckyPlayer) => b.attempts - a.attempts || b.timestamp - a.timestamp)
      .slice(0, 3);

    localStorage.setItem('unluckyPlayers', JSON.stringify(topPlayers));
    setSubmitted(true);
  };

  const topPlayers = getTopPlayers();
  const canSubmit = !submitted && (!topPlayers.length || attempts > topPlayers[topPlayers.length - 1].attempts);

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-white">ハマり王 TOP3</h2>
      </div>

      <div className="space-y-4">
        {canSubmit && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-yellow-400 text-sm">
              {attempts}回チャレンジ！ランキングに登録しましょう！
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="あなたの名前"
                maxLength={20}
                className="flex-1 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
                disabled={submitted}
              />
              <button
                type="submit"
                disabled={submitted || !playerName.trim()}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded font-medium hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                登録
              </button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="text-green-400 text-sm">
            ランキングに登録されました！
          </div>
        )}

        <div className="space-y-2">
          {topPlayers.map((player, index) => (
            <div
              key={`${player.name}-${player.timestamp}`}
              className="flex items-center justify-between p-3 rounded bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className={`font-bold ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : 'text-yellow-700'}`}>
                  {index + 1}
                </span>
                <span className="text-white">{player.name}</span>
              </div>
              <span className="text-gray-300">{player.attempts}回</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}