import React from 'react';
import OneMinuteCandleSizeButton from './candleSizeButtons/candlesize_1min_button';
import FiveMinuteCandleSizeButton from './candleSizeButtons/candlesize_5min_button';
import FifteenMinuteCandleSizeButton from './candleSizeButtons/candlesize_15min_button';
import OneHourCandleSizeButton from './candleSizeButtons/candlesize_1hr_button';
import OneDayCandleSizeButton from './candleSizeButtons/candlesize_1day_button';

const CandleSizeButtonsPanel = (props) => {
  return (
    <div className="buttons-row">
      <OneMinuteCandleSizeButton onCandleSelection={props.onCandleSelection}/>
      <FiveMinuteCandleSizeButton onCandleSelection={props.onCandleSelection}/>
      <FifteenMinuteCandleSizeButton onCandleSelection={props.onCandleSelection}/>
      <OneHourCandleSizeButton onCandleSelection={props.onCandleSelection}/>
      <OneDayCandleSizeButton onCandleSelection={props.onCandleSelection}/>
    </div>
  );
}

  export default CandleSizeButtonsPanel;
