import axios from 'axios';
import type { DiaryEntry, DiaryEntryDetail, GenerateDiaryRequest, GenerateDiaryResponse } from '../types/diary';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const diaryApi = {
  getAllEntries: async (): Promise<DiaryEntry[]> => {
    const response = await api.get<DiaryEntry[]>('/entries');
    return response.data;
  },

  getEntryByDate: async (date: string): Promise<DiaryEntryDetail> => {
    const response = await api.get<DiaryEntryDetail>(`/entry/${date}`);
    return response.data;
  },

  generateDiary: async (data: GenerateDiaryRequest): Promise<GenerateDiaryResponse> => {
    const response = await api.post<GenerateDiaryResponse>('/generate_diary', null, {
      params: data,
    });
    return response.data;
  },

  getAudioUrl: (audioFile: string): string => {
    return `${API_BASE_URL}/${audioFile}`;
  },

  getTextFileUrl: (date: string): string => {
    return `${API_BASE_URL}/Dear_Diary/${date}.txt`;
  },
};
