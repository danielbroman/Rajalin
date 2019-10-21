const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContractSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  consignor: {
    type: String,
    required: true
  },
  receiver: {
    type: String
  },
  startDate: {
    type: Date,
    default: Date.now,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  startAddress: {
    type: String,
    required: true
  },
  endAddress: {
    type: String,
    required: true
  },
  driverId: {
    type: String,
    required: true
  },
  goods: [
    {
      amount: {
        type: Number
      },
      description: {
        type: String
      },
      weight: {
        type: Number
      },
      weightUnit: {
        type: String,
        default: "Kg"
      },
      volume: {
        type: String
      },
      volumeUnit: {
        type: String,
        default: "m3"
      }
    }
  ],
  additionalInfo: {
    type: String,
    required: false
  },
  senderSignature: {
    type: Buffer,
    required: false
  },
  driverSignature: {
    type: Buffer,
    required: false
  },
  receiverSignature: {
    type: Buffer,
    required: false
  }
});

module.exports = Contract = mongoose.model("contracts", ContractSchema);
