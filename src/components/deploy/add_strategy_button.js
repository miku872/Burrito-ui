const AddStrategyButton = (props) => {

    const onClickEvent = () => {
      console.log("clicked");
      props.onAddRequest();
    };
  
    return (
      <div>
        <button className = "button" onClick={event => onClickEvent()}>+Add</button>
      </div>
    );
  }
  
  export default AddStrategyButton;