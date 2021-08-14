import React, {useState} from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';

const instruments = [
  { label: 'ADANIPORTS', value : 'ADANIPORTS'},
  { label: 'ASIANPAINT', value : 'ASIANPAINT'},
  { label: 'AXISBANK', value : 'AXISBANK'},
  { label: 'BAJAJ-AUTO', value : 'BAJAJ-AUTO'},
  { label: 'BAJFINANCE', value : 'BAJFINANCE'},
  { label: 'BAJAJFINSV', value : 'BAJAJFINSV'},
  { label: 'BPCL', value : 'BPCL'},
  { label: 'BHARTIARTL', value : 'BHARTIARTL'},
  { label: 'BRITANNIA', value : 'BRITANNIA'},
  { label: 'CIPLA', value : 'CIPLA'},
  { label: 'COALINDIA', value : 'COALINDIA'},
  { label: 'DIVISLAB', value : 'DIVISLAB'},
  { label: 'DRREDDY', value : 'DRREDDY'},
  { label: 'EICHERMOT', value : 'EICHERMOT'},
  { label: 'GRASIM', value : 'GRASIM'},
  { label: 'HCLTECH', value : 'HCLTECH'},
  { label: 'HDFCBANK', value : 'HDFCBANK'},
  { label: 'HDFCLIFE', value : 'HDFCLIFE'},
  { label: 'HEROMOTOCO', value : 'HEROMOTOCO'},
  { label: 'HINDALCO', value : 'HINDALCO'},
  { label: 'HINDUNILVR', value : 'HINDUNILVR'},
  { label: 'HDFC', value : 'HDFC'},
  { label: 'ICICIBANK', value : 'ICICIBANK'},
  { label: 'ITC', value : 'ITC'},
  { label: 'IOC', value : 'IOC'},
  { label: 'INDUSINDBK', value : 'INDUSINDBK'},
  { label: 'INFY', value : 'INFY'},
  { label: 'JSWSTEEL', value : 'JSWSTEEL'},
  { label: 'KOTAKBANK', value : 'KOTAKBANK'},
  { label: 'LT', value : 'LT'},
  { label: 'M&M', value : 'M&M'},
  { label: 'MARUTI', value : 'MARUTI'},
  { label: 'NTPC', value : 'NTPC'},
  { label: 'NESTLEIND', value : 'NESTLEIND'},
  { label: 'ONGC', value : 'ONGC'},
  { label: 'POWERGRID', value : 'POWERGRID'},
  { label: 'RELIANCE', value : 'RELIANCE'},
  { label: 'SBILIFE', value : 'SBILIFE'},
  { label: 'SHREECEM', value : 'SHREECEM'},
  { label: 'SBIN', value : 'SBIN'},
  { label: 'SUNPHARMA', value : 'SUNPHARMA'},
  { label: 'TCS', value : 'TCS'},
  { label: 'TATACONSUM', value : 'TATACONSUM'},
  { label: 'TATAMOTORS', value : 'TATAMOTORS'},
  { label: 'TATASTEEL', value : 'TATASTEEL'},
  { label: 'TECHM', value : 'TECHM'},
  { label: 'TITAN', value : 'TITAN'},
  { label: 'UPL', value : 'UPL'},
  { label: 'ULTRACEMCO', value : 'ULTRACEMCO'},
  { label: 'WIPRO', value : 'WIPRO'},
]

const SearchInstrument = (props) => {

  const [selectedValue, setSelectedValue] = useState("");

  // handle onChange event of the dropdown
  const handleChange = e => {
    props.onInstrumentSelection(e.value);
    setSelectedValue(e.value);
  }

  return (
    <div className="search-bar">
      <Select id="backtest-stocks" value={instruments.find(obj => obj.value === selectedValue)}
        onChange={handleChange} options={instruments} placeholder="Stocks"/>
    </div>
  );
}



export default SearchInstrument;
