import React, { Component } from "react";
import { Link } from "react-router-dom";

class ContractItem extends Component {
  render() {
    const { sender, created, contractId, startAddress } = this.props;

    return (
      <div className="contract-item row border p-2">
        <div className="col-md-3">
          <p className="m-2">{sender}</p>
        </div>
        <div className="col-md-3">
          <p className="m-2">{created}</p>
        </div>
        <div className="col-md-5">
          <p className="m-2">{startAddress}</p>
        </div>
        <div className="col-md-1 col-2">
          <Link to={`/contract/${contractId}`}>
            <button className="btn btn-primary">View</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ContractItem;
