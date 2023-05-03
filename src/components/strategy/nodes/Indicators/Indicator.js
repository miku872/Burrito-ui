import { Component } from 'react';
import React from 'react';

class Indicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
          allowed_comparision : [],
          class : "",
          classType : "",
          description : "",
          function_group : "",
          name : "",
          params : [],
          tooltip : ""
        }
    }

    render() {
        return (
            <div className="indicator-box">
                {}
            </div>
        )
    }
}