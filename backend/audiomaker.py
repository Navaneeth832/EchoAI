from google import genai
from google.genai import types
import wave
import os
# Set up the wave file to save the output:
def wave_file(filename, pcm, channels=1, rate=24000, sample_width=2):
   with wave.open(filename, "wb") as wf:
      wf.setnchannels(channels)
      wf.setsampwidth(sample_width)
      wf.setframerate(rate)
      wf.writeframes(pcm)

client = genai.Client()

def generate_audio(file_location):
   try:
      date=file_location.split("/")[1].split("_")[0]
      if os.exists(f"Audio_Diary/{date}_audio.wav") == True:
         print("Audio diary already exists for this date.")
         os.system(f'start /min wmplayer "Audio_Diary/{date}_audio.wav"')
         exit()
      with open(file_location, 'r') as file:
         entries = file.readlines()
         print("Extracting content from diary file...")
      response = client.models.generate_content(
      model="gemini-2.5-flash-preview-tts",
      contents=f"Read the content of the file with required tone and format: {entries}",
      config=types.GenerateContentConfig(
         response_modalities=["AUDIO"],
         speech_config=types.SpeechConfig(
            voice_config=types.VoiceConfig(
               prebuilt_voice_config=types.PrebuiltVoiceConfig(
                  voice_name='Kore',
               )
               )
            ),
         )
      )
      data = response.candidates[0].content.parts[0].inline_data.data
      wave_file(f"Audio_Diary/{date}_audio.wav", data) 
      print("Audio diary created successfully!")
      print("Playing the audio diary...")
      os.system(f'start /min wmplayer "Audio_Diary/{date}_audio.wav"')

   except:
      print("Diary not available")


