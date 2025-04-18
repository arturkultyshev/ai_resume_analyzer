import React, { useState } from "react";

export default function ResumeResultTabs({ result }) {
  const [activeTab, setActiveTab] = useState("analysis");

  const jobs = result.analysis_result?.matching_jobs ?? [];
  const feedback = result.feedback;
  const skills = result.analysis_result?.skills ?? [];
  const score = result.score;

  return (
    <div className="resume-tabs">
      <div className="tab-header">
        <button
          className={activeTab === "analysis" ? "tab active" : "tab"}
          onClick={() => setActiveTab("analysis")}
        >
          Анализ
        </button>
        <button
          className={activeTab === "jobs" ? "tab active" : "tab"}
          onClick={() => setActiveTab("jobs")}
        >
          Вакансии
        </button>
      </div>

      <div className="tab-body">
        {activeTab === "analysis" && (
          <div>
            <p><strong>Оценка:</strong> {score}</p>
            <p><strong>Навыки:</strong></p>
            <ul>
              {skills.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <p><strong>Фидбек:</strong></p>
            <pre>{JSON.stringify(feedback, null, 2)}</pre>
          </div>
        )}

        {activeTab === "jobs" && (
          <div>
            {jobs.length === 0 ? (
              <p>Нет подходящих вакансий</p>
            ) : (
              <ul>
                {jobs.map((job, i) => (
                  <li key={i}>
                    <strong>{job.title}</strong> — {job.location} — совпадение: {job.match_score}%
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
