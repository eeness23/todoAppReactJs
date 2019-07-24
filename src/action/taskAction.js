import axios from "axios";
import {TASKS_URL} from "./urls";

class actions {
    createTask(task){
      return axios.post(TASKS_URL,task);
    }
}

export default new actions;