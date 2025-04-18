import React, { useState } from "react";
import api from "../api/axios";
import { getToken } from "../utils/token";
import ResumeResultTabs from "../components/ResumeResultTabs";


export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const upload = async () => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await api.post("resumes/upload/", formData); // 🔥 БЕЗ headers
    setResult(res.data);
  } catch (err) {
    console.error("Ошибка при загрузке:", err);
  }
};


  return (
      <div className="upload-container">
          <h1 className="upload-title">Загрузка резюме</h1>

          <input
              type="file"
              className="file-input"
              onChange={(e) => setFile(e.target.files[0])}
          />

          <button onClick={upload} className="upload-btn">
              Загрузить
          </button>

          {result && (
              <div className="upload-result">
                  <h2 className="result-title">Анализ резюме</h2>
                  {result && <ResumeResultTabs result={result} />}
              </div>
          )}
      </div>
  );
}
