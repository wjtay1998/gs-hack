import axios from "axios";

// const url = "http://localhost:5001";
const url = "https://s91rw4b5k6.execute-api.us-east-1.amazonaws.com/dev";

//users
export const getUserTasks = (userId) =>
  axios.post(`${url}/users/getUserTasks`, { ID: userId });
export const createUserTask = (task) =>
  axios.post(`${url}/users/createUserTask`, task);
export const scheduleTask = (task) => axios.post(`${url}/users`, task);
export const completeUserTask = (task) => axios.post(`${url}/users`, task);

//admin
export const getTasks = () => axios.get(`${url}/tasks`);
export const getOneTask = (taskId) => axios.get(`${url}/tasks/${taskId}`);
export const createTask = (task) => axios.post(`${url}/tasks`, task);
export const updateTask = (task) => axios.patch(`${url}/tasks`, task);
export const deleteTask = (taskId) =>
  axios.delete(`${url}/tasks`, { ID: taskId });

//login
export const login = (credentials) =>
  axios.post(`${url}/users/login`, credentials);
