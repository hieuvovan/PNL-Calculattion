import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPnlParams, updateDirection } from '../../stores/actions';
import { isFullParams } from '../../../helpers/filter/index';
import { LOSS_RATE } from '../../../constants';

const PnlForm = () => {
  const pnlParams = useSelector(state => state.pnlReducer.pnlParams);
  const [direction, setDirection] = useState(1);
  const [value, setValue] = useState({
    leverage: 20,
    margin: '',
    opening: '',
    closing: '',
    loss: ''
  });
  const dispatch = useDispatch();

  const handleClick = (e) => {
    const name = e.target.name;
    const temp = name === 'long' ? 1 : 0;
    setDirection(temp);
  }

  const handleChange = (e) => {
    const inputVal = e.target.value;
    const name = e.target.name;
    setValue({
      ...value,
      [name]: inputVal
    });
  }

  const handleLossChange = (e) => {
    const inputVal = e.target.value;
    let newLossProfit = LOSS_RATE * +value.margin;
    let newLeverage = (+inputVal !== +value.opening) ? 
                      (Math.floor(newLossProfit / (+value.margin * +value.opening * (1 / +inputVal - 1 / +value.opening)))) :
                      value.leverage;
    setValue({
      ...value,
      leverage: newLeverage,
      loss: inputVal
    });
  }

  useEffect(() => {
    if (isFullParams(value) || (isFullParams(value) && !!value.loss)) {
      dispatch(addPnlParams(value));
    }
  }, [value]);

  useEffect(() => {
    dispatch(updateDirection(direction));
  }, [direction]);

  return (
    <div className="pnl-form">
      <div className="btn-wrapper f-row f-center-x">
        <button name='long' onClick={(e) => handleClick(e)} className={`btn ${!!direction && 'btn-primary'}`} type="button">Long</button>
        <button name='short' onClick={(e) => handleClick(e)} className={`btn ${!direction && 'btn-danger'}`} type="button">Short</button>
      </div>
      <div className='leverage-slider'>
        <input value={value.leverage} name="leverage" type="range" min="1" max="125" step="1" onChange={(e) => handleChange(e)} />
      </div>
      <form>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="margin">Margin</label>
          <input placeholder="Enter Margin" value={value.margin} type="text" name="margin" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="opening">Opening Price</label>
          <input placeholder="Enter the Opening Price" value={value.opening} type="text" name="opening" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="closing">Closing Price</label>
          <input placeholder="Enter the Closing Price" value={value.closing} type="text" name="closing" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="loss">Lossing Price</label>
          <input placeholder="Enter the Loss Price" value={value.loss} type="text" name="loss" onChange={(e) => handleLossChange(e)} />
        </div>
      </form>
    </div>
  )
}

export default PnlForm;
