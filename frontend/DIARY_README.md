# Dear Diary - Personal Diary Web App Frontend

A modern, responsive React frontend for a personal diary web application that connects to a FastAPI backend.

## Features

- **Beautiful, Modern Design**: Clean interface with smooth transitions and animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes with persistent preference
- **Audio Playback**: Custom audio player with controls for diary entries
- **Create Entries**: Form-based diary entry creation with loading states
- **View Entries**: Full-screen modal for reading complete diary entries
- **Error Handling**: Graceful error handling with user-friendly messages
- **Type-Safe**: Built with TypeScript for robust code

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Lucide React** for icons

## Project Structure

```
src/
├── components/
│   ├── AudioPlayer.tsx          # Custom audio player with controls
│   ├── AudioPlayerModal.tsx     # Modal for quick audio playback
│   ├── CreateEntryForm.tsx      # Form for creating new diary entries
│   ├── EntryCard.tsx            # Card component for diary entry list
│   └── ViewEntryModal.tsx       # Modal for viewing full diary entries
├── hooks/
│   └── useDarkMode.ts           # Custom hook for dark mode management
├── services/
│   └── api.ts                   # API service layer with all backend calls
├── types/
│   └── diary.ts                 # TypeScript interfaces for diary data
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
└── index.css                    # Global styles and Tailwind configuration
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file in the project root (or update the existing one):

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Note**: Update the URL if your FastAPI backend runs on a different host/port.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is busy).

### 4. Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Backend Requirements

This frontend expects a FastAPI backend with the following endpoints:

### 1. GET /entries
Returns a list of all diary entries.

**Response:**
```json
[
  {
    "date": "2024-01-15",
    "snippet": "Today was amazing...",
    "audio_file": "2024-01-15.wav"
  }
]
```

### 2. GET /{date}
Returns a single diary entry by date.

**Response:**
```json
{
  "date": "2024-01-15",
  "text": "Full diary entry text...",
  "audio_file": "2024-01-15.wav"
}
```

### 3. POST /generate_diary
Generates a new diary entry based on three questions.

**Query Parameters:**
- `q1`: How was your day?
- `q2`: Anything special today?
- `q3`: Did you do any upskilling work today?

**Response:**
```json
{
  "message": "Diary entry created successfully"
}
```

### 4. Static File Serving
The backend should serve:
- Audio files from `/Audio_Diary/` directory
- Text files from `/Dear_Diary/` directory

## Component Documentation

### AudioPlayer
Custom audio player with play/pause, seek bar, and time display.

**Props:**
- `audioUrl`: URL of the audio file
- `className`: Optional CSS classes

### EntryCard
Displays a diary entry in card format on the home page.

**Props:**
- `entry`: Diary entry object
- `onPlayAudio`: Callback when play button is clicked
- `onViewEntry`: Callback when view button is clicked

### CreateEntryForm
Modal form for creating new diary entries with three text areas.

**Props:**
- `onClose`: Callback to close the modal
- `onSuccess`: Callback when entry is successfully created

### ViewEntryModal
Full-screen modal for viewing a complete diary entry with audio.

**Props:**
- `date`: Date of the entry to display
- `onClose`: Callback to close the modal

## Customization

### Changing Colors
Update Tailwind classes in components. The app uses blue as the primary color:
- `bg-blue-600` for primary buttons
- `text-blue-600` for accents

### Modifying API Endpoints
Edit `src/services/api.ts` to change endpoint paths or add new API methods.

### Adding New Features
1. Create new components in `src/components/`
2. Add new types in `src/types/diary.ts`
3. Update API service in `src/services/api.ts`
4. Import and use in `App.tsx`

## Troubleshooting

### CORS Errors
Ensure your FastAPI backend has CORS configured:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Audio Not Playing
- Verify audio files are in `.wav` format
- Check that the backend serves files from `/Audio_Diary/`
- Ensure audio file URLs are correct in the API response

### Build Errors
Run type checking:
```bash
npm run typecheck
```

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is provided as-is for personal use.
