import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { UnluckyPlayer } from '../lib/db';

interface UnluckyLeaderboardProps {
  players: UnluckyPlayer[];
  onSubmit: (name: string) => Promise<void>;
  attempts: number;
  show: boolean;
}

export function UnluckyLeaderboard({ players, onSubmit, attempts, show }: UnluckyLeaderboardProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!show) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSubmitting || submitted) return;

    setIsSubmitting(true);
    try {
      await onSubmit(playerName);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-auto">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-white">ハマり王ランキング</h2>
      </div>

      <div className="space-y-4">
        {!submitted && (
          <form onSubmit={handleSubmit} className="space-y-3 mb-6">
            <p className="text-yellow-400 text-sm">
              {attempts}回もチャレンジしましたね！ランキングに登録しませんか？
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="あなたの名前"
                maxLength={20}
                className="flex-1 px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-yellow-500 focus:outline-none"
                disabled={isSubmitting || submitted}
              />
              <button
                type="submit"
                disabled={isSubmitting || submitted || !playerName.trim()}
                className="px-4 py-2 bg-yellow-500 text-gray-900 rounded font-medium hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? '送信中...' : '登録'}
              </button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="text-green-400 text-sm mb-4">
            ランキングに登録されました！
          </div>
        )}

        <div className="space-y-2">
          {players.map((player, index) => (
            <div
              key={player.id}
              className="flex items-center justify-between p-3 rounded bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <span className="text-yellow-500 font-bold">{index + 1}</span>
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