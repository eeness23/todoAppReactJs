import React, { Component } from "react";
import Thead from "./head";
import Tbody from "./body";
import Header from "../Header";
import "../../css/table.css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createNew: "",
      update: "",
      welcome: ""
    };

    if (this.props.location.state) {
      this.state = { ...this.state,
        createNew: this.props.location.state.createNew,
        update: this.props.location.state.update,
        welcome: this.props.location.state.welcome
      };
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <div className="mt-4">
            {this.state.createNew != "" && this.state.createNew != null && (
              <div class="alert alert-success" role="alert">
                You Created {this.state.createNew} Task
              </div>
            )}
            {this.state.update != "" && this.state.update != null && (
              <div class="alert alert-success" role="alert">
                You Updated {this.state.update} Task
              </div>
            )}
            {this.state.welcome != "" && this.state.welcome != null && (
              <div class="alert alert-success" role="alert">
                Welcome x
              </div>
            )}
            <table className="table table-hover table-dark text-center">
              <Thead />
              <Tbody token={this.props.token} />
            </table>
          </div>
        </div>
      </div>
    );
  }
}
