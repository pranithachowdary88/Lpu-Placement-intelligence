# 🎓 PLACIFY AI – LPU Placement Intelligence Platform

An AI-powered student placement intelligence platform designed to help students evaluate their placement readiness, identify skill gaps, and improve their employability through data-driven insights.

---

## 🚀 Project Overview

PLACIFY AI is a machine learning-based placement readiness and prediction platform developed to help students understand their current placement preparation level.

The platform analyzes academic performance, technical skills, aptitude, communication abilities, internships, and project experience to generate experimental placement predictions, readiness scores, and personalized improvement recommendations.

It provides students with insights into their strengths and weaknesses, helping them make informed decisions about their placement preparation.

## 🎯 Problem Statement

Many students lack a clear understanding of their placement readiness and the specific skills they need to improve before participating in campus recruitment.

Traditional preparation methods often do not provide personalized feedback or a structured assessment of individual strengths and weaknesses.

PLACIFY AI aims to address this problem through a centralized platform offering placement prediction, readiness assessment, skill-gap identification, and personalized recommendations.

## ✨ Key Features

### 1. Placement Prediction
- Predicts student placement outcomes using a trained machine learning model.
- Analyzes multiple academic and skill-related attributes.
- Provides an experimental model score.

### 2. Placement Readiness Score
- Generates a readiness score between 0 and 100.
- Evaluates different dimensions of student preparation.
- Helps students understand their overall readiness.

### 3. Skill-Gap Analysis
- Identifies areas where students need improvement.
- Evaluates technical, academic, aptitude, and communication skills.
- Highlights skills requiring additional attention.

### 4. Personalized Recommendations
- Generates improvement suggestions based on student performance.
- Identifies areas that need further preparation.
- Helps students plan their placement preparation.

### 5. Interactive Dashboard
- Displays student performance insights.
- Provides a centralized interface for placement preparation.
- Presents assessment results in an understandable format.

---

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
- Uvicorn

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

---

## 🧠 Machine Learning Approach

PLACIFY AI explores multiple classification algorithms for student placement prediction.

### Models Evaluated

- Logistic Regression
- Decision Tree
- Random Forest
- Gradient Boosting
- Support Vector Machine (SVM)

A balanced Logistic Regression model is currently used as the final prediction model.

### Model Evaluation Metrics

The models are evaluated using:

- Accuracy
- Precision
- Recall
- F1-score
- ROC-AUC
- Confusion Matrix
- Balanced Accuracy

The evaluation process helps assess model performance and understand its ability to distinguish between placed and not-placed students.

**Note:** The current model is an experimental prototype. Its performance has limitations and requires further validation and improvement before real-world use.

---

## 📊 Dataset Description

The project uses a processed dataset containing 3,000 student records.

The dataset includes the following features:

| Feature | Description |
|---|---|
| Branch | Student's academic branch |
| CGPA | Cumulative grade point average |
| Backlogs | Number of academic backlogs |
| Coding Skills | Coding proficiency score |
| DSA Score | Data Structures and Algorithms score |
| Aptitude Score | Aptitude assessment score |
| Communication Skills | Communication proficiency |
| ML Knowledge | Machine learning knowledge score |
| Internships | Number of internships |
| Projects Count | Number of completed projects |
| Certifications | Number of certifications |
| Hackathons | Hackathon participation |
| Open Source Contributions | Contributions to open-source projects |
| Extracurriculars | Extracurricular participation |

### Dataset Information

- Total records: 3,000
- Target variable: `placement_status`
- Dataset type: Synthetic
- Data processing: Python and Pandas

**Important:** The dataset is synthetic and is not an official Lovely Professional University placement dataset. The model's predictions should not be interpreted as actual placement probabilities or guarantees.

---

## 🏗️ Project Architecture

PLACIFY AI follows a frontend-backend-machine-learning architecture.

1. **Frontend:** Collects student information and displays assessment results.
2. **Backend:** Processes student information and handles prediction requests through FastAPI.
3. **Machine Learning Model:** Generates experimental placement predictions using the trained model.
4. **Readiness Assessment:** Calculates a separate readiness score based on defined assessment criteria.
5. **Results:** Displays prediction results, skill gaps, and improvement recommendations.

---

## 📁 Project Structure

```text
Lpu-Placement-Intelligence/
│
├── backend/
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── index.html
│
├── data/
│   ├── raw/
│   └── processed/
│       └── student_placement_3000.csv
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

---

## ⚙️ Installation and Setup

Follow these steps to run PLACIFY AI locally.

### 1. Clone the Repository

```bash
git clone https://github.com/pranithachowdary88/Lpu-Placement-intelligence.git
```

Navigate to the project directory:

```bash
cd Lpu-Placement-intelligence
```

### 2. Backend Setup

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```powershell
venv\Scripts\activate
```

Install backend dependencies:

```bash
pip install -r backend/requirements.txt
```

Start the FastAPI server:

```bash
cd backend
uvicorn main:app --reload
```

Backend URL:

```text
http://127.0.0.1:8000
```

FastAPI interactive documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Frontend Setup

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install the required packages:

```bash
npm install
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access the application.

---

## 📈 Project Objectives

- Develop an intelligent student placement prediction platform.
- Evaluate student placement readiness using multiple parameters.
- Identify individual skill gaps.
- Generate personalized preparation recommendations.
- Apply machine learning techniques to student placement data.
- Build an interactive and user-friendly dashboard.

---

## 🔮 Future Scope

The project can be enhanced through the following improvements:

- Improve machine learning model performance.
- Integrate explainable AI techniques such as SHAP.
- Expand personalized skill-gap analysis.
- Introduce learning roadmaps based on individual weaknesses.
- Integrate real and anonymized placement datasets.
- Add student progress tracking.
- Improve prediction reliability through additional validation.
- Deploy the platform for online access.

---

## ⚠️ Disclaimer

PLACIFY AI is an academic project developed for educational and experimental purposes.

The dataset used is synthetic and does not represent actual LPU placement records. Machine learning predictions are experimental estimates and have not been validated as real-world placement probabilities.

The platform does not guarantee placement outcomes and should be used only as a preparation and self-assessment tool.

---

## 👩‍💻 Developer

**Pranitha Chowdary**

B.Tech – Computer Science and Engineering  
Specialization: Artificial Intelligence and Machine Learning  
Lovely Professional University

GitHub: [pranithachowdary88](https://github.com/pranithachowdary88)

---

⭐ If you find this project interesting, consider giving the repository a star!
