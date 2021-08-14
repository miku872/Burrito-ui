import { Component } from 'react';
import React from 'react';
import SelectStrategiesToCompare from './compare/select_strategies_dropdown';
import SearchInstrumentForIndicators from './technicals/search_instrument_for_indicators';
import CompareButton from './compare/compare_button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AlertPopUp from './alerts/alert';

function createData(name, OverallReturns, AnnualizedReturns) {
  return { name, OverallReturns, AnnualizedReturns};
}

class ComparisonPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strategies : [],
      instruments : [],
      results : [],
      showResultPanel : false,
      responseReceived : false,
      severity : "",
      alertMessage : "",
    }
    this.requestedComparison = this.requestedComparison.bind(this);
    this.instrumentSelected = this.instrumentSelected.bind(this);
    this.instrumentDeleted = this.instrumentDeleted.bind(this);
    this.strategySelected = this.strategySelected.bind(this);
    this.strategyDeleted = this.strategyDeleted.bind(this);
  };

  async requestedComparison () {
    var results = []
    await this.setState({responseReceived:false}, () => {
     fetch("http://127.0.0.1:5000/compare/?apiProvider="+this.props.apiProvider+"&strategies="+this.state.strategies+"&instruments="+this.state.instruments,  {
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
      .then(data=>data.result.map((row) => (
        results.push(createData(row.name, row.OverallReturns, row.AnnualizedReturns))
      ))).then(() =>this.setState({results:results, showResultPanel : true}))
      .catch(error => {
        console.error(error);
        this.setState({
          responseReceived:true,
          severity: "error",
          alertMessage: "There was an error while getting technicals data" });
      });
  })};

  async instrumentSelected (instrument) {
    var  vals = this.state.instruments.slice();
    vals.push(instrument)
    await this.setState({instruments:vals});
  };

  async instrumentDeleted (instruments) {
    var  vals = [];
    await this.setState({instruments:[]}, () => {
      for (var i = 0, l = instruments.length; i < l; i++) {
        vals.push(instruments[i].key)
      }
    });
    await this.setState({instruments:vals});
  };

  async strategySelected (strategy) {
    var  vals = this.state.strategies.slice();
    vals.push(strategy)
    await this.setState({strategies:vals});
  };

  async strategyDeleted (strategies) {
    var  vals = [];
    await this.setState({strategies:[]}, () => {
      for (var i = 0, l = strategies.length; i < l; i++) {
        vals.push(strategies[i].key)
      }
    });
    await this.setState({strategies:vals});
  };

  render() {
    return (
      <div className = "outer-box">
        <h2>Compare Strategies</h2>
        <div className="box">
          <div className = "selection-row">
            <SelectStrategiesToCompare onStrategySelection={this.strategySelected} onStrategyDeletion={this.strategyDeleted}/>
            <SearchInstrumentForIndicators id = "compare" onInstrumentSelection={this.instrumentSelected} onInstrumentDeletion={this.instrumentDeleted}/>
            <CompareButton req = {this.requestedComparison} />
          </div>
          <div>
            {
              this.state.responseReceived && ( <AlertPopUp isOpen = {true} severity={this.state.severity} alertMessage={this.state.alertMessage}/>)
            }
          </div>
          {
            this.state.showResultPanel && (
          <div>
            <TableContainer component={Paper}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Strategy</TableCell>
                    <TableCell align="center">Overall Returns(%)</TableCell>
                    <TableCell align="center">Annualized Returns(%)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {this.state.results.map((row) => (
                    <TableRow key={row.name}>
                     <TableCell component="th" scope="row">
                       {row.name}
                     </TableCell>
                     <TableCell align="center">{row.OverallReturns}</TableCell>
                     <TableCell align="center">{row.AnnualizedReturns}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
        </div>
      </div>
    );
  };
}

export default ComparisonPanel;
