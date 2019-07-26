import React, { Component } from "react";
import Thead from "./head";
import Tbody from "./body";
import "../../css/table.css";
import {getJwtFromSession,decodeToken} from "../../security/jwt"

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createNew: "",
      update: "",
      fullName: "",
      delete:false,
      deleteTaskName:""
    };

    if (this.props.location.state) {
      this.state = { ...this.state,
        createNew: this.props.location.state.createNew,
        update: this.props.location.state.update,
        fullName: this.props.location.state.fullName
      };
    }

    this.deleteAlert = this.deleteAlert.bind(this);
  }

  componentDidMount(){
    if(getJwtFromSession()!=="null"){

      console.log(decodeToken(getJwtFromSession()));

    }
  }

  deleteAlert(deleteTaskName){
    this.setState({
      delete : true,
      deleteTaskName : deleteTaskName
    })
  }

  render() {
    return (
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
              <Tbody deleteCallBack={this.deleteAlert} />
            </table>
          </div>
    );
  }
}
