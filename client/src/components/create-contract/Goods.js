import React, { Component } from 'react';

import InputField from '../common/InputField';

export default class Goods extends Component {
  componentDidMount() {
    // this.props.onGoodsChange();
  }

  render() {
    const { goods, index, onGoodsChange } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col-lg-3 mb-2">
            <InputField
              onChange={event => onGoodsChange(event, index)}
              name="amount"
              label="Number of goods"
              placeholder="amount"
              type="text"
              value={goods ? goods.amount : ''}
            />
          </div>

          <div className="col-lg-3 mb-2">
            <InputField
              onChange={event => onGoodsChange(event, index)}
              name="description"
              label="Description of goods"
              placeholder="description"
              type="text"
              value={goods ? goods.description : ''}
            />
          </div>
          <div className="col-lg-3 mb-2">
            <InputField
              onChange={event => onGoodsChange(event, index)}
              name="weight"
              label="Total mass of goods"
              placeholder="total mass"
              type="text"
              value={goods ? goods.weight : ''}
            />
          </div>
          <div className="col-lg-3 mb-2">
            <InputField
              onChange={event => onGoodsChange(event, index)}
              name="volume"
              label="Total volume"
              placeholder="volume"
              type="text"
              value={goods ? goods.volume : ''}
            />
          </div>
        </div>
      </div>
    );
  }
}
