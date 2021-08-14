const FiveMinuteCandleSizeButton = (props) => {

  const onSelection = () => {
    props.onCandleSelection("FIVE_MINUTE");
  }

  return (
    <div>
      <button className = "button" onClick={onSelection}>5 min</button>
    </div>
  );
}

export default FiveMinuteCandleSizeButton;
