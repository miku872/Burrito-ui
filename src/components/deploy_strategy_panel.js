import { Component } from 'react';
import React, { useState } from "react";
import SearchInstrumentForStrategy from './deploy/search_instrument_for_strategy';
import SelectDeployStrategyDropDown from './deploy/select_deploy_strategy_dropdown';
import AddStrategyButton from "./deploy/add_strategy_button";
import RemoveStrategyButton from './deploy/remove_strategy_button';
import DeployButton from './deploy/deploy_button';

const _ = require('lodash');

const Panel = ({ id, selectedStocks, selectedStrategy, onRemove, onAdd, onStockSelection, onStockDeletion, onStrategySelection}) => {
  return (
    <div className = "box">
          <div className="selection-row">
            <div className="even-row" >
              {console.log("rendering panel")}
              {console.log(id, selectedStocks, selectedStrategy)}
              <SearchInstrumentForStrategy 
                id = {id}
                selectedValues={selectedStocks}
                onInstrumentSelection={onStockSelection} 
                onInstrumentDeletion={onStockDeletion}/>
              <SelectDeployStrategyDropDown 
                id = {id}
                selections={selectedStrategy}
                onStrategySelection={onStrategySelection}/>
              <AddStrategyButton id = {id} onAddRequest = {onAdd}/>
              <RemoveStrategyButton id = {id} onDeleteRequest = {onRemove} />
              <br />
              <br />
              {/* Selected items: {panel.selectedItems.join(", ")} */}
            </div>
          </div>
        </div>
  );
};

class DeployStrategyPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panels: [{ id: 0, selectedStocks : [], selectedStrategy : null }],
      responseReceived : false
    };
    this.selectionMade = this.selectionMade.bind(this);
    this.instrumentSelected = this.instrumentSelected.bind(this);
    this.instrumentDeleted = this.instrumentDeleted.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  };

  async instrumentSelected (idx, instrument) {
    // console.log(idx, this.state)
    var panels = _.cloneDeep(this.state.panels);
    var panel = panels[idx];
    var instruments = panel.selectedStocks;
    instruments.push(instrument);
    // console.log(panels)
    await this.setState({panels : panels}, () => {console.log(this.state)});
  };

  async instrumentDeleted (index, instruments) {
    console.log(this.state)
    const vals = [];
    for (var i = 0, l = instruments.length; i < l; i++) {
      vals.push(instruments[i].key);
    }
    var panels = _.cloneDeep(this.state.panels);
    var panel = panels[index];
    panel.selectedStocks = vals;
    panels[index] = panel
    await this.setState({panels : panels}, () => {console.log(this.state)});
  };

  async selectionMade(index, term) {
    // console.log(index, term);
    var panels = _.cloneDeep(this.state.panels);
    var panel = panels[index];
    panel.selectedStrategy = term;
    panels[index] = panel;
    // console.log(panels)
    await this.setState({panels : panels}, () => {console.log(this.state)});
  };

  async handleAddClick () {
    await this.setState(prevState => ({
      panels: [...prevState.panels, { id: prevState.panels.length, selectedStocks : [], selectedStrategy : null }]
    }));
  };

  async handleDeleteClick(idx) {
    //fix it
    var length = this.state.panels.length;
    if(length==1){
      console.log("haha");
    } else {
      var panels = _.cloneDeep(this.state.panels);
      panels.splice(idx, 1)
      console.log(panels);
      for(var i = 0; i< panels.length; i++) {
        panels[idx].id=i;
      }
      console.log(panels);
      await this.setState({panels : panels}, () => {console.log(this.state)});
    }
  };

  
    

  render() {
    return (
      <div className = "outer-box">
      <h2>Deploy Strategy Panel</h2>
        {console.log("rendering box" ,this.state)}
        <DeployButton id = "deploy_button" apiProvider = {this.props.apiProvider} stratagies = {this.state.panels}/>
        {this.state.panels.map((panel) => (
          <Panel 
          key = {panel.id} 
          id = {panel.id}
          selectedStocks = {panel.selectedStocks}
          selectedStrategy = {panel.selectedStrategy}
          onStockSelection = {this.instrumentSelected} 
          onStockDeletion = {this.instrumentDeleted}
          onStrategySelection = {this.selectionMade}
          onAdd={this.handleAddClick} 
          onRemove={this.handleDeleteClick} />
        ))}
        <br />
      </div>
      
    );
  };
}

export default DeployStrategyPanel;
