import * as types from './types';

export const addPnlParams = (pnlParams) => ({
  type: types.ADD_PNL_PARAMS,
  payload: pnlParams
});

export const updateParams = (param) => (
  {
    type: types.UPDATE_PARAMS,
    payload: param
  }
);

export const updateDirection = (direction) => ({
  type: types.UPDATES_DIRECTION,
  payload: direction
});
