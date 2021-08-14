import { Component } from 'react';
import React from 'react';
import SelectStrategyDropDown from './backtest/select_strategy_dropdown';
import BackTestButton from './backtest/backtest_button';
import SearchInstrument from './backtest/search_instrument';
import BackTestResultPanel from './backtest/backtest_result_panel'
import AlertPopUp from './alerts/alert';

class BackTestPanel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      strategy : null,
      instrument : null,
      result : null,
      showResultPanel : false,
      responseReceived : false,
      severity : "",
      alertMessage : "",
    }
    this.selectionMade = this.selectionMade.bind(this);
    this.instrumentSelected = this.instrumentSelected.bind(this);
    this.requestedBacktest = this.requestedBacktest.bind(this);
  }

  async instrumentSelected (instrument) {
    await this.setState({instrument:instrument});
  };

  async selectionMade(term) {
    await this.setState({strategy:term});
  }

  async requestedBacktest () {
    await this.setState({responseReceived:false}, () => {
    fetch("http://127.0.0.1:5000/runBacktest?apiProvider="+this.props.apiProvider +"&instrument="+this.state.instrument+"&strategy=" + this.state.strategy,  {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    }).then(response => {
        if(!response.ok) {
          throw new Error(response.status);
        } else {
          return response.json();
        }
      })
      .then((data) => this.setState({result:data.returns,showResultPanel : true}))
      .catch(error => {
        console.error(error);
        this.setState({
          responseReceived:true,
          severity: "error",
          alertMessage: "There was an error while getting technicals data" });
      });
  });
}

  render() {
    return (
      <div className = "outer-box">
        <h2>Backtest Panel</h2>
        <div className = "box">
          <div className="selection-row">
            <div className="even-row">
              <SearchInstrument onInstrumentSelection={this.instrumentSelected}/>
              <SelectStrategyDropDown onStrategySelection={this.selectionMade}/>
            </div>
            <BackTestButton req = {this.requestedBacktest}/>
          </div>
          <div>
            {
              this.state.responseReceived && ( <AlertPopUp isOpen = {true} severity={this.state.severity} alertMessage={this.state.alertMessage}/>)
            }
          </div>
          <div>
            {
              this.state.showResultPanel && (
              <BackTestResultPanel result={this.state.result}/> )
            }
          </div>
        </div>
      </div>
    );
  };
}

export default BackTestPanel;
