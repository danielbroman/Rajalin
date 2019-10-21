import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';

import { getContract, deleteContract } from '../../actions/contractActions';
import Spinner from '../common/Spinner';

class Contract extends Component {
  componentDidMount() {
    this.props.getContract(this.props.match.params.id);
  }

  getSignature = signature => {
    const string = signature.toString('base64');
    return string;
  };

  printAsPDF = () => {
    const {
      consignor,
      receiver,
      startDate,
      startAddress,
      endAddress,
      additionalInfo,
      goods,
      senderSignature,
      driverSignature
    } = this.props.contract.singleContract;

    const userData = {
      consignor,
      receiver,
      startAddress,
      startDate,
      endAddress,
      additionalInfo,
      goods,
      senderSignature,
      driverSignature
    };

    axios
      .post('/api/contracts/createpdf', userData)
      .then(() => axios.get('/api/contracts/getpdf', { responseType: 'blob' }))
      .then(res => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        FileSaver.saveAs(pdfBlob, `${consignor}_${Date.now()}.pdf`);
      });
  };

  onContractDelete = () => {
    const { deleteContract } = this.props;
    const { id } = this.props.auth.user;
    const { _id } = this.props.contract.singleContract;
    deleteContract(_id, id, this.props.history);
  };

  render() {
    const {
      consignor,
      receiver,
      startDate,
      endDate,
      startAddress,
      endAddress,
      additionalInfo,
      goods,
      senderSignature,
      driverSignature
    } = this.props.contract.singleContract;

    const { errors } = this.props;

    const senderSig = senderSignature
      ? `data:image/png;base64, ${Buffer.from(
          senderSignature,
          'binary'
        ).toString('base64')}`
      : null;

    const driverSig = driverSignature
      ? `data:image/png;base64, ${Buffer.from(
          driverSignature,
          'binary'
        ).toString('base64')}`
      : null;

    const allGoods = goods
      ? goods.map((goods, index) => {
          return (
            <div key={goods._id} className="row">
              <div className="col-lg-3">
                <p>
                  <b>Amount:</b> {goods ? goods.amount : null}
                </p>
              </div>
              <div className="col-lg-3">
                <p>
                  <b>Description:</b> {goods ? goods.description : null}
                </p>
              </div>
              <div className="col-lg-3">
                <p>
                  <b>Weight: </b>
                  {goods ? `${goods.weight} ${goods.weightUnit}` : null}
                </p>
              </div>
              <div className="col-lg-3">
                <p>
                  <b>Volume: </b>
                  {goods ? `${goods.volume} ${goods.volumeUnit}` : null}
                </p>
              </div>
            </div>
          );
        })
      : null;
    const content = (
      <div className="single-contract">
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-12">
              <h1>Contract</h1>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6">
              <p>
                <b>Start Date:</b>
              </p>
              <p>{startDate ? startDate.split('T')[0] : null}</p>
            </div>
            <div className="col-lg-6">
              <p>
                <b>End Date:</b>
              </p>
              <p>{endDate ? endDate.split('T')[0] : null}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <p>
                <b>Consignor:</b>
              </p>

              <p>{consignor}</p>
              <p>{startAddress}</p>
            </div>
            <div className="col-lg-6">
              <p>
                <b>Consignee:</b>
              </p>
              <p>{receiver || consignor}</p>
              <p>{endAddress}</p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-lg-6">
              <br />
              <p>
                <b>Place of departure:</b>
              </p>
              <p>{receiver || consignor}</p>
              <p>{startAddress}</p>
            </div>
            <div className="col-lg-6">
              <br />
              <p>
                <b>Delivery Address:</b>
              </p>
              <p>{receiver || consignor}</p>
              <p>{endAddress}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>
                <b>Goods: </b>
              </p>
              {allGoods
                ? allGoods.length > 0
                  ? allGoods
                  : 'There are no goods to display'
                : 'There are no goods to display'}
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p>
                <b>Additional info: </b>
              </p>
              <p>{additionalInfo}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <p>
                <b>Consignors signature: </b>
              </p>
              <img style={{ width: '300px' }} src={senderSig} alt="" />
            </div>
            <div className="col-lg-6">
              <p>
                <b>Drivers signature: </b>
              </p>
              <img style={{ width: '300px' }} src={driverSig} alt="" />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <button
                type="button"
                onClick={this.printAsPDF}
                className="btn btn-primary mr-2"
              >
                Download as PDF
              </button>
              <Link to="/edit-contract">
                <button type="button" className="btn btn-warning mr-2">
                  Edit contract
                </button>
              </Link>

              <button
                type="button"
                onClick={this.onContractDelete}
                className="btn btn-danger"
              >
                Delete contract
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {errors ? (
                <div className="error-text">{errors.notauthorized}</div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );

    return this.props.contract.isLoading ? <Spinner /> : content;
  }
}

Contract.propTypes = {
  contract: PropTypes.instanceOf(Object).isRequired,
  getContract: PropTypes.func.isRequired,
  deleteContract: PropTypes.func.isRequired,
  match: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  errors: PropTypes.instanceOf(Object),
  history: PropTypes.instanceOf(Object).isRequired
};

Contract.defaultProps = {
  errors: ''
};

const mapStateToProps = state => ({
  auth: state.auth,
  contract: state.contract,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getContract, deleteContract }
)(Contract);
