import axios from "axios";
import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AlertPopUp from './../alerts/alert';
import queryString from 'query-string';

const DeployButton = (props) => {
    const [responseReceived, setResponseReceived] = useState(false);
    const [severity, setSeverity] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const deployStrategies = async () => {
        var results = []
        setResponseReceived(false);
        console.log(props.stratagies);
        var data = {
            apiProvider: 'AngelSmartApi',
            strategies: JSON.stringify(props.stratagies)
        };
        var encodedData = queryString.stringify(data);
        console.log(encodedData);
        const response = await axios.post("http://127.0.0.1:5000/deployStrategy/?" + encodedData, {
            headers: {
                "Content-Type": "application/json",
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers" : "Origin, X-Requested-With, Content-Type, Accept"
            }
        }).then(response => {
            if(!response.ok) {
              throw new Error(response.status);
            } else {
              return response.json();
            }})
          .then((data) => {
            setResponseReceived(true);
            setSeverity("success")
            setAlertMessage("strategies deployed!")
          })
          .catch(error => {
            console.error(error);
            setResponseReceived(true);
            setSeverity("error")
            setAlertMessage("There was an error while deploying strategies" + error);
          })
    }
  
    return (
      <div>
        <div>
            {
                responseReceived && ( <AlertPopUp isOpen = {true} severity={severity} alertMessage={alertMessage}/>)
            }
        </div>
        <button className = "button" onClick={event => deployStrategies()}>Deploy</button>
      </div>
    );
  }
  
  export default DeployButton;
  