const BackTestButton = (props) => {

  const toggleButtonState = () => {
    console.log("clicked");
    props.req();
  };

  return (
    <div>
      <button className = "button" onClick={event => toggleButtonState()}>Backtest</button>
    </div>
  );
}

export default BackTestButton;
