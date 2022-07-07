import axios from 'axios';

const url = 'http://localhost:3000';

export const getUserTasks = (userId) => axios.get(`${url}/user/${userId}`);
export const updateUserTasks = (userId) => axios.patch(`${url}/user/${userId}`);

export const getTasks = () => axios.get(`${url}/tasks`)
export const createTask = (task) => axios.post(`${url}/addTask`, task);
export const updateTask = (task) => axios.patch(`${url}/updateTask`, task);
export const deleteTask = (taskId) => axios.delete(`${url}/deleteTask/${taskId}`);