import React, { Component } from "react";
import action from "../../action/taskAction";
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
  }

  componentDidMount() {
    action.getAllTasks()
    .then(res => {
      this.setState({
        tasks: res.data,
        loading:false
      });
    })
    .catch( err => {console.error.err.response});
  }

  render() {
      // Loadin icon can be added.
      if(this.state.loading === true){
          console.log("deneme");
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
            <td><img src={remove} alt="remove" width="30px" /></td>
          </tr>
        })}
    

        </tbody>
    );
  }
}
