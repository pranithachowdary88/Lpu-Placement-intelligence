import json
import joblib
import pandas as pd
import shap
import streamlit as st

st.set_page_config(page_title="Placement Readiness", layout="centered")

@st.cache_resource
def load():
    pipe = joblib.load("models/readiness_pipeline.joblib")
    bench = pd.read_json("models/benchmark.json", typ="series")
    return pipe, bench

pipe, bench = load()
expected = list(pipe.feature_names_in_)

st.title("Placement Readiness Assessment")

with st.form("student"):
    c1, c2 = st.columns(2)
    ssc_p = c1.slider("10th %", 30.0, 100.0, 65.0)
    hsc_p = c2.slider("12th %", 30.0, 100.0, 65.0)
    degree_p = c1.slider("Degree %", 30.0, 100.0, 65.0)
    mba_p = c2.slider("MBA / PG %", 30.0, 100.0, 62.0)
    etest_p = c1.slider("Aptitude test %", 30.0, 100.0, 60.0)
    coding_score = c2.slider("Coding score", 0, 100, 55)
    communication_score = c1.slider("Communication score", 0, 100, 60)
    projects = c2.number_input("Projects", 0, 10, 2)
    internships = c1.number_input("Internships", 0, 5, 1)
    certifications = c2.number_input("Certifications", 0, 10, 2)
    workex = c1.selectbox("Work experience", ["No", "Yes"])
    degree_t = c2.selectbox("Degree type", ["Comm&Mgmt", "Sci&Tech", "Others"])
    specialisation = c1.selectbox("Specialisation", ["Mkt&Fin", "Mkt&HR"])
    hsc_s = c2.selectbox("12th stream", ["Commerce", "Science", "Arts"])
    ssc_b = c1.selectbox("10th board", ["Central", "Others"])
    hsc_b = c2.selectbox("12th board", ["Central", "Others"])
    
    go = st.form_submit_button("Assess readiness")

if go:
    row = dict(ssc_p=ssc_p, hsc_p=hsc_p, degree_p=degree_p, mba_p=mba_p,
               etest_p=etest_p, coding_score=coding_score,
               communication_score=communication_score, projects=projects,
               internships=internships, certifications=certifications,
               workex=workex, degree_t=degree_t, specialisation=specialisation,
               hsc_s=hsc_s, ssc_b=ssc_b, hsc_b=hsc_b, )
    X = pd.DataFrame([row])[expected]   # keeps only columns the model uses

    score = pipe.predict_proba(X)[0, 1] * 100
    level = "Low" if score <= 40 else "Medium" if score <= 70 else "High"
    st.metric("Readiness score", f"{score:.1f} / 100", level)
    st.progress(int(score))

    # skill gap vs High-readiness benchmark
    st.subheader("Skill gaps")
    gap = (X.iloc[0][bench.index].astype(float) - bench).round(1).sort_values()
    st.bar_chart(gap)
    for k, v in gap.head(3).items():
        if v < 0:
            st.write(f"• **{k}** is {abs(v)} below the high-readiness benchmark")

    # SHAP reasons
    st.subheader("Why this score")
    xgb = pipe.named_steps["model"].named_estimators_["xgb"]
    prep = pipe.named_steps["prep"]
    Xt = prep.transform(X)
    Xt = Xt.toarray() if hasattr(Xt, "toarray") else Xt
    sv = shap.TreeExplainer(xgb).shap_values(
        pd.DataFrame(Xt, columns=prep.get_feature_names_out()))[0]
    s = pd.Series(sv, index=prep.get_feature_names_out()).sort_values()
    s.index = [i.split("__")[1] for i in s.index]
    st.write("**Pulling readiness down:**", ", ".join(s.head(3).index))
    st.write("**Pushing readiness up:**", ", ".join(s.tail(3).index[::-1]))