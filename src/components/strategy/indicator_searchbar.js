import React,{ useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {styles} from "../../styles/styles";

const strategyOptions = [
  { label: "Price", value : "Price"},
  { label: "20DayMACrossOver50DayMA", value: "20DayMACrossOver50DayMA"},
]

const SelectIndicatorDropDown = (props) => {

  // set value for default selection
  const [details, setDetails] = useState([]);

 // handle onChange event of the dropdown
  const handleChange = e => {
    props.onIndicatorSelection(e.value);
    setSelectedValue(e.value);
  }

  return (
    <div className="search-bar">
      <Select id="select-indicator" value={strategyOptions.find(obj => obj.value === selectedValue)}
        onChange={handleChange} options={strategyOptions} placeholder="indicator"/>
    </div>
  );
}

export default SelectIndicatorDropDown
