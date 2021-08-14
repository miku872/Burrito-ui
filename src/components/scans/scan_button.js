const ScanButton = (props) => {

  const toggleButtonState = () => {
    props.req();
  };

  return (
    <div>
      <button className = "button" onClick={event => toggleButtonState()}>Scan</button>
    </div>
  );
}

export default ScanButton;
