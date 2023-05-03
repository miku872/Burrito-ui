import React,{ useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {styles} from "../../styles/styles";

const strategyOptions = [
  { label: "CPCross50DayMA", value : "CPCross50DayMA"},
  { label: "20DayMACrossOver50DayMA", value: "20DayMACrossOver50DayMA"},
  { label: "5DayMACrossOver20DayMA", value: "5DayMACrossOver20DayMA"},

]

const SelectDeployStrategyDropDown = (props) => {

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState("");

 // handle onChange event of the dropdown
  const handleChange = e => {
    var idx = props.id;
    props.onStrategySelection(idx, e.value);
    setSelectedValue(e.value);
  }

  return (
    <div className="search-bar">
      <Select value={strategyOptions.find(obj => obj.value === selectedValue)}
        onChange={handleChange} options={strategyOptions} placeholder="Strategy"/>
    </div>
  );
}

export default SelectDeployStrategyDropDown
