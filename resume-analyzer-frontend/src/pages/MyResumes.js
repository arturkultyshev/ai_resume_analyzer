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
        setResumes(res.data);
      } catch (err) {
        setError("Ошибка при загрузке резюме");
      }
    };

    fetchResumes();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Мои резюме и анализы</h1>

      {error && <p className="text-red-600">{error}</p>}

      {resumes.length === 0 ? (
        <p className="text-gray-500">У вас пока нет загруженных резюме.</p>
      ) : (
        resumes.map((resume) => (
          <div
            key={resume.id}
            className="mb-6 p-4 border rounded bg-white shadow-sm"
          >
            <h2 className="text-lg font-semibold">
              Резюме #{resume.id} — Оценка: {resume.score}
            </h2>

            <div className="mt-2">
              <p className="font-medium">Навыки:</p>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {resume.analysis_result?.skills?.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Рекомендации:</p>
              <ul className="list-disc list-inside text-sm text-red-600">
                {resume.analysis_result?.recommendations?.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>

            <div className="mt-2">
              <p className="font-medium">Фидбек:</p>
              <pre className="text-sm bg-gray-50 p-2 rounded">
                {JSON.stringify(resume.feedback, null, 2)}
              </pre>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
