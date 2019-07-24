import React, { Component } from "react";
import Thead from "./head";
import Tbody from "./body";

export default class Dashboard extends Component {

  render() {
    return (
      <div className="mt-4">
        <table className="table table-hover table-dark">
          <Thead />
          <Tbody />
        </table>
      </div>
    );
  }
}
