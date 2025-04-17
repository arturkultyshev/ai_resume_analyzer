import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { getToken } from "../utils/token";

export default function MyResumes() {
  const [resumes, setResumes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchResumes = async () => {
    try {
      const res = await api.get("resumes/", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = Array.isArray(res.data)
        ? res.data
        : res.data.results ?? []; // поддержка и списка, и пагинации

      setResumes(data);
    } catch (err) {
      console.error("Ошибка при загрузке резюме:", err);
      setError("Ошибка при загрузке резюме");
    }
  };

  fetchResumes();
}, []);


  return (
      <div className="container">
          <h1 className="section-title">Мои резюме и анализы</h1>

          {error && <p className="error">{error}</p>}

          {resumes.length === 0 ? (
              <p className="empty">У вас пока нет загруженных резюме.</p>
          ) : (
              resumes.map((resume) => (
                  <div key={resume.id} className="resume-card">
                      <h2 className="resume-title">
                          Резюме #{resume.id} — Оценка: {resume.score}
                      </h2>

                      <div>
                          <p className="resume-label">Навыки:</p>
                          <ul className="resume-list">
                              {resume.analysis_result?.skills?.map((skill, i) => (
                                  <li key={i}>{skill}</li>
                              ))}
                          </ul>
                      </div>

                      <div>
                          <p className="resume-label">Рекомендации:</p>
                          <ul className="resume-list recommendations">
                              {resume.analysis_result?.recommendations?.map((rec, i) => (
                                  <li key={i}>{rec}</li>
                              ))}
                          </ul>
                      </div>

                      <div>
                          <p className="resume-label">Фидбек:</p>
                          <pre className="resume-feedback">
            {JSON.stringify(resume.feedback, null, 2)}
          </pre>
                      </div>
                  </div>
              ))
          )}
      </div>

  );
}
