import React from 'react';

const BackTestResultPanel = (props) => {
const headerColor = props.result >= 0? { color: 'green'} : { color: 'red' }
  return (
    <div>
      <h2 className = "header">Backtest Result</h2>
      <div className = "result-panel">
        <span>
        <p id = "backtestResult" style={headerColor}>{props.result}%</p>
        </span>
      </div>
    </div>
  );
};

export default BackTestResultPanel;
