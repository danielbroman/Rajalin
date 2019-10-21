const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const pdf = require('html-pdf');
const pdfTemplate = require('../../documents/index');

// Load User model
const Contract = require('../../models/Contract');
const User = require('../../models/User');

const validateContractInput = require('../../validation/contract');
const validateGoodsInput = require('../../validation/goods');

// @route   POST api/contracts/getpdf
// @desc    Create pdf from base64
// @access  Private
router.post(
  '/createpdf',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    pdf
      .create(pdfTemplate(req.body), {})
      .toFile('./routes/api/result.pdf', err => {
        if (err) {
          res.send(Promise.reject());
        }

        res.send(Promise.resolve());
      });
  }
);

// @route   GET api/contracts/getpdf
// @desc    Get the pdf
// @access  Private
router.get(
  '/getpdf',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.sendFile('result.pdf', { root: __dirname });
  }
);

// @route   POST api/contracts/
// @desc    Create a new contract
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateContractInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const startDate = Date.now();
    const newContract = new Contract({
      user: req.user.id,
      startDate,
      consignor: req.body.consignor,
      receiver: req.body.receiver,
      endDate: req.body.endDate,
      startAddress: req.body.startAddress,
      endAddress: req.body.endAddress,
      driverId: req.body.driverId,
      additionalInfo: req.body.additionalInfo,
      senderSignature: req.body.senderSignature,
      driverSignature: req.body.driverSignature,
      receiverSignature: req.body.receiverSignature
    });

    newContract.save().then(contract => res.json(contract));
  }
);

// @route   POST api/contracts/goods
// @desc    Add goods
// @access  Private
router.post(
  '/goods',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateGoodsInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    console.log(req.body.id);
    Contract.findById(req.body.id)
      .then(contract => {
        const newGoods = {
          amount: req.body.amount,
          description: req.body.description,
          weight: req.body.weight,
          volume: req.body.volume
        };
        contract.goods.unshift(newGoods);

        contract.save().then(contract => res.json(contract));
      })
      .catch(err => console.error(err));
  }
);

// @route   GET api/contracts/all
// @desc    Get all contracts
// @access  Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    Contract.find()
      .populate('contract', [
        'startDate',
        'endDate',
        'startAddres',
        'endAddress',
        'consignor',
        'receiver',
        'driverId',
        'additionalInfo'
      ])
      .then(contracts => {
        if (!contracts) {
          errors.nocontracts = 'There are no contracts';
          return res.status(404).json(errors);
        }

        res.json(contracts);
      })
      .catch(err =>
        res.status(404).json({ contracts: 'There are no contracts' })
      );
  }
);

// @route   GET api/contracts/:id
// @desc    Get a single contract
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Contract.findById(req.params.id)
      .then(contract => res.json(contract))
      .catch(err => {
        res
          .status(404)
          .json({ nocontractfound: 'No Contract with that Id found!' });
      });
  }
);

// @route   GET api/contracts/:user_id
// @desc    Get all contracts of a single user
// @access  Private
router.get(
  '/user/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Contract.find({ user: req.params.user_id })
      .sort({ startDate: -1 })
      .limit(3)
      .populate('contract', [
        'startDate',
        'endDate',
        'startAddres',
        'endAddress',
        'driverId',
        'consignor',
        'receiver',
        'additionalInfo'
      ])
      .then(contract => res.json(contract))
      .catch(err => {
        res
          .status(404)
          .json({ nocontractfound: 'No Contract with that Id found!' });
      });
  }
);

// @route   PUT api/contracts/:id
// @desc    Update a contract
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateContractInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const contractFields = {};

    if (req.body.startDate) contractFields.startDate = req.body.startDate;
    if (req.body.endDate) contractFields.endDate = req.body.endDate;
    if (req.body.startAddress)
      contractFields.startAddress = req.body.startAddress;
    if (req.body.endAddress) contractFields.endAddress = req.body.endAddress;
    if (req.body.driverId) contractFields.driverId = req.body.driverId;
    if (req.body.additionalInfo)
      contractFields.additionalInfo = req.body.additionalInfo;

    Contract.findById(req.params.id)
      .then(contract => {
        if (contract) {
          Contract.findOneAndUpdate(
            { _id: req.params.id },
            { $set: contractFields },
            { new: true }
          ).then(contract => res.json(contract));
        }
      })
      .catch(err =>
        res.status(404).json({ contractnotfound: 'No contract was found' })
      );
  }
);

// @route   DELETE api/contracts/:id
// @desc    Delete a contract
// @access  Private

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Contract.findById(req.params.id).then(contract => {
      if (
        req.user.userRights === 'Admin' ||
        contract.driverId.toString() === req.user.driverId.toString()
      ) {
        contract.remove().then(() => res.json({ success: true }));
      } else {
        return res.status(401).json({
          notauthorized:
            'Only admins and the creator of the contract can delete it.'
        });
      }
    });
  }
);

module.exports = router;
