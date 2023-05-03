import React from 'react';
import { handleInputChange } from 'react-select/src/utils';
import Indicator from './Indicator';

class Price extends Indicator {
    constructor(props) {
        super(props);
        this.state = {
          allowed_comparision : ["Numbers", "Price Moving Averages"],
          class : "Price",
          classType : "Price",
          description : "Price of the scrip",
          function_group : "Number",
          name : "price",
          params : ["offset", true, 0, true, "sign", "+"],
          tooltip : "Price of the scrip n days back",
          details : ["offset", null]
        }
    }
    
    handleInputChange = e => {
        this.setState({details : ["offset", e]})
    }
    
    render() {
        return (
            <div className="indicator-box">
                offset
                {<div className="select-offset">
                    <input 
                        style={BarStyling}
                        key="offset"
                        value={keyword}
                        placeholder={"search country"}
                        onChange={(e) => this.handleInputChange(e.target.value)}
                    />
                </div>}
            </div>
        )
    }
}