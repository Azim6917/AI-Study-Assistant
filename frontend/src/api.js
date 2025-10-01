import axios from "axios";

const API = "http://localhost:8000";

export const uploadFile = (file) => {
  let formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API}/upload`, formData);
};

export const summarize = (text, option) =>
  axios.post(`${API}/summarize`, { text, option });

export const generateQuiz = (text, option) =>
  axios.post(`${API}/quiz`, { text, option });

export const explain = (text, option) =>
  axios.post(`${API}/explain`, { text, option });

export const ask = (text, option) =>
  axios.post(`${API}/ask`, { text, option });
