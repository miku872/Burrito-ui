import React, { useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AlertPopUp from './alerts/alert';

const UpdateData = (props) => {

  const [responseReceived, setResponseReceived] = useState(false);
  const [severity, setSeverity] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = () => {
    setResponseReceived(false);
    fetch("http://127.0.0.1:5000/updateSeries?apiProvider="+props.apiProvider,  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
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
        setAlertMessage("Data Updated!")
      })
      .catch(error => {
        console.error(error);
        setResponseReceived(true);
        setSeverity("error")
        setAlertMessage("There was an error while updating data" + error);
      })
}
  return (
    <div>
      <div>
        {
          responseReceived && ( <AlertPopUp isOpen = {true} severity={severity} alertMessage={alertMessage}/>)
        }
      </div>
      <button className = "button" onClick={handleClick}>Update</button>
      </div>
  );
}

export default UpdateData;
