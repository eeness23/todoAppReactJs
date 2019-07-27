import React, { Component } from "react";
import Thead from "./head";
import Tbody from "./body";
import "../../css/table.css";
import {redirectToLogin} from "../../security/jwt";
import Header from "../Header"
import { getAllTasks, deleteById } from "../../action/Action"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createNew: "",
      update: "",
      fullName: "",
      delete: false,
      deleteTaskName: "",
      tasks:[]
    };

    if (this.props.location.state) {
      this.state = {
        ...this.state,
        createNew: this.props.location.state.createNew,
        update: this.props.location.state.update,
        fullName: this.props.location.state.fullName
      };
    }

    this.deleteAlert = this.deleteAlert.bind(this);
    this.reflesh=this.reflesh.bind(this);
    this.deleteTask=this.deleteTask.bind(this);
  }


  componentDidMount() {
    this.reflesh();
    console.log("componentDidMount");
  }

  reflesh() {
    getAllTasks()
      .then(res => {
        this.setState({
          tasks:res.data
        })
      })
      .catch(err =>{
        if(err.response.status==401){
          this.props.history.push({
            pathname: "/login",
            state: { mustLogin: true }
          });
        };
      })

      console.log("4"+this.state.tasks);
  }

  deleteTask(taskId) {
    deleteById(taskId)
      .then( () =>{
        this.reflesh();
        this.deleteAlert(taskId);
      })
      .catch(err =>{
        if(err.response.status==401){
          this.props.history.push({
            pathname: "/login",
            state: { mustLogin: true }
          });
        };
      })
  }


  deleteAlert(deleteTaskName) {
    this.setState({
      delete: true,
      deleteTaskName: deleteTaskName
    });
  }

  render() {
    return (
      <div>
        <Header changeButtonToCreate={redirectToLogin()}/>
        <div className="container">
          <div className="mt-4">
            {this.state.createNew !== "" && this.state.createNew != null && (
              <div class="alert alert-success" role="alert">
                You Created {this.state.createNew} Task
              </div>
            )}
            {this.state.update !== "" && this.state.update != null && (
              <div class="alert alert-success" role="alert">
                You Updated {this.state.update} Task
              </div>
            )}
            {this.state.fullName !== "" && this.state.fullName != null && (
              <div class="alert alert-success" role="alert">
                Welcome {this.state.fullName}
              </div>
            )}
            {this.state.delete && (
              <div class="alert alert-danger" role="alert">
                You Deleted {this.state.deleteTaskName}
              </div>
            )}
            <table className="table table-hover table-dark text-center">
              <Thead />
              <Tbody tasks={this.state.tasks} deleteCallBack={this.deleteTask} />
            </table>
          </div>
        </div>
      </div>
    );
  }
}
