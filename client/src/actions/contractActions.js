import axios from 'axios';

import {
  GET_USER_CONTRACTS,
  GET_ALL_CONTRACTS,
  GET_CONTRACT,
  CREATE_CONTRACT,
  CREATE_GOODS,
  GET_ERRORS
} from './types';

export const getUserContracts = userId => dispatch => {
  axios
    .get(`/api/contracts/user/${userId}`)
    .then(res => {
      dispatch({
        type: GET_USER_CONTRACTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getAllContracts = () => dispatch => {
  axios
    .get('/api/contracts/all')
    .then(res => {
      dispatch({
        type: GET_ALL_CONTRACTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const getContract = contractid => dispatch => {
  axios
    .get(`/api/contracts/${contractid}`)
    .then(res => {
      dispatch({
        type: GET_CONTRACT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

function runPromisesInSequence(promises, history, id) {
  promises.forEach(async promise => {
    await promise();
  });
  history.push(`/contract/${id}`);
}

export const createContract = (
  contractData,
  goodsData,
  history
) => dispatch => {
  axios
    .post(`/api/contracts`, contractData)
    .then(res => {
      dispatch({
        type: CREATE_CONTRACT,
        payload: res.data
      });

      if (
        goodsData.amount !== '' &&
        goodsData.description !== '' &&
        goodsData.weight !== '' &&
        goodsData.volume !== ''
      ) {
        const goodsCalls = [];
        goodsData.forEach((goodsRow, index) => {
          const goodsItem = Object.assign({}, goodsRow);
          goodsItem.id = res.data._id;
          goodsCalls.push(
            $ =>
              new Promise((resolve, reject) => {
                axios
                  .post(`/api/contracts/goods`, goodsRow)
                  .then(response => {
                    resolve(
                      dispatch({
                        type: CREATE_GOODS,
                        payload: response.data
                      })
                    );
                  })
                  .catch(err => {
                    reject(err);
                  });
              })
          );
        });
        runPromisesInSequence(goodsCalls, history, res.data._id);
      } else {
        history.push(`/contract/${res.data._id}`);
      }
    })
    .catch(err => console.error(err));
};

export const editContract = (contractId, userId) => dispatch => {
  // Check if driver is the creator of the contract or an admin
  // Make axios call
  axios
    .put(`/api/contracts/${contractId}`, { data: { driverId: userId } })
    .then(() => {})
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const deleteContract = (contractId, userId, history) => dispatch => {
  // Check if driver is the creator of the contract or an admin
  // Make axios call
  axios
    .delete(`/api/contracts/${contractId}`, { data: { driverId: userId } })
    .then(res => {
      history.push('/');
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
