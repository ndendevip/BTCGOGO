import React, { useState } from 'react';
import { Trophy } from 'lucide-react';
import { UnluckyRecord } from '../lib/db';

interface UnluckyRecordProps {
  record: UnluckyRecord | null;
  onSubmit: (name: string) => Promise<void>;
  attempts: number;
  show: boolean;
}

export function UnluckyRecord({ record, onSubmit, attempts, show }: UnluckyRecordProps) {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!show || attempts < 55) return null;

  const canBreakRecord = !record || attempts > record.attempts;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSubmitting || submitted || !canBreakRecord) return;

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
        <h2 className="text-xl font-bold text-white">ハマり王 - 歴代記録</h2>
      </div>

      <div className="space-y-4">
        {record && (
          <div className="p-3 rounded bg-gray-700 flex justify-between items-center">
            <span className="text-white">{record.name}</span>
            <span className="text-yellow-400 font-bold">{record.attempts}回</span>
          </div>
        )}

        {canBreakRecord && !submitted && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-yellow-400 text-sm">
              {attempts}回で新記録です！名前を登録しましょう！
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
          <div className="text-green-400 text-sm">
            新記録として登録されました！
          </div>
        )}
      </div>
    </div>
  );
}