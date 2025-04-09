from pydantic import BaseModel
from typing import List

class ResumeAnalysis(BaseModel):
    skills: List[str]
    experience_years: int
    education: str
    score: float
