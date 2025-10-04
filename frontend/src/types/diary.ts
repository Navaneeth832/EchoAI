export interface DiaryEntry {
  filename: string;
  snippet: string;
  audio_file: string;
}

export interface DiaryEntryDetail {
  date: string;
  content: string;
  audio: string;
}

export interface GenerateDiaryRequest {
  q1: string;
  q2: string;
  q3: string;
}

export interface GenerateDiaryResponse {
  message: string;
}
