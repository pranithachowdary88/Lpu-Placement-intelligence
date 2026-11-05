import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { predictPlacement } from "./api";

import {
  GraduationCap,
  Code2,
  BriefcaseBusiness,
  Sparkles,
  BrainCircuit,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type StudentForm = {
  branch: string;
  cgpa: number;
  backlogs: number;
  coding_skills: number;
  dsa_score: number;
  aptitude_score: number;
  communication_skills: number;
  ml_knowledge: number;
  internships: number;
  projects_count: number;
  certifications: number;
  hackathons: number;
  open_source_contributions: number;
  extracurriculars: number;
};

type PredictionResult = {
  predicted_status: string;
  experimental_model_score: number;
  message: string;
};

function Assessment() {
  const [form, setForm] = useState<StudentForm>({
    branch: "CSE",
    cgpa: 7,
    backlogs: 0,
    coding_skills: 70,
    dsa_score: 70,
    aptitude_score: 70,
    communication_skills: 70,
    ml_knowledge: 70,
    internships: 0,
    projects_count: 2,
    certifications: 1,
    hackathons: 0,
    open_source_contributions: 0,
    extracurriculars: 1,
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form changes
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: name === "branch" ? value : Number(value),
    }));

    setResult(null);
  }

  // Calculate readiness score
  const academicScore = (form.cgpa / 10) * 100;

  const technicalScore =
    (form.coding_skills + form.dsa_score) / 2;

  const careerScore = Math.min(
    form.internships * 15 + form.projects_count * 10,
    100
  );

  const readinessScore = Number(
    (
      academicScore * 0.25 +
      technicalScore * 0.30 +
      form.aptitude_score * 0.15 +
      form.communication_skills * 0.15 +
      careerScore * 0.15
    ).toFixed(2)
  );

  // Identify skills below 70%
  const skillGaps = [
    {
      name: "Coding Skills",
      score: form.coding_skills,
    },
    {
      name: "DSA",
      score: form.dsa_score,
    },
    {
      name: "Aptitude",
      score: form.aptitude_score,
    },
    {
      name: "Communication",
      score: form.communication_skills,
    },
    {
      name: "Machine Learning",
      score: form.ml_knowledge,
    },
  ].filter((skill) => skill.score < 70);

  // Generate personalized recommendations
  const recommendations: string[] = [];

  if (form.cgpa < 7) {
    recommendations.push(
      "Improve your academic performance and aim for a CGPA of 7 or above."
    );
  }

  if (form.coding_skills < 70) {
    recommendations.push(
      "Practice programming regularly and solve coding problems."
    );
  }

  if (form.dsa_score < 70) {
    recommendations.push(
      "Strengthen Data Structures and Algorithms through daily practice."
    );
  }

  if (form.aptitude_score < 70) {
    recommendations.push(
      "Practice quantitative aptitude, logical reasoning and verbal ability."
    );
  }

  if (form.communication_skills < 70) {
    recommendations.push(
      "Improve communication through presentations, group discussions and mock interviews."
    );
  }

  if (form.ml_knowledge < 70) {
    recommendations.push(
      "Strengthen your Machine Learning knowledge and work on practical ML exercises."
    );
  }

  if (form.internships === 0) {
    recommendations.push(
      "Apply for internships to gain practical industry experience."
    );
  }

  if (form.projects_count < 3) {
    recommendations.push(
      "Build at least three meaningful projects and upload them to GitHub."
    );
  }

  if (form.certifications < 2) {
    recommendations.push(
      "Complete relevant technical certifications."
    );
  }

  if (form.backlogs > 0) {
    recommendations.push(
      "Focus on clearing your active backlogs."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Great progress! Continue improving your skills and prepare for placement interviews."
    );
  }

  // Submit assessment
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await predictPlacement(form);
      setResult(response);
    } catch (err) {
      console.error(err);

      setError(
        "Unable to connect to the prediction server. Please check whether the backend is running."
      );
    } finally {
      setLoading(false);
    }
  }

  // Skill fields
  const skillFields: {
    name: keyof StudentForm;
    label: string;
  }[] = [
    {
      name: "coding_skills",
      label: "Coding Skills (0–100)",
    },
    {
      name: "dsa_score",
      label: "DSA Score (0–100)",
    },
    {
      name: "aptitude_score",
      label: "Aptitude Score (0–100)",
    },
    {
      name: "communication_skills",
      label: "Communication Skills (0–100)",
    },
    {
      name: "ml_knowledge",
      label: "ML Knowledge (0–100)",
    },
  ];

  // Experience fields
  const experienceFields: {
    name: keyof StudentForm;
    label: string;
  }[] = [
    {
      name: "internships",
      label: "Internships",
    },
    {
      name: "projects_count",
      label: "Projects Count",
    },
    {
      name: "certifications",
      label: "Certifications",
    },
    {
      name: "hackathons",
      label: "Hackathons",
    },
    {
      name: "open_source_contributions",
      label: "Open Source Contributions",
    },
    {
      name: "extracurriculars",
      label: "Extracurricular Activities",
    },
  ];

  // Reusable number input
  function renderNumberField(
    name: keyof StudentForm,
    label: string,
    max?: number
  ) {
    return (
      <div className="assessment-field" key={name}>
        <label htmlFor={name}>{label}</label>

        <input
          id={name}
          name={name}
          type="number"
          min={0}
          max={max}
          step={name === "cgpa" ? 0.01 : 1}
          value={form[name]}
          onChange={handleChange}
          required
        />
      </div>
    );
  }

  return (
    <main className="assessment-page">

      {/* PAGE HEADING */}
      <div className="assessment-heading">
        <div>
          <span className="assessment-eyebrow">
            <Sparkles size={15} />
            AI-POWERED ANALYSIS
          </span>

          <h1>Student Assessment</h1>

          <p>
            Evaluate your academic performance, technical skills and
            placement readiness.
          </p>
        </div>

        <div className="assessment-heading-icon">
          <BrainCircuit size={30} />
        </div>
      </div>

      {/* ASSESSMENT FORM */}
      <form onSubmit={handleSubmit} className="assessment-form">

        {/* ACADEMIC INFORMATION */}
        <section className="assessment-section">
          <h2>
            <GraduationCap size={19} />
            Academic Information
          </h2>

          <div className="assessment-grid">

            <div className="assessment-field">
              <label htmlFor="branch">Branch</label>

              <select
                id="branch"
                name="branch"
                value={form.branch}
                onChange={handleChange}
              >
                {["CSE", "IT", "ECE", "EE", "ME", "Chemical"].map(
                  (branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  )
                )}
              </select>
            </div>

            {renderNumberField(
              "cgpa",
              "Current CGPA (0–10)",
              10
            )}

            {renderNumberField(
              "backlogs",
              "Active Backlogs"
            )}

          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="assessment-section">
          <h2>
            <Code2 size={19} />
            Technical &amp; Professional Skills
          </h2>

          <div className="assessment-grid">
            {skillFields.map((field) =>
              renderNumberField(
                field.name,
                field.label,
                100
              )
            )}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="assessment-section">
          <h2>
            <BriefcaseBusiness size={19} />
            Experience &amp; Achievements
          </h2>

          <div className="assessment-grid">
            {experienceFields.map((field) =>
              renderNumberField(
                field.name,
                field.label
              )
            )}
          </div>
        </section>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="assessment-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                size={18}
                className="assessment-spinner"
              />
              Analysing Your Profile...
            </>
          ) : (
            <>
              Predict Placement
              <Sparkles size={18} />
            </>
          )}
        </button>

      </form>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="assessment-error">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      {/* PREDICTION RESULTS */}
      {result && (
        <section className="assessment-result">

          <span className="assessment-eyebrow">
            <CheckCircle2 size={15} />
            ANALYSIS COMPLETE
          </span>

          <h2>Prediction Results</h2>

          {/* SCORE CARDS */}
          <div className="analysis-score-grid">

            <div className="analysis-score-card">
              <span>Readiness Score</span>
              <strong>{readinessScore}%</strong>
            </div>

            <div className="analysis-score-card">
              <span>Experimental ML Score</span>
              <strong>
                {result.experimental_model_score}%
              </strong>
            </div>

          </div>

          {/* PLACEMENT STATUS */}
          <div className="prediction-status-card">
            <span>Predicted Placement Status</span>

            <div className="assessment-result-status">
              {result.predicted_status}
            </div>
          </div>

          {/* SKILL GAP ANALYSIS */}
          <div className="skill-gap-section">
            <h3>Skill Gap Analysis</h3>

            {skillGaps.length > 0 ? (
              skillGaps.map((skill) => (
                <div
                  className="skill-gap-item"
                  key={skill.name}
                >
                  <div>
                    <span>{skill.name}</span>
                    <strong>{skill.score}%</strong>
                  </div>

                  <div className="skill-gap-track">
                    <div
                      className="skill-gap-fill"
                      style={{
                        width: `${skill.score}%`,
                      }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <p>
                Great work! All assessed skills are at least 70%.
              </p>
            )}
          </div>

          {/* PERSONALIZED IMPROVEMENT PLAN */}
          <div className="personalized-recommendations">
            <h3>Personalized Improvement Plan</h3>

            {recommendations.map((item, index) => (
              <div
                className="recommendation-item"
                key={index}
              >
                <CheckCircle2 size={17} />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* DISCLAIMER */}
          <p className="assessment-disclaimer">
            The readiness score is a rule-based indicator.
            The experimental ML score comes from a synthetic
            dataset and is not a validated real-world placement
            probability.
          </p>

        </section>
      )}

    </main>
  );
}

export default Assessment;