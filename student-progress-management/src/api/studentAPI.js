import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/students';

// Get all students
export const getStudents = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

// Get student details by ID
export const getStudentDetails = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/${id}`);
  return res.data;
};

// Add a new student
export const addStudent = async (studentData) => {
  const res = await axios.post(API_BASE_URL, studentData);
  return res.data;
};

// Update student by ID
export const updateStudent = async (id, updatedData) => {
  const res = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  return res.data;
};

// Delete student by ID
export const deleteStudent = async (id) => {
  const res = await axios.delete(`${API_BASE_URL}/${id}`);
  return res.data;
};

// Trigger manual Codeforces sync for a student (real-time fetch)
export const syncStudentData = async (id) => {
  const res = await axios.post(`${API_BASE_URL}/${id}/sync`);
  return res.data;
};

// Update student's cron sync settings
export const updateStudentSyncSettings = async (id, settings) => {
  const res = await axios.put(`${API_BASE_URL}/${id}/sync-settings`, settings);
  return res.data;
};
