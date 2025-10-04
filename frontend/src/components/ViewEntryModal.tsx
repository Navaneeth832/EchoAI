import { useState, useEffect } from 'react';
import { X, Download, Loader2, Calendar } from 'lucide-react';
import { diaryApi } from '../services/api';
import { AudioPlayer } from './AudioPlayer';
import type { DiaryEntryDetail } from '../types/diary';

interface ViewEntryModalProps {
  filename: string;
  onClose: () => void;
}

export const ViewEntryModal = ({ filename, onClose }: ViewEntryModalProps) => {
  const [entry, setEntry] = useState<DiaryEntryDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntry = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await diaryApi.getEntryByDate(filename);
        console.log('Fetched entry:', data);
        console.log('Filename:', filename);
        setEntry(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load diary entry');
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntry();
  }, [filename]);

  const handleDownload = () => {
    if (!entry) return;
    const textFileUrl = diaryApi.getTextFileUrl(filename);
    window.open(textFileUrl, '_blank');
  };

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Calendar className="text-red-600" size={24} />
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Diary Entry</h2>
              {entry && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {entry.date}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-red-600" size={48} />
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {entry && (
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Entry Text
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {entry.content}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Audio Recording
                </h3>
                <AudioPlayer audioUrl={diaryApi.getAudioUrl(entry.audio)} />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  <Download size={20} />
                  Download Text File
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
