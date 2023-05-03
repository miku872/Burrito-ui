import React,{ useState } from 'react';



const InputNumber = (props) => {

  // set value for default selection
  const [value, setValue] = useState(null);

 // handle onChange event of the dropdown
  const handleInputChange = e => {
    props.onEnteringValue(e.value);
    setValue(e.value);
  }

  return (
    <div className="search-bar">
        <input 
            style={BarStyling}
            key="value"
            value={keyword}
            placeholder={"value"}
            onChange={(e) => this.handleInputChange(e.target.value)}
        />
    </div>
  );
}

export default InputNumber
