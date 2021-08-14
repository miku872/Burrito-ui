import React,{ useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {styles} from "../../styles/styles";

const providerOptions = [
  { label: "Angel Broking", value : "AngelSmartApi"},
  { label: "Alpha Vantage", value: "AlphaVantage"},
]

const SelectAPIProviderDropDown = (props) => {

  // set value for default selection
  const [selectedValue, setSelectedValue] = useState("");

 // handle onChange event of the dropdown
  const handleChange = e => {
    props.onAPIProviderSelection(e.value);
    setSelectedValue(e.value);
  }

  return (
    <div className="top-search-bar">
      <Select id = "apiProvider" value={providerOptions.find(obj => obj.value === selectedValue)}
        onChange={handleChange} options={providerOptions} placeholder="Api Provider"/>
    </div>
  );
}

export default SelectAPIProviderDropDown
