import * as types from './types';

const initialState = {
  pnlParams: {
    leverage: 20,
    margin: 0, 
    entry: 0, 
    profitable: 0,
    stoploss: 0
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
          entry: +action.payload.entry,
          profitable: +action.payload.profitable,
          stoploss: +action.payload.stoploss
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
