import React, { Component } from "react";
import edit from "../../image/edit.png";
import remove from "../../image/delete.png";
import { Link,withRouter } from "react-router-dom";

class body extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: this.props.tasks
    };
  }

 componentWillReceiveProps(props){
   const{tasks}=props
   this.setState({
     tasks:tasks
   })
 }

  render() {
    return (
      <tbody>
        {this.state.tasks.map(task => {
          return (
            <tr>
              <th scope="row" key={task.id}>
                {task.taskIdentifier}
              </th>
              <td>{task.taskName}</td>
              <td>{task.desc}</td>
              <td>{task.create_at}</td>
              <td>{task.start_date}</td>
              <td>{task.updated_at}</td>
              <td>{task.end_date}</td>
              <td>{task.subTasks.map(sub =>{
                  return <div>{sub.taskIdentifier}</div>
              })}</td>
              <td className={task.completed ? "completed" : "notCompleted"}>{task.completed ? "Completed":"Not Completed"}</td>
              <td>
                <Link to={`/tasks/${task.taskIdentifier}`}>
                  <img src={edit} alt="edit" width="30px" />
                </Link>
              </td>
              <td>
                <img className="deleteItem"
                  src={remove}
                  alt="remove"
                  width="30px"
                  onClick={() => {
                    this.props.deleteCallBack(task.taskIdentifier);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default withRouter(body)