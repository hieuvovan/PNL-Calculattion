import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Result = () => {
  const pnlParams = useSelector(state => state.pnlReducer.pnlParams);
  const direction = useSelector(state => state.pnlReducer.direction);
  const { leverage, margin, opening, closing, loss } = pnlParams;


  let pnl = !!direction ? 
            (margin * leverage * opening * (1 / opening - 1 / closing)) :
            (margin * leverage * opening * (1 / closing - 1 / opening));
  let pnlRate = pnl * 100 / margin;

  let lossProfit = !!direction ? 
                  (margin * leverage * opening * (1 / opening - 1 / loss)) :
                  (margin * leverage * opening * (1 / loss - 1 / opening));
  let lossRate = lossProfit * 100 / margin

  return (
    <div className="result-wrapper">
      <h4 className="title txt-center">Result</h4>
      <div className="result f-row f-center-x">
        <p className="result-label">P&L(BTC) :</p>
        <span className={pnl < 0 ? 'danger' : 'ok'}>{pnl ? pnl.toFixed(2) : '--'}</span>
      </div>
      <div className="result f-row f-center-x">
        <p className="result-label">P&L Rate :</p>
        <span className={pnl < 0 ? 'danger' : 'ok'}>{pnlRate ? `${pnlRate.toFixed(2)}%` : '--'}</span>
      </div>
      <div className="result f-row f-center-x">
        <p className="result-label">Loss Profit :</p>
        <span className={lossProfit < 0 ? 'danger' : 'ok'}>{!!loss && lossProfit.toFixed(2)}</span>
      </div>
      <div className="result f-row f-center-x">
        <p className="result-label">Loss Rate :</p>
        <span className={lossRate < 0 ? 'danger' : 'ok'}>{!!loss && lossRate.toFixed(2) + '%'}</span>
      </div>
    </div>
  )
}

export default Result;
