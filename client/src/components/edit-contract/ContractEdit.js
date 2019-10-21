import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SignatureCanvas from 'react-signature-canvas';

import { createContract } from '../../actions/contractActions';

import InputField from '../common/InputField';
import TextAreaField from '../common/TextAreaField';
import Goods from '../create-contract/Goods';

class ContractEdit extends Component {
  state = {
    consignor: '',
    receiver: '',
    startDate: '',
    endDate: '',
    startAddress: '',
    endAddress: '',
    additionalInfo: '',
    goods: [
      {
        amount: '',
        description: '',
        weight: '',
        volume: ''
      }
    ],
    senderSignature: '',
    driverSignature: ''
  };

  componentDidMount() {
    const { singleContract } = this.props.contract;

    if (Object.keys(singleContract).length === 0) {
      this.props.history.push('/');
    } else {
      const base64Sender = `data:image/png;base64,${this.bufferToBase64(
        singleContract.senderSignature.data
      )}`;
      const base64Driver = `data:image/png;base64,${this.bufferToBase64(
        singleContract.driverSignature.data
      )}`;
      this.senderSignature.fromDataURL(base64Sender);
      this.driverSignature.fromDataURL(base64Driver);

      this.setState({
        consignor: singleContract.consignor,
        receiver: singleContract.receiver,
        startDate: singleContract.startDate.split('T')[0],
        endDate: singleContract.endDate.split('T')[0],
        startAddress: singleContract.startAddress,
        endAddress: singleContract.endAddress,
        additionalInfo: singleContract.additionalInfo,
        senderSignature: singleContract.senderSignature,
        driverSignature: singleContract.driverSignature
      });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    let senderSignature = this.senderSignature.toDataURL();
    let driverSignature = this.driverSignature.toDataURL();
    let receiverData = new Buffer(senderSignature.split(',')[1], 'base64');
    let driverData = new Buffer(driverSignature.split(',')[1], 'base64');
    this.setState(
      { senderSignature: receiverData, driverSignature: driverData },
      _ => {
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
        } = this.state;

        const contractData = {
          consignor,
          receiver,
          startDate,
          endDate,
          startAddress,
          endAddress,
          additionalInfo,
          goods,
          senderSignature,
          driverSignature,
          driverId: this.props.auth.user.driverId,
          user: this.props.auth.user.id
        };

        const goodsData = [];

        goods.forEach(goodsRow => {
          goodsData.push(goodsRow);
        });

        this.props.updateContract(contractData, goodsData, this.props.history);
      }
    );
  };

  addGoodsRow = () => {
    let goods = this.state.goods;
    goods[goods.length] = {
      amount: '',
      description: '',
      weight: '',
      volume: ''
    };
    this.setState({
      goods
    });
  };

  removeGoodsRow = () => {
    let goods = this.state.goods;
    let goodsRemoved = goods.pop();
    this.setState({
      goodsRemoved
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onGoodsChange = (e, index) => {
    const goods = this.state.goods;

    goods[index][[e.target.name]] = e.target.value;
    this.setState({
      goods
    });
  };

  clearSignatureCanvas = signature => {
    this[signature].clear();
  };

  getBase64 = () => {
    let string = this.senderSignature.toDataURL();
    let binData = new Buffer(string.split(',')[1], 'base64');
    this.setState({ signature: binData });
  };

  bufferToBase64 = buf => {
    var binstr = Array.prototype.map
      .call(buf, function(ch) {
        return String.fromCharCode(ch);
      })
      .join('');
    return btoa(binstr);
  };

  render() {
    const { errors } = this.props;
    const { goods } = this.state;

    const goodsFields = goods.map((goodsrow, index) => {
      return (
        <Goods
          key={index}
          index={index}
          onGoodsChange={this.onGoodsChange}
          goods={goodsrow}
        />
      );
    });

    const removeButton = (
      <button
        className="btn btn-danger"
        type="button"
        onClick={this.removeGoodsRow}
      >
        Remove row
      </button>
    );

    return (
      <div className="create-contract">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center mb-4">
              <h1>Edit Contract</h1>
            </div>
          </div>
          <form onSubmit={this.onSubmit}>
            <div className="row">
              <div className="col-lg-6 mb-2">
                <InputField
                  onChange={this.onChange}
                  name="consignor"
                  label="Consignor"
                  type="text"
                  value={this.state.consignor}
                  error={errors.consignor}
                />
              </div>
              <div className="col-lg-6 mb-2">
                <InputField
                  onChange={this.onChange}
                  name="receiver"
                  label="Receiver"
                  placeholder="Receiver"
                  type="text"
                  value={this.state.receiver}
                  error={errors.receiver}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6 mb-2">
                <InputField
                  onChange={this.onChange}
                  name="startDate"
                  label="Start Date"
                  placeholder="Start Date"
                  type="date"
                  value={this.state.startDate}
                  error={errors.startDate}
                />
              </div>
              <div className="col-lg-6 mb-2">
                <InputField
                  onChange={this.onChange}
                  name="endDate"
                  label="End Date"
                  placeholder="End Date"
                  type="date"
                  value={this.state.endDate}
                  error={errors.endDate}
                />
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-lg-6 mb-2">
                <InputField
                  onChange={this.onChange}
                  name="startAddress"
                  label="Start Address"
                  placeholder="Start Address"
                  type="text"
                  value={this.state.startAddress}
                  error={errors.startAddress}
                />
              </div>

              <div className="col-lg-6 mb-2">
                <InputField
                  onChange={this.onChange}
                  name="endAddress"
                  label="Delivery Address"
                  placeholder="Delivery Address"
                  type="text"
                  value={this.state.endAddress}
                  error={errors.endAddress}
                />
              </div>
            </div>

            {goodsFields}
            <button
              type="button"
              className="btn btn-success mr-2"
              onClick={this.addGoodsRow}
            >
              Add new row
            </button>
            {goods.length >= 2 ? removeButton : null}
            <div className="row mt-4">
              <div className="col-md-12 mb-4">
                <TextAreaField
                  onChange={this.onChange}
                  name="additionalInfo"
                  label="Additional Info"
                  placeholder="Additional info"
                  value={this.state.additionalInfo}
                  error={errors.additionalInfo}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                {/*<CanvasDraw
                  brushRadius={3}
                  hideGrid={true}
                  canvasWidth={500}
                  canvasHeight={200}
                  brushColor="rgba(0,0,0,1)"
                />*/}
                <div className="row">
                  <label>
                    <b>Senders signature</b>
                  </label>
                </div>
                <div className="row">
                  <SignatureCanvas
                    penColor="black"
                    ref={ref => {
                      this.senderSignature = ref;
                    }}
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: 'sigCanvas'
                    }}
                  />
                </div>
                <div className="row mt-2">
                  <div className="col-xl-6">
                    <button
                      type="button"
                      name="senderSignature"
                      onClick={() =>
                        this.clearSignatureCanvas('senderSignature')
                      }
                      className="btn btn-warning"
                    >
                      Clear signature field
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="row">
                  <label>
                    <b>Drivers signature</b>
                  </label>
                </div>
                <div className="row">
                  <SignatureCanvas
                    penColor="black"
                    ref={ref => {
                      this.driverSignature = ref;
                    }}
                    canvasProps={{
                      width: 400,
                      height: 150,
                      className: 'sigCanvas'
                    }}
                  />
                </div>
                <div className="row mt-2">
                  <div className="col-xl-6">
                    <button
                      type="button"
                      name="driverSignature"
                      onClick={() =>
                        this.clearSignatureCanvas('driverSignature')
                      }
                      className="btn btn-warning"
                    >
                      Clear signature field
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <button type="submit" className="btn btn-success">
                  Save changes to contract
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ContractEdit.propTypes = {
  singleContract: PropTypes.instanceOf(Object).isRequired,
  contract: PropTypes.instanceOf(Object).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  contract: state.contract,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createContract }
)(ContractEdit);
