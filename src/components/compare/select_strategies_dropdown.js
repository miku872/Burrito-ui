import React, {useState} from 'react';
import { Multiselect } from "multiselect-react-dropdown";

const strategyOptions = [
  { key: "CPCross50DayMA", value : "CPCross50DayMA"},
  { key: "20DayMACrossOver50DayMA", value: "20DayMACrossOver50DayMA"},
  { key: "5DayMACrossOver20DayMA", value: "5DayMACrossOver20DayMA"},
]

const SelectStrategiesToCompare = (props) => {

  const [selectedValues, setSelectedValues] = useState([]);

  const onSelect =  (selectedList, selectedItem) => {
    props.onStrategySelection(selectedItem.key);
    var prevState = selectedValues;
    prevState.push(selectedItem.key);
    setSelectedValues(prevState);
  }

  const onRemove = (selectedList, removedItem) => {
    props.onStrategyDeletion(selectedList);
    setSelectedValues(selectedList)
  }

  return (
    <div style={{"width" : "30%"}}>
    <form>
      <Multiselect
        id="compare-strategies"
        options={strategyOptions}
        displayValue="key"
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        placeholder="Strategies"
      />
    </form>
    </div>
  );
}
export default SelectStrategiesToCompare;
