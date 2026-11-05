from pathlib import Path

import joblib
import pandas as pd

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# ==========================================
# 1. LOAD MACHINE LEARNING MODEL
# ==========================================

MODEL_PATH = (
    Path(__file__).resolve().parent.parent
    / "models"
    / "final_placement_model.pkl"
)

model = joblib.load(MODEL_PATH)


# ==========================================
# 2. CREATE FASTAPI APPLICATION
# ==========================================

app = FastAPI(
    title="LPU Placement Intelligence API",
    description="Student Placement Prediction and Readiness Platform",
    version="1.0.0"
)


# ==========================================
# 3. CONFIGURE FRONTEND CONNECTION
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


# ==========================================
# 4. STUDENT INPUT MODEL
# ==========================================

class StudentProfile(BaseModel):
    branch: str
    cgpa: float = Field(ge=0, le=10)
    backlogs: int = Field(ge=0)
    coding_skills: float = Field(ge=0, le=100)
    dsa_score: float = Field(ge=0, le=100)
    aptitude_score: float = Field(ge=0, le=100)
    communication_skills: float = Field(ge=0, le=100)
    ml_knowledge: float = Field(ge=0, le=100)
    internships: int = Field(ge=0)
    projects_count: int = Field(ge=0)
    certifications: int = Field(ge=0)
    hackathons: int = Field(ge=0)
    open_source_contributions: int = Field(ge=0)
    extracurriculars: int = Field(ge=0)


# ==========================================
# 5. HOME ENDPOINT
# ==========================================
def calculate_readiness_score(student):

    academic = (student.cgpa / 10) * 100

    technical = (
        student.coding_skills + student.dsa_score
    ) / 2

    career = min(
        (student.internships * 15) +
        (student.projects_count * 10),
        100
    )

    readiness = (
        academic * 0.25 +
        technical * 0.30 +
        student.aptitude_score * 0.15 +
        student.communication_skills * 0.15 +
        career * 0.15
    )

    return round(readiness, 2)

@app.get("/")
def home():
    return {
        "message": "LPU Placement Intelligence API is running!"
    }


# ==========================================
# 6. HEALTH CHECK ENDPOINT
# ==========================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }


# ==========================================
# 7. PLACEMENT PREDICTION ENDPOINT
# ==========================================

@app.post("/predict")
def predict_placement(student: StudentProfile):

    student_data = student.model_dump()

    # Convert skill scores from 0-100 to 0-10
    student_data["coding_skills"] /= 10
    student_data["dsa_score"] /= 10
    student_data["communication_skills"] /= 10
    student_data["ml_knowledge"] /= 10

    # Features used during model training
    features = [
        "branch",
        "cgpa",
        "backlogs",
        "coding_skills",
        "dsa_score",
        "aptitude_score",
        "communication_skills",
        "ml_knowledge",
        "internships",
        "projects_count",
        "certifications",
        "hackathons",
        "open_source_contributions",
        "extracurriculars"
    ]

    # Convert student data into DataFrame
    student_df = pd.DataFrame(
        [student_data],
        columns=features
    )

    # Generate prediction
    probability = model.predict_proba(student_df)[0][1]

    predicted_status = (
        "Placed" if probability >= 0.50
        else "Not Placed"
    )

    return {
        "predicted_status": predicted_status,
        "experimental_model_score": round(
            float(probability * 100), 2
        ),
        "message": "Prediction generated successfully."
    }
