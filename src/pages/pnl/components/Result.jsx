import React from 'react';
import { useSelector } from 'react-redux';

export const Result = () => {
  const pnlParams = useSelector(state => state.pnlReducer.pnlParams);
  const direction = useSelector(state => state.pnlReducer.direction);
  const { leverage, margin, entry, profitable, stoploss } = pnlParams;


  let pnl = !!direction ? 
            (margin * leverage * entry * (1 / entry - 1 / profitable)) :
            (margin * leverage * entry * (1 / profitable - 1 / entry));
  let pnlRate = pnl * 100 / margin;

  let lossProfit = !!direction ?
                  (margin * leverage * entry * (1 / entry - 1 / stoploss)) :
                  (margin * leverage * entry * (1 / stoploss - 1 / entry));
  let lossRate = lossProfit * 100 / margin;

  return (
    <div className="result-wrapper">
      <h4 className="title txt-center">Estimated Result</h4>
      <div className="result f-row f-center-x">
        <p className="result-label">Profit:</p>
        <span className={pnl < 0 ? 'danger' : 'ok'}>{pnl ? pnl.toFixed(2) : '--'}</span>
      </div>
      <div className="result f-row f-center-x">
        <p className="result-label">Profit Rate:</p>
        <span className={pnl < 0 ? 'danger' : 'ok'}>{pnlRate ? `${pnlRate.toFixed(2)}%` : '--'}</span>
      </div>
      <div className="result f-row f-center-x">
        <p className="result-label">Loss:</p>
        <span className={lossProfit < 0 ? 'danger' : 'ok'}>{!!stoploss && lossProfit.toFixed(2)}</span>
      </div>
      <div className="result f-row f-center-x">
        <p className="result-label">Loss Rate:</p>
        <span className={lossRate < 0 ? 'danger' : 'ok'}>{!!stoploss && lossRate.toFixed(2) + '%'}</span>
      </div>
    </div>
  )
}

export default Result;
