const CompareButton = (props) => {

  const toggleButtonState = () => {
    console.log("clicked");
    props.req();
  };

  return (
    <div>
      <button className = "button" onClick={event => toggleButtonState()}>Compare</button>
    </div>
  );
}

export default CompareButton;
