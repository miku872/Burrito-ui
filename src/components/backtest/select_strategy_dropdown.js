import React,{ useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {styles} from "../../styles/styles";

const strategyOptions = [
  { label: "CPCross50DayMA", value : "CPCross50DayMA"},
  { label: "20DayMACrossOver50DayMA", value: "20DayMACrossOver50DayMA"},
]

const SelectStrategyDropDown = (props) => {

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState("");

 // handle onChange event of the dropdown
  const handleChange = e => {
    props.onStrategySelection(e.value);
    setSelectedValue(e.value);

  }

  return (
    <div className="search-bar">
      <Select id="backtest-strategy" value={strategyOptions.find(obj => obj.value === selectedValue)}
        onChange={handleChange} options={strategyOptions} placeholder="Strategy"/>
    </div>
  );
}

export default SelectStrategyDropDown
