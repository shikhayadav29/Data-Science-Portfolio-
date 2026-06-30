import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const getProfile = () => api.get("/profile").then((r) => r.data);

export const uploadPhoto = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api
    .post("/profile/photo", fd, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data);
};

export const uploadResume = (file) => {
  const fd = new FormData();
  fd.append("file", file);
  return api
    .post("/profile/resume", fd, { headers: { "Content-Type": "multipart/form-data" } })
    .then((r) => r.data);
};

export const submitContact = (payload) =>
  api.post("/contact", payload).then((r) => r.data);

export const absoluteUrl = (path) => (path ? `${BACKEND_URL}${path}` : null);
