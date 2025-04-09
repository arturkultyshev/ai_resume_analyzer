def generate_resume_feedback(text):
    feedback = {
        "formatting": [],
        "keyword_optimization": [],
        "skill_gaps": [],
    }

    # 🔹 Форматирование
    if not text.strip().startswith("Name") and "email" not in text.lower():
        feedback["formatting"].append("Добавьте контактную информацию в начало резюме.")
    if len(text.split()) < 200:
        feedback["formatting"].append("Резюме слишком короткое. Раскройте опыт подробнее.")

    # 🔹 Ключевые слова (оптимизация под ATS)
    must_have_keywords = ["experience", "skills", "education", "projects", "achievements"]
    for kw in must_have_keywords:
        if kw not in text.lower():
            feedback["keyword_optimization"].append(f"Добавьте раздел или фразу с '{kw}'.")

    # 🔹 Навыки, которых не хватает
    popular_skills = {"python", "sql", "docker", "linux", "communication", "leadership"}
    found_skills = {word.lower() for word in text.split() if word.lower() in popular_skills}
    missing_skills = popular_skills - found_skills

    feedback["skill_gaps"] = list(missing_skills)

    return feedback
