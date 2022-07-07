import axios from 'axios';

const url = 'http://localhost:5000';

// export const getUserTasks = (userId) => axios.get(`${url}/user/${userId}`);
// export const updateUserTasks = (userId) => axios.patch(`${url}/user/${userId}`);

export const getTasks = () => axios.get(`${url}/tasks`)
export const createTask = (task) => axios.post(`${url}/tasks`, task);
export const updateTask = (task) => axios.patch(`${url}/tasks`, task);
export const deleteTask = (ID) => axios.delete(`${url}/tasks`, ID);