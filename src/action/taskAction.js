import axios from "axios";
import { TASKS_URL } from "./urls";

class actions {
   createTask(task) {
    return axios.post(TASKS_URL, task);
  }

  getAllTasks() {
    return  axios.get(TASKS_URL);
  }

   getTaskById(taskId) {
    return axios.get(TASKS_URL + "/" + taskId);
  }
  
  async deleteById(taskId) {
    return await axios.delete(TASKS_URL + "/" + taskId);
  }
}

export default new actions();
