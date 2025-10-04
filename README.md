# 🌙 Dear Diary — A Personal AI-Powered Diary Web App

**Dear Diary** is a modern, full-stack web application that lets you maintain a personal diary with both text and audio entries.
It features a clean, responsive frontend built with **React** and a powerful backend powered by **Python (FastAPI)** and **Google Gemini AI**.

---

## ✨ Features

* 🧠 **AI-Powered Diary Generation:** Automatically create diary entries from short prompts using Google’s Gemini model.
* 🔊 **Text-to-Speech (TTS):** Convert diary entries into natural-sounding audio using Gemini’s TTS model.
* 📝 **Beautiful Journal View:** Browse and relive your memories in both text and audio form.
* 🌗 **Modern UI:** Elegant, minimalist design with smooth transitions and dark mode.
* 📱 **Fully Responsive:** Works seamlessly across desktop, tablet, and mobile.
* ⚡ **Fast and Lightweight:** Built with Vite + React frontend and FastAPI backend for optimal performance.

---

## 🧩 Tech Stack

### **Frontend**

* ⚛️ React 18 (with TypeScript)
* 💨 Tailwind CSS for styling
* 🚀 Vite for blazing-fast dev experience
* 🔗 Axios for API communication
* 🧭 Lucide React for icons

### **Backend**

* 🐍 Python 3
* ⚡ FastAPI web framework
* 🎙️ google-generativeai (Gemini API) for diary + audio generation
* 🗣️ pyttsx3 (optional fallback for offline text-to-speech)
* 💾 File storage for text (`Dear_Diary/`) and audio (`Audio_Diary/`) entries

---

## ⚙️ Getting Started

### **Prerequisites**

Make sure you have the following installed:

* Node.js (v18+) and npm
* Python 3.10+ and pip
* A valid **Google Gemini API key**

---

## 🧠 Setting up Gemini API

This project uses **Google’s Gemini models** for both text and text-to-speech generation.

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey) and create a new API key.
2. In the backend folder, create a file named `.env` and add your key like this:

   ```bash
   GOOGLE_API_KEY=your_api_key_here
   ```

   *(You can also use `GEMINI_API_KEY`, but if both are present, the app prioritizes `GOOGLE_API_KEY`.)*

---

## 🏗️ Installation

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/dear-diary.git
cd dear-diary
```

### **2. Set up the backend**

```bash
cd backend
pip install -r requirements.txt
```

### **3. Set up the frontend**

```bash
cd ../frontend
npm install
```

---

## 🚀 Running the Application

### **Start the backend server**

```bash
cd backend
uvicorn main:app --reload
```

Backend runs on **[http://localhost:8000](http://localhost:8000)**

### **Start the frontend**

```bash
cd ../frontend
npm run dev
```

Frontend runs on **[http://localhost:5173](http://localhost:5173)**

---

## 🗂️ Project Structure

```
.
├── backend/
│   ├── main.py           # FastAPI app & endpoints
│   ├── write.py          # Gemini diary generator
│   ├── audiomaker.py     # TTS using Gemini
│   ├── Dear_Diary/       # Folder for text diary files
│   ├── Audio_Diary/      # Folder for audio (.wav) files
│   └── .env              # API keys & environment variables
│
└── frontend/
    ├── src/
    │   ├── components/   # React UI components
    │   ├── services/     # Axios API handlers
    │   ├── App.tsx       # Main app component
    │   └── main.tsx      # Entry point
    ├── vite.config.ts
    └── tailwind.config.js
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description                                      |
| ------ | ----------------- | ------------------------------------------------ |
| `POST` | `/generate_diary` | Generates a new diary entry (uses Gemini model). |
| `GET`  | `/entries`        | Returns all diary entries with metadata.         |
| `GET`  | `/{date}`         | Fetches a specific diary entry by date.          |

---

## 🧰 Environment Variables

| Variable         | Description                                            |
| ---------------- | ------------------------------------------------------ |
| `GOOGLE_API_KEY` | (Required) Gemini API key for AI text + TTS generation |
| `GEMINI_API_KEY` | Optional fallback API key (lower priority)             |

---

## 🤝 Contributing

Contributions, feedback, and suggestions are welcome!
Feel free to open an issue or submit a pull request 💬

---

## 📜 License

Licensed under the **MIT License**.
Free for personal and educational use.

---

Would you like me to add a **“Demo Usage Example” section** (like showing sample request & response JSON for `/generate_diary` and `/entries`)?
It would make your README look even more professional — especially for GitHub visitors.
