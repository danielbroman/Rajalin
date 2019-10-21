import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getAllContracts } from "../../actions/contractActions";

import ContractsHeader from "./ContractsHeader";
import ContractItem from "./ContractItem";

class Contracts extends Component {
  componentDidMount() {
    this.props.getAllContracts();
  }

  getDate = dateString => {
    return dateString.split("T")[0];
  };

  render() {
    const { contracts } = this.props.contract;
    const contractItems = contracts.map(contract => {
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
      <div className="contracts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 mb-4">
              <h1>All contracts</h1>
            </div>
          </div>
          <ContractsHeader />
          {contractItems}
        </div>
      </div>
    );
  }
}

Contracts.propTypes = {
  contract: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  getAllContracts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  contract: state.contract,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getAllContracts }
)(Contracts);
