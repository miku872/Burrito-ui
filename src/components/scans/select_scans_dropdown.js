import React, {useState} from 'react';
import { Multiselect } from "multiselect-react-dropdown";

const scanOptions = [
  { key: "Hammer", value : "Hammer"},
  { key: "ReverseHammer", value: "ReverseHammer"},
  { key: "BullishInsideBar", value: "BullishInsideBar"},
  { key: "BullishEngulfing", value: "BullishEngulfing"},
  { key: "20DaySMACross50DaySMAFromBelow", value: "20DaySMACross50DaySMAFromBelow"},
  { key: "100DaySMACross200DaySMAFromBelow", value: "100DaySMACross200DaySMAFromBelow"},
  { key: "50DaySMACross200DaySMAFromBelow", value: "50DaySMACross200DaySMAFromBelow"},
  { key: "20DaySMACross50DaySMAFromAbove", value: "20DaySMACross50DaySMAFromAbove"},
  { key: "50DaySMACross100DaySMAFromAbove", value: "50DaySMACross100DaySMAFromAbove"},
  { key: "50DaySMACross200DaySMAFromAbove", value: "50DaySMACross200DaySMAFromAbove"},
  { key: "20DaySMACross200DaySMAFromAbove", value: "20DaySMACross200DaySMAFromAbove"},
  { key: "5DaySMACross20DaySMAFromAbove", value: "5DaySMACross20DaySMAFromAbove"},
  { key: "5DaySMACross20DaySMAFromBelow", value: "5DaySMACross20DaySMAFromBelow"},
]

const SelectScansToRun = (props) => {

  const [selectedValues, setSelectedValues] = useState([]);

  const onSelect =  (selectedList, selectedItem) => {
    props.onScanSelection(selectedItem.value);
    var prevState = selectedValues;
    prevState.push(selectedItem);
    setSelectedValues(prevState);
  }

  const onRemove = (selectedList, removedItem) => {
    props.onScanDeletion(selectedList);
    setSelectedValues(selectedList)
  }

  return (
    <div style={{"width" : "30%"}}>
    <form>
      <Multiselect
        id = "scans"
        options={scanOptions}
        displayValue="key"
        selectedValues={selectedValues}
        onSelect={onSelect}
        onRemove={onRemove}
        placeholder="scans"
      />
    </form>
    </div>
  );
}
export default SelectScansToRun;
