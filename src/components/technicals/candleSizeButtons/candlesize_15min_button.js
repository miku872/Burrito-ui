const FifteenMinuteCandleSizeButton = (props) => {

  const onSelection = () => {
    props.onCandleSelection("FIFTEEN_MINUTE");
  }

  return (
    <div>
      <button className = "button" onClick={onSelection}>15 min</button>
    </div>
  );
}

export default FifteenMinuteCandleSizeButton;
