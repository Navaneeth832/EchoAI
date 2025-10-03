import { X, Headphones } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { diaryApi } from '../services/api';

interface AudioPlayerModalProps {
  audioFile: string;
  onClose: () => void;
}

export const AudioPlayerModal = ({ audioFile, onClose }: AudioPlayerModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
        <div className="border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Headphones className="text-blue-600" size={24} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Play Audio</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <AudioPlayer audioUrl={diaryApi.getAudioUrl(audioFile)} />
        </div>
      </div>
    </div>
  );
};
