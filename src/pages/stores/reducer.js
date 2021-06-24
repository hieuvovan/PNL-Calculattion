import * as types from './types';

const initialState = {
  pnlParams: {
    leverage: 20,
    margin: 0, 
    opening: 0, 
    closing: 0,
    loss: 0
  },
  direction: 1
}

const pnlReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PNL_PARAMS:
      return {
        ...state,
        pnlParams: {
          leverage: action.payload.leverage,
          margin: +action.payload.margin,
          opening: +action.payload.opening,
          closing: +action.payload.closing,
          loss: +action.payload.loss
        }
      }
    
    case types.UPDATE_PARAMS:
      return {
        ...state,
        pnlParams : {
          ...state.pnlParams,
          leverage: action.payload
        }
      }

    case types.UPDATES_DIRECTION: 
      return {
        ...state,
        direction: action.payload
      }

    default:
      return state
  }
}

export default pnlReducer;
