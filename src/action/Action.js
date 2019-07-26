import axios from "axios";
import { TASKS_URL, REGISTER_URL, LOGIN_URL,EMPTIES_URL } from "./urls";

  const createTask = (task) => {
    return axios.post(TASKS_URL, task);
  }

  const getAllTasks =async () => {
    return await axios.get(TASKS_URL);
  }

  const getTaskById = (taskId) => {
    return axios.get(TASKS_URL + "/" + taskId);
  }

  const deleteById= async (taskId)  => {
    return await axios.delete(TASKS_URL + "/" + taskId);
  }

  const register = async (user) => {
    return await axios.post(REGISTER_URL, user);
  }

  const login = async (user) => {
    return await axios.post(LOGIN_URL,user);
  }

  const empties = async () => {
    return await axios.get(EMPTIES_URL);
  }

  export {createTask,getAllTasks,getTaskById,deleteById,register,login,empties}
  

