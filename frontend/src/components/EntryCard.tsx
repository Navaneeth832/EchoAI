import { Calendar, Play, Eye } from 'lucide-react';
import type { DiaryEntry } from '../types/diary';

interface EntryCardProps {
  entry: DiaryEntry;
  onPlayAudio: (audioUrl: string) => void;
  onViewEntry: (filename: string) => void;
}

export const EntryCard = ({ entry, onPlayAudio, onViewEntry }: EntryCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar size={18} />
          <span className="text-sm font-medium">{entry.filename}</span>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3 leading-relaxed">
          {entry.snippet}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => onPlayAudio(entry.audio_file)}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg transition-colors font-medium"
        >
          <Play size={18} />
          Play Audio
        </button>
        <button
          onClick={() => onViewEntry(entry.filename)}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2.5 rounded-lg transition-colors font-medium"
        >
          <Eye size={18} />
          View Entry
        </button>
      </div>
    </div>
  );
};
