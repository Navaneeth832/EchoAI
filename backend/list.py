import pyttsx3
date=input("Enter a date in the format DD-MM-YYYY: ")
filename=f"{date}_diary.txt"
file_location=f"Dear_Diary/{filename}"
print(f"File location: {file_location}")
try:
    with open(file_location, 'r') as file:
        entries = file.readlines()
        engine = pyttsx3.init()
        print("Date :",date)
        for entry in entries:
            engine.say(entries)
            engine.runAndWait()
            print(entry.strip())
except:
    print("Diary not available")