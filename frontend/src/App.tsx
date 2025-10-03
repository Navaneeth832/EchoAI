import { useState, useEffect } from 'react';
import { BookOpen, PlusCircle, Moon, Sun, Loader2, AlertCircle } from 'lucide-react';
import { useDarkMode } from './hooks/useDarkMode';
import { diaryApi } from './services/api';
import { EntryCard } from './components/EntryCard';
import { CreateEntryForm } from './components/CreateEntryForm';
import { ViewEntryModal } from './components/ViewEntryModal';
import { AudioPlayerModal } from './components/AudioPlayerModal';
import type { DiaryEntry } from './types/diary';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedEntryDate, setSelectedEntryDate] = useState<string | null>(null);
  const [selectedAudioFile, setSelectedAudioFile] = useState<string | null>(null);

  const fetchEntries = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await diaryApi.getAllEntries();
      setEntries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load diary entries');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handlePlayAudio = (audioFile: string) => {
    setSelectedAudioFile(audioFile);
  };

  const handleViewEntry = (date: string) => {
    setSelectedEntryDate(date);
  };

  const handleCreateSuccess = () => {
    fetchEntries();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="text-blue-600" size={32} />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Dear Diary
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Your personal reflection space
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateForm(true)}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 md:px-6 py-2.5 md:py-3 rounded-lg transition-colors font-medium shadow-lg hover:shadow-xl"
              >
                <PlusCircle size={20} />
                <span className="hidden md:inline">New Entry</span>
              </button>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 md:p-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
            <p className="text-gray-600 dark:text-gray-400">Loading your diary entries...</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-red-800 dark:text-red-300 font-semibold mb-1">
                  Error Loading Entries
                </h3>
                <p className="text-red-700 dark:text-red-400">{error}</p>
                <button
                  onClick={fetchEntries}
                  className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && entries.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <BookOpen className="text-gray-400 dark:text-gray-600 mb-4" size={64} />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Entries Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md">
              Start your journaling journey by creating your first diary entry!
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
            >
              <PlusCircle size={20} />
              Create First Entry
            </button>
          </div>
        )}

        {!isLoading && !error && entries.length > 0 && (
          <div>
            <div className="mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Your Diary Entries
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {entries.map((entry) => (
                <EntryCard
                  key={entry.filename}
                  entry={entry}
                  onPlayAudio={handlePlayAudio}
                  onViewEntry={handleViewEntry}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showCreateForm && (
        <CreateEntryForm
          onClose={() => setShowCreateForm(false)}
          onSuccess={handleCreateSuccess}
        />
      )}

      {selectedEntryDate && (
        <ViewEntryModal
          filename={selectedEntryDate}
          onClose={() => setSelectedEntryDate(null)}
        />
      )}

      {selectedAudioFile && (
        <AudioPlayerModal
          audioFile={selectedAudioFile}
          onClose={() => setSelectedAudioFile(null)}
        />
      )}
    </div>
  );
}

export default App;
