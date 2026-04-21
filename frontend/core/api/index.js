import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

// attach token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("slam_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// submit a friend's entry (public)
export const submitEntry = async (formData) => {
  const res = await api.post("/entries", formData);
  return res.data;
};

// admin login — saves token to localStorage
export const adminLogin = async (password) => {
  const res = await api.post("/admin/login", { password });
  localStorage.setItem("slam_token", res.data.token);
  return res.data;
};

// fetch all entries (protected)
export const fetchEntries = async () => {
  const res = await api.get("/admin/entries");
  return res.data;
};

// delete one entry (protected)
export const deleteEntry = async (entryId) => {
  const res = await api.delete(`/admin/entries/${entryId}`);
  return res.data;
};
