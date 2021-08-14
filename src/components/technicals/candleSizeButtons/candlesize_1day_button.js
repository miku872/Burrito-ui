const OneDayCandleSizeButton = (props) => {

  const onSelection = () => {
    props.onCandleSelection("DAILY");
  }

  return (
    <div>
      <button className = "button" onClick={onSelection}>1 day</button>
    </div>
  );

}

export default OneDayCandleSizeButton;
