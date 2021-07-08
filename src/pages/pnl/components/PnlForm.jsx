import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPnlParams, updateDirection } from '../../stores/actions';
import { isFullParams } from '../../../helpers/filter/index';
import { LOSS_RATE } from '../../../constants';

const PnlForm = () => {
  const [direction, setDirection] = useState(1);
  const [value, setValue] = useState({
    leverage: 20,
    margin: '',
    entry: '',
    profitable: '',
    stoploss: ''
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
    let newLeverage = (+inputVal !== +value.entry) ? 
                      (Math.round(newLossProfit / (+value.margin * +value.entry * (1 / +inputVal - 1 / +value.entry)))) :
                      value.leverage;
    setValue({
      ...value,
      leverage: Math.abs(newLeverage),
      stoploss: inputVal
    });
  }

  useEffect(() => {
    if (isFullParams(value) || (isFullParams(value) && !!value.stoploss)) {
      dispatch(addPnlParams(value));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(updateDirection(direction)); 
  }, [direction]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="pnl-form">
      <div className="btn-wrapper row f-center-x">
        <button name='long' onClick={(e) => handleClick(e)} className={`btn col-sm-5 ${!!direction && 'btn-primary'}`} type="button">Long</button>
        <button name='short' onClick={(e) => handleClick(e)} className={`btn col-sm-5 ${!direction && 'btn-danger'}`} type="button">Short</button>
      </div>
      <div className='leverage-slider'>
        <input value={value.leverage} name="leverage" type="range" min="1" max="125" step="1" onChange={(e) => handleChange(e)} />
      </div>
      <form>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="leverage">Leverage</label>
          <input placeholder="Enter Leverage" value={value.leverage} type="text" name="leverage" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="margin">Margin</label>
          <input placeholder="Enter Margin" value={value.margin} type="text" name="margin" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="entry">Entry Price</label>
          <input placeholder="Enter the Entry Price" value={value.entry} type="text" name="entry" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="profitable">Profitable Price</label>
          <input placeholder="Enter the Profitable Price" value={value.profitable} type="text" name="profitable" onChange={(e) => handleChange(e)} />
        </div>
        <div className="form-input-item f-row f-center-x">
          <label htmlFor="stoploss">Stoploss Price</label>
          <input placeholder="Enter the Stoploss Price" value={value.stoploss} type="text" name="stoploss" onChange={(e) => handleLossChange(e)} />
        </div>
      </form>
    </div>
  )
}

export default PnlForm;
