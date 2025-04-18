import React, { useEffect, useState } from "react";
import api from "../api/axios";

export default function AllJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "", required_skills: "" });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const res = await api.get("jobs/");
    setJobs(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const deleteJob = async (id) => {
  if (window.confirm("Удалить вакансию?")) {
    await api.delete(`jobs/${id}/`);
    fetchJobs();
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      required_skills: form.required_skills.split(",").map((s) => s.trim()),
    };
    await api.post("jobs/", payload);
    setForm({ title: "", description: "", location: "", required_skills: "" });
    fetchJobs(); // обновить список
  };

  return (
    <div className="job-container">
      <h1 className="section-title">Все вакансии</h1>

      <form onSubmit={handleSubmit} className="job-form">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Должность" required />
        <input name="location" value={form.location} onChange={handleChange} placeholder="Локация" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" required />
        <input name="required_skills" value={form.required_skills} onChange={handleChange} placeholder="Навыки (через запятую)" required />
        <button type="submit">Создать вакансию</button>
      </form>

      <ul className="job-list">
        {jobs.map((job) => (
  <li key={job.id} className="job-item">
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <h3>{job.title} — {job.location}</h3>
      <button className="delete-btn" onClick={() => deleteJob(job.id)}>Удалить</button>
    </div>
    <p>{job.description}</p>
    <p><strong>Навыки:</strong> {job.required_skills.join(", ")}</p>
  </li>
))}

      </ul>
    </div>
  );
}
