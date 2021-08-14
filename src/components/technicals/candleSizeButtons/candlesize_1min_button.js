const OneMinuteCandleSizeButton = (props) => {

  const onSelection = () => {
    props.onCandleSelection("ONE_MINUTE");
  }

  return (
    <div>
      <button className = "button" onClick={onSelection}>1 min</button>
    </div>
  );
}

export default OneMinuteCandleSizeButton;
