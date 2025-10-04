from google import genai
import csv
import os
from datetime import datetime

client = genai.Client()


def get_user_input():
    q1 = input("1. How was your day? ")
    q2 = input("2. Anything special today? ")
    q3 = input("3. Did you do any upskilling work today? ")
    return q1, q2, q3

def generate_journal_entry(q1, q2, q3):
    prompt = f"""
        Generate a short and personal diary entry based on these answers:
        - How was your day? {q1}
        - Anything special? {q2}
        - Upskilling work? {q3}
        Write it like a reflective journal entry.Dont add any extra text and date only the pure journel.
        """
    try:
        model_name ="gemini-2.5-flash"
        response = client.models.generate_content(model=model_name,contents=prompt)
        print(response.text.strip())
        return response.text.strip()
    except Exception as e:
        print(f"\n⚠️ Error generating journal entry: {e}")
        return "Journal entry could not be generated due to an error."

def write_to_txt(date, desc):
    folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Dear_Diary")
    os.makedirs(folder, exist_ok=True)  
    filepath = os.path.join(folder, f"{date}_diary.txt")
    with open(filepath, "w", encoding="utf-8") as file:
        file.write(f"Date: {date}\n\n{desc}\n")
    print(f"Journal entry saved to {date}_diary.txt")

def main():
    q1, q2, q3 = get_user_input()
    journal = generate_journal_entry(q1, q2, q3)
    today = datetime.now().strftime("%d-%m-%Y")
    print("\n✅ Journal entry saved successfully!\n")
    write_to_txt(today, journal)
    print("Here's what was written:\n")
    print(journal)

if __name__ == "__main__":
    main()
