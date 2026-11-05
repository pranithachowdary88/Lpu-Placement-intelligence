# 🎓 PACIFY AI – LPU Placement Intelligence Platform

An AI-powered student placement intelligence platform designed to help students evaluate their placement readiness, identify skill gaps, and improve their employability through data-driven insights.

## 🚀 Project Overview

PACIFY AI is a machine learning-based placement readiness and prediction platform developed to support students in understanding their current placement preparation level.

The platform analyzes academic performance, technical skills, aptitude, communication abilities, internships, and project experience to generate placement predictions and personalized improvement recommendations.

## 🎯 Problem Statement

Many students lack a clear understanding of their placement readiness and the specific skills they need to improve before participating in campus recruitment.

PACIFY AI aims to address this problem by providing a centralized platform for placement prediction, readiness assessment, skill-gap identification, and personalized recommendations.

## ✨ Key Features

- **Placement Prediction:** Predicts placement outcomes using a trained machine learning model.
- **Readiness Score:** Generates a score from 0–100 to evaluate student preparation.
- **Skill-Gap Analysis:** Identifies areas where students need improvement.
- **Personalized Recommendations:** Provides suggestions based on individual performance.
- **Student Assessment:** Evaluates academic, technical, aptitude, and communication skills.
- **Interactive Dashboard:** Presents student insights through a user-friendly interface.

## 🛠️ Technology Stack

### Frontend
- React.js
- TypeScript
- HTML5
- CSS3
- Recharts
- Framer Motion
- Lucide React

### Backend
- Python
- FastAPI
- Pydantic

### Machine Learning
- Scikit-learn
- NumPy
- Pandas
- Joblib

### Development Tools
- Visual Studio Code
- Git
- GitHub
- Jupyter Notebook

## 🧠 Machine Learning Approach

The project explores multiple classification algorithms for student placement prediction.

Models evaluated include:

- Logistic Regression
- Decision Tree
- Random Forest
- Gradient Boosting
- Support Vector Machine (SVM)

A balanced Logistic Regression model is used as the current final prediction model.

Model performance is evaluated using classification metrics such as:

- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC
- Confusion Matrix

The model is an experimental prototype and requires further validation before real-world deployment.

## 📊 Dataset Description

The project uses a processed dataset containing 3,000 student records.

The dataset includes features such as:

- Branch
- CGPA
- Backlogs
- Coding Skills
- DSA Score
- Aptitude Score
- Communication Skills
- Machine Learning Knowledge
- Internships
- Projects
- Certifications
- Hackathons
- Open-Source Contributions
- Extracurricular Activities

**Note:** The dataset is synthetic and is not an official LPU placement dataset. Predictions should not be interpreted as actual placement probabilities or guarantees.

## 🏗️ Project Structure

```text
Lpu-Placement-Intelligence/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── data/
│   ├── raw/
│   └── processed/
│
├── models/
│   ├── final_placement_model.pkl
│   └── model information files
│
├── notebooks/
│   └── 01_eda.ipynb
│
├── reports/
│
├── docs/
│
├── .gitignore
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pranithachowdary88/Lpu-Placement-intelligence.git
```

```bash
cd Lpu-Placement-intelligence
```

### 2. Set Up the Backend

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r backend/requirements.txt
```

Start the FastAPI server:

```bash
cd backend
uvicorn main:app --reload
```

Backend API:

```text
http://127.0.0.1:8000
```

API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Set Up the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local frontend URL displayed in your terminal.

## 🔮 Future Scope

- Improve machine learning model performance.
- Integrate explainable AI techniques.
- Expand skill-gap analysis.
- Introduce personalized learning roadmaps.
- Integrate real and anonymized placement datasets.
- Add student progress tracking.
- Deploy the platform for online access.

## ⚠️ Disclaimer

PACIFY AI is an academic project developed for educational and experimental purposes.

The dataset is synthetic, and the machine learning predictions are not validated real-world placement probabilities. The platform does not guarantee student placement outcomes.

## 👩‍💻 Developer

**Pranitha Chowdary**

B.Tech – Computer Science and Engineering  
Specialization: Artificial Intelligence and Machine Learning  
Lovely Professional University

GitHub: [pranithachowdary88](https://github.com/pranithachowdary88)

---

⭐ If you find this project interesting, consider giving the repository a star!
