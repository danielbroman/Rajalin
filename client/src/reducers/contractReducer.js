import {
  GET_USER_CONTRACTS,
  GET_ALL_CONTRACTS,
  GET_CONTRACT,
  CREATE_CONTRACT,
  CREATE_GOODS
} from '../actions/types';

const initialState = {
  isLoading: true,
  contracts: [],
  userContracts: [],
  singleContract: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_CONTRACTS:
      return {
        ...state,
        userContracts: action.payload,
        isLoading: false
      };
    case GET_ALL_CONTRACTS:
      return {
        ...state,
        contracts: action.payload,
        isLoading: false
      };
    case GET_CONTRACT:
      return {
        ...state,
        singleContract: action.payload,
        isLoading: false
      };
    case CREATE_CONTRACT:
      return {
        ...state,
        singleContract: action.payload
      };
    case CREATE_GOODS: {
      const theGoods = Object.assign({}, state.singleContract);
      theGoods.goods = action.payload;
      return {
        ...state,
        singleContract: { theGoods }
      };
    }
    default:
      return state;
  }
}
