import React, { useState } from 'react';
import { Multiselect } from "multiselect-react-dropdown";

const instruments = [
  { key: 'ADANIPORTS'},
  { key: 'ASIANPAINT'},
  { key: 'AXISBANK'},
  { key: 'BAJAJ-AUTO'},
  { key: 'BAJFINANCE'},
  { key: 'BAJAJFINSV'},
  { key: 'BPCL'},
  { key: 'BHARTIARTL'},
  { key: 'BRITANNIA'},
  { key: 'CIPLA'},
  { key: 'COALINDIA'},
  { key: 'DIVISLAB'},
  { key: 'DRREDDY'},
  { key: 'EICHERMOT'},
  { key: 'GRASIM'},
  { key: 'HCLTECH'},
  { key: 'HDFCBANK'},
  { key: 'HDFCLIFE'},
  { key: 'HEROMOTOCO'},
  { key: 'HINDALCO'},
  { key: 'HINDUNILVR'},
  { key: 'HDFC'},
  { key: 'ICICIBANK'},
  { key: 'ITC'},
  { key: 'IOC'},
  { key: 'INDUSINDBK'},
  { key: 'INFY'},
  { key: 'JSWSTEEL'},
  { key: 'KOTAKBANK'},
  { key: 'LT'},
  { key: 'M&M'},
  { key: 'MARUTI'},
  { key: 'NTPC'},
  { key: 'NESTLEIND'},
  { key: 'ONGC'},
  { key: 'POWERGRID'},
  { key: 'RELIANCE'},
  { key: 'SBILIFE'},
  { key: 'SHREECEM'},
  { key: 'SBIN'},
  { key: 'SUNPHARMA'},
  { key: 'TCS'},
  { key: 'TATACONSUM'},
  { key: 'TATAMOTORS'},
  { key: 'TATASTEEL'},
  { key: 'TECHM'},
  { key: 'TITAN'},
  { key: 'UPL'},
  { key: 'ULTRACEMCO'},
  { key: 'WIPRO'},
]

const SearchInstrumentForIndicators = (props) => {

  const [selectedValues, setSelectedValues] = useState([]);

  const onSelect =  (selectedList, selectedItem, id) => {
    props.onInstrumentSelection(selectedItem.key);
    var prevState = selectedValues;
    prevState.push(selectedItem.key);
    setSelectedValues(prevState);
  }

  const onRemove = (selectedList, removedItem) => {
    props.onInstrumentDeletion(selectedList);
    setSelectedValues(selectedList)
  }

  return (
    <div>
    <form>
      <Multiselect
        options={instruments}
        displayValue="key"
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        placeholder="Stocks"
      />
    </form>
    </div>
  );
}

export default SearchInstrumentForIndicators;
