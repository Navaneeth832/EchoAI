from google import genai
import sounddevice as sd
import soundfile as sf

client = genai.Client()

def generate_journal_entry(myfile):
    prompt = 'Based on the following audio file, generate a personal journel entry.Dont include any extra text and date just pure journel entry.'

    response = client.models.generate_content(
    model='gemini-2.5-flash',
    contents=[prompt, myfile]
    )

    print(response.text)
    return response.text
if __name__ == "__main__":
    samplerate = 44100  # Hertz
    duration = 8  # seconds
    filename = 'recorded_audio.wav'

    print("Recording audio...")
    myrecording = sd.rec(int(samplerate * duration), samplerate=samplerate, channels=2)
    sd.wait()  # Wait until recording is finished
    print("Recording finished.")

    sf.write(filename, myrecording, samplerate)  # Save as WAV file

    myfile = client.files.upload(file=filename)

    generate_journal_entry(myfile)