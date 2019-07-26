import axios from "axios";
import { TASKS_URL, REGISTER_URL, LOGIN_URL } from "./urls";
import {getHeader} from "../security/jwt"

  const createTask = (task) => {
    return axios.post(TASKS_URL, task);
  }

  const getAllTasks = () => {
    return axios.get(TASKS_URL);
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

  export {createTask,getAllTasks,getTaskById,deleteById,register,login}
  

