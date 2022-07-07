import axios from 'axios';

const url = 'http://localhost:5000';

//users
export const getUserTasks = (userId) => axios.get(`${url}/users/getUserTasks`, {ID:userId});
export const createUserTask = (task) => axios.post(`${url}/users/createUserTask`, task);
export const scheduleTask = (task) => axios.post(`${url}/users`, task);
export const completeUserTask = (task) => axios.post(`${url}/users`, task);

//admin
export const getTasks = () => axios.get(`${url}/tasks`)
export const createTask = (task) => axios.post(`${url}/tasks`, task);
export const updateTask = (task) => axios.patch(`${url}/tasks`, task);
export const deleteTask = (taskId) => axios.delete(`${url}/tasks`, {ID: taskId});

//login
export const login = (credentials) => axios.post(`${url}/users/login`, credentials);
