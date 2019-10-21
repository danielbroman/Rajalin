import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import ContractItem from "../Contract/ContractItem";

import { getUserContracts } from "../../actions/contractActions";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserContracts(this.props.auth.user.id);
  }

  getDate = dateString => {
    return dateString.split("T")[0];
  };

  render() {
    const { userContracts } = this.props.contract;

    const contracts = userContracts.map(contract => {
      return (
        <ContractItem
          key={contract._id}
          sender={contract.consignor}
          contractId={contract._id}
          created={this.getDate(contract.startDate)}
          startAddress={contract.startAddress}
        />
      );
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <h1>My latest contracts</h1>
            </div>
          </div>
          <div className="row p-2 bg-dark text-white">
            <div className="col-md-3">
              <b>Consignor</b>
            </div>
            <div className="col-md-3">
              <b>Date created</b>
            </div>
            <div className="col-md-4">
              <b>StartAddress</b>
            </div>
          </div>
          {contracts}
          <hr />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
  getUserContracts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  contract: state.contract
});

export default connect(
  mapStateToProps,
  { getUserContracts }
)(Dashboard);
