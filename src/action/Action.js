import axios from "axios";
import { TASKS_URL, REGISTER_URL, LOGIN_URL } from "./urls";
import {setJwtToken} from "../security/jwt";
import jwt_decode from "jwt-decode"

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
    const res = await axios.post(LOGIN_URL,user);
  
    const {token} = res.data;

    sessionStorage.setItem("Authorization",token);

    setJwtToken(token);

    const decodeToken = jwt_decode(token);

     console.log(decodeToken);
  }

  export {createTask,getAllTasks,getTaskById,deleteById,register,login}
  

