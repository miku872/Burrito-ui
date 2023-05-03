const RemoveStrategyButton = (props) => {

    const onClickEvent = () => {
      console.log("clicked");
      props.onDeleteRequest(props.id);
    };
  
    return (
      <div>
        <button className = "button" onClick={event => onClickEvent()}>Remove</button>
      </div>
    );
  }
  
  export default RemoveStrategyButton;