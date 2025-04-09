import spacy

nlp = spacy.load("en_core_web_sm")

# Примеры "извлечения" по ключевым словам
KNOWN_SKILLS = {"python", "django", "sql", "javascript", "react", "aws", "docker"}

def analyze_resume(text):
    doc = nlp(text.lower())

    skills = list({token.text for token in doc if token.text in KNOWN_SKILLS})
    experience = extract_experience_years(text)
    education = extract_education(text)

    score = len(skills) * 10 + experience * 5

    return {
        "skills": skills,
        "experience_years": experience,
        "education": education,
        "score": score,
        "recommendations": generate_recommendations(skills, experience),
    }

def extract_experience_years(text):
    import re
    matches = re.findall(r'(\d+)\+?\s+years', text.lower())
    if matches:
        return max(map(int, matches))
    return 0

def extract_education(text):
    if "bachelor" in text.lower():
        return "Bachelor's Degree"
    if "master" in text.lower():
        return "Master's Degree"
    if "phd" in text.lower():
        return "PhD"
    return "Unknown"

def generate_recommendations(skills, experience):
    recs = []
    if experience < 2:
        recs.append("Gain more hands-on experience.")
    if "sql" not in skills:
        recs.append("Learn SQL to work with databases.")
    if "aws" not in skills:
        recs.append("Consider learning cloud platforms like AWS.")
    return recs
