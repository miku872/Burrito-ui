const OneHourCandleSizeButton = (props) => {

  const onSelection = () => {
    props.onCandleSelection("ONE_HOUR");
  }

  return (
    <div>
      <button className = "button" onClick={onSelection}>1 hour</button>
    </div>
  );
}

export default OneHourCandleSizeButton;
