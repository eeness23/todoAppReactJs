import React, { Component } from "react";
import {getAllTasks,deleteById} from "../../action/Action";
import edit from "../../image/edit.png";
import remove from "../../image/delete.png";
import {Link} from "react-router-dom"

export default class body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      loading : true
    };

    this.reflesh=this.reflesh.bind(this);
  }

  componentDidMount() {
    this.reflesh();
  }

  deleteTask(taskId){
    deleteById(taskId).then(this.reflesh);
  }

  reflesh(){
    getAllTasks()
    .then(res => {
      this.setState({
        tasks: res.data,
        loading:false
      });
    })
    .catch( err => {console.log(err)});
  }

  render() {
      // Loadin icon can be added.
      if(this.state.loading === true){
          return null; 
      }

     return (
      <tbody>
    
        {this.state.tasks.map( task => {
            return <tr>
            <th scope="row" key={task.id}>{task.taskIdentifier}</th>
            <td>{task.taskName}</td>
            <td>{task.desc}</td>
            <td>{task.create_at}</td>
            <td>{task.start_date}</td>
            <td>{task.updated_at}</td>
            <td>{task.end_date}</td>
            <td><Link to={`/tasks/${task.taskIdentifier}`}><img src={edit} alt="edit" width="30px" /></Link></td>
            <td><img src={remove} alt="remove" width="30px" onClick={()=>{this.deleteTask(task.taskIdentifier)}} /></td>
          </tr>
        })}
    

        </tbody>
    );
  }
}
