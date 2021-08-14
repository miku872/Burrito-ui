import { Component } from 'react';
import React from 'react';
import CandleSizeButtonsPanel from './technicals/candleSize_button_group';
import SearchInstrumentForIndicators from './technicals/search_instrument_for_indicators';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AlertPopUp from './alerts/alert';

function createData(name, SMA, EMA, RSI, MACD) {
  return { name, SMA, EMA, RSI, MACD };
}
class TechnicalsPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instruments : [],
      rows : [],
      candleSize : [],
      responseReceived : false,
      severity : "",
      alertMessage : "",
    }
    this.selectionMade = this.selectionMade.bind(this);
    this.instrumentSelected = this.instrumentSelected.bind(this);
    this.instrumentDeleted = this.instrumentDeleted.bind(this);
  };

  async selectionMade (candleSize) {
    var responseConverted = []
    await this.setState({responseReceived:false}, () => {
    fetch("http://127.0.0.1:5000/getTechnicals?apiProvider="+this.props.apiProvider+"&instruments="+this.state.instruments+"&candleSize="+candleSize,  {
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
      }).then(data=>data.result.map((row) => (responseConverted.push(createData(row.instrument, row.sma,row.ema,row.rsi,row.macd)))))
      .then(() => this.setState({rows:responseConverted}))
      .catch(error => {
        console.error(error);
        this.setState({
          responseReceived:true,
          severity: "error",
          alertMessage: "There was an error while getting technicals data" });
      });
  })
};

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

  render() {
    return (
      <div className = "outer-box">
        <h2 >Technical Panel</h2>
        <div className="box">
          <div className = "selection-row">
            <SearchInstrumentForIndicators id = "technicals" onInstrumentSelection={this.instrumentSelected} onInstrumentDeletion={this.instrumentDeleted}/>
            <CandleSizeButtonsPanel onCandleSelection={this.selectionMade}/>
          </div>
          <div>
            {
              this.state.responseReceived && ( <AlertPopUp isOpen = {true} severity={this.state.severity} alertMessage={this.state.alertMessage}/>)
            }
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table  aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Instrument</TableCell>
                    <TableCell align="center">SMA(20)</TableCell>
                    <TableCell align="center">EMA(20)</TableCell>
                    <TableCell align="center">RSI(14)</TableCell>
                    <TableCell align="center">MACD</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody >
                  {this.state.rows.map((row) => (
                    <TableRow key={row.name}>
                     <TableCell component="th" scope="row">
                       {row.name}
                     </TableCell>
                     <TableCell align="center">{row.SMA}</TableCell>
                     <TableCell align="center">{row.EMA}</TableCell>
                     <TableCell align="center">{row.RSI}</TableCell>
                     <TableCell align="center">{row.MACD}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    );
  };
}

export default TechnicalsPanel;
