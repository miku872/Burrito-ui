import React,{ useState } from 'react';
import Select from 'react-select';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {styles} from "../../styles/styles";

const operatorOptions = [
  { label: "<", value : "<"},
  { label: ">", value : ">"},
  { label: "<=", value : "<="},
  { label: ">=", value : ">="},
  { label: "=", value : "="},
  { label: "+", value : "+"},
  { label: "-", value : "-"},
  { label: "*", value : "*"},
  { label: "/", value : "/"}
]

const SelectOperatorDropDown = (props) => {

  // set value for default selection
  const [details, setDetails] = useState([]);

 // handle onChange event of the dropdown
  const handleChange = e => {
    props.onOperatorSelection(e.value);
    setDetails(e.value);
  }

  return (
    <div className="search-bar">
      <Select id="select-operator" value={operatorOptions.find(obj => obj.value === selectedValue)}
        onChange={handleChange} options={operatorOptions} placeholder="operator"/>
    </div>
  );
}

export default SelectOperatorDropDown
