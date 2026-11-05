
import { useState } from "react";
import {
  BrainCircuit, LayoutDashboard, UserRound, TrendingUp,
  ChartNoAxesColumn, Target, Layers, Building2, Settings,
  LogOut, Menu, X, Bell, Search, GraduationCap, Code2,
  FolderKanban, ArrowUpRight, CheckCircle2
} from "lucide-react";

import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, RadarChart, Radar,
  PolarGrid, PolarAngleAxis
} from "recharts";


import "./App.css";
import Assessment from "./assessment";
const trend = [
  { name: "Sem 1", value: 35 },
  { name: "Sem 2", value: 48 },
  { name: "Sem 3", value: 58 },
  { name: "Sem 4", value: 65 },
  { name: "Sem 5", value: 72 },
  { name: "Sem 6", value: 85 },
];

const skills = [
  { skill: "Coding", score: 75 },
  { skill: "DSA", score: 65 },
  { skill: "Aptitude", score: 80 },
  { skill: "Communication", score: 70 },
  { skill: "ML", score: 85 },
  { skill: "Projects", score: 60 },
];

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "My Profile", icon: UserRound },
  { name: "Placement Prediction", icon: TrendingUp },
  { name: "Skill Assessment", icon: ChartNoAxesColumn },
  { name: "Improvement Plan", icon: Target },
  { name: "Projects", icon: Layers },
  { name: "Company Insights", icon: Building2 },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  return (
    <div className="app-shell">

      {/* SIDEBAR OVERLAY */}
      {menuOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-icon">
            <BrainCircuit size={30} />
          </div>
          <div>
            <h2>PLACIFY AI</h2>
            <p>Placement Intelligence</p>
          </div>
          <button className="close-menu" onClick={() => setMenuOpen(false)}>
            <X size={21} />
          </button>
        </div>

        <p className="nav-label">MAIN MENU</p>

        <nav className="navigation">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                className={`nav-item ${active === item.name ? "active" : ""}`}
                onClick={() => {
                  setActive(item.name);
                  setMenuOpen(false);
                }}
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </button>
          <button className="nav-item">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="main-area">

        {/* TOP BAR */}
        <header className="topbar">
          <button
            className="menu-button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={27} />
          </button>

          <div className="topbar-right">
            <div className="search-box">
              <Search size={18} />
              <input placeholder="Search anything..." />
            </div>
            <button className="notification">
              <Bell size={21} />
              <span />
            </button>
            <div className="avatar">P</div>
          </div>
        </header>

      {/* PAGE CONTENT */}
<div className="dashboard-content">

 {(active === "Skill Assessment" || active === "Placement Prediction") && <Assessment />}

  {active === "Dashboard" && (
    <>
      {/* WELCOME */}
      <section className="welcome">
        <div>
          <h1>
            Welcome Back, <span>Student!</span> 👋
          </h1>
          <p>
            Track your skills, predict placement chances and prepare
            smarter with PLACIFY AI.
          </p>
        </div>

        <div className="welcome-decoration">
          <img
            src="/placify.png"
            alt="AI robot working on laptop"
            className="robot-image"
          />
        </div>
      </section>

          {/* STAT CARDS */}
          <section className="stats-grid">
            <StatCard
              title="CGPA"
              value="7.8"
              detail="Academic performance"
              icon={<GraduationCap />}
              color="purple"
            />
            <StatCard
              title="Readiness Score"
              value="72%"
              detail="Placement preparation"
              icon={<Target />}
              color="pink"
            />
            <StatCard
              title="Technical Skills"
              value="78%"
              detail="Coding and DSA"
              icon={<Code2 />}
              color="blue"
            />
            <StatCard
              title="Projects"
              value="4"
              detail="Completed projects"
              icon={<FolderKanban />}
              color="orange"
            />
          </section>

          {/* READINESS + PLACEMENT */}
          <section className="two-column">

            <div className="panel readiness-panel">
              <PanelHeading title="Placement Readiness" />

              <div className="readiness-content">
                <ProgressRing value={72} label="Ready" />

                <div className="readiness-details">
                  <span className="status-pill">Moderate</span>
                  <h3>You're on the right track!</h3>
                  {[
                    "Good technical foundation",
                    "Improve DSA and problem solving",
                    "Build 1–2 more projects",
                  ].map((item) => (
                    <p key={item}>
                      <CheckCircle2 size={17} />
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="panel">
              <PanelHeading title="Placement Overview" />
              <div className="placement-content">
                <ProgressRing value={68} label="Placed" />
                <div className="legend">
                  <p><i className="dot purple-dot" />Placed <b>68%</b></p>
                  <p><i className="dot lavender-dot" />Not Placed <b>32%</b></p>
                </div>
              </div>
            </div>

          </section>

          {/* CHARTS */}
          <section className="two-column chart-grid">

            <div className="panel">
              <PanelHeading title="Placement Trend" />
              <p className="panel-subtitle">
                Illustrative trend across semesters
              </p>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={trend}>
                    <CartesianGrid stroke="#33234b" strokeDasharray="3 3" />
                    <XAxis dataKey="name" stroke="#b8a6d0" />
                    <YAxis stroke="#b8a6d0" />
                    <Tooltip
                      contentStyle={{
                        background: "#1b1030",
                        border: "1px solid #873bcb",
                        borderRadius: 10,
                        color: "white"
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="#a855f7"
                      radius={[7, 7, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="panel">
              <PanelHeading title="Skill Analysis" />
              <p className="panel-subtitle">
                Your skill assessment scores
              </p>
              <div className="radar-container">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={skills}>
                    <PolarGrid stroke="#49335f" />
                    <PolarAngleAxis
                      dataKey="skill"
                      tick={{ fill: "#d8c9ed", fontSize: 11 }}
                    />
                    <Radar
                      dataKey="score"
                      stroke="#c084fc"
                      fill="#9333ea"
                      fillOpacity={0.4}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </section>

          {/* SKILL PROGRESS */}
          <section className="panel">
            <PanelHeading title="Your Skill Progress" />
            <div className="skill-list">
              {skills.map((item) => (
                <div className="skill-row" key={item.skill}>
                  <div className="skill-label">
                    <span>{item.skill}</span>
                    <b>{item.score}%</b>
                  </div>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* RECOMMENDATIONS */}
          <section className="panel">
            <PanelHeading title="Recommended Actions" />
            <div className="recommendation-grid">
              <Recommendation
                title="Improve DSA"
                description="Practice arrays, strings, trees and graphs."
              />
              <Recommendation
                title="Build Projects"
                description="Create practical projects to strengthen your portfolio."
              />
              <Recommendation
                title="Get Internship Experience"
                description="Explore internships, hackathons and open source."
              />
            </div>
          </section>

          <footer>
            PACIFY AI · AI-Powered Placement Intelligence
          </footer>
          </>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, detail, icon, color }: {
  title: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{detail}</span>
      </div>
      <ArrowUpRight className="stat-arrow" size={18} />
    </div>
  );
}

function PanelHeading({ title }: { title: string }) {
  return (
    <div className="panel-heading">
      <h2>{title}</h2>
      <span className="heading-indicator" />
    </div>
  );
}

function ProgressRing({ value, label }: {
  value: number;
  label: string;
}) {
  return (
    <div
      className="progress-ring"
      style={{
        background: `conic-gradient(#c026f5 ${value * 3.6}deg, #34204e 0deg)`
      }}
    >
      <div className="ring-inner">
        <strong>{value}%</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Recommendation({ title, description }: {
  title: string;
  description: string;
}) {
  return (
    <div className="recommendation">
      <div className="recommendation-icon">
        <Target size={21} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>Explore <ArrowUpRight size={14} /></span>
    </div>
  );
}

export default App;