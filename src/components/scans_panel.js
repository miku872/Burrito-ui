import { Component } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import SelectScansToRun from './scans/select_scans_dropdown';
import SearchInstrumentForIndicators from './technicals/search_instrument_for_indicators';
import ScanButton from './scans/scan_button';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AlertPopUp from './alerts/alert';


function createData(name, passedSymbols) {
  return { name, passedSymbols };
};

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string.isRequired,
    passedSymbols: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {row.name}  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  {row.passedSymbols.map((historyRow) => (
                      <TableRow component="th" scope="row">
                        <p style = {{color: 'Green'}}> {historyRow} </p>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

class ScanPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scans : [],
      instruments : [],
      results : [],
      showResultPanel : false,
      responseReceived : false,
      severity : "",
      alertMessage : "",
    }
    this.requestedScan = this.requestedScan.bind(this);
    this.instrumentSelected = this.instrumentSelected.bind(this);
    this.instrumentDeleted = this.instrumentDeleted.bind(this);
    this.scanSelected = this.scanSelected.bind(this);
    this.scanDeleted = this.scanDeleted.bind(this);
  };

  async requestedScan () {
    var results = []
    await this.setState({responseReceived:false}, () => {
      fetch("http://127.0.0.1:5000/runScan/?apiProvider="+this.props.apiProvider+"&scanners="+this.state.scans+"&instruments="+this.state.instruments,  {
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
        }})
        .then(data=>data.result.map((row) =>
          (results.push(createData(row.name, row.passedSymbols)))))
        .then(() => this.setState({results:results, showResultPanel : true}))
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

  async scanSelected (scan) {
    console.log(scan);
    var  vals = this.state.scans.slice();
    vals.push(scan)
    await this.setState({scans:vals});
  };

  async scanDeleted (scans) {
    var  vals = [];
    await this.setState({scans:[]}, () => {
      for (var i = 0, l = scans.length; i < l; i++) {
        vals.push(scans[i].value)
      }
    });
    await this.setState({scans:vals});
  };

  componentDidMount() {
    if(this.state.scans.lenth===0){
      this.setState({showResultPanel:false})
    }
  }

  render() {
    return (
      <div className = "outer-box">
        <h2>Scans</h2>
        <div className="box">
          <div className = "selection-row">
            <SelectScansToRun onScanSelection={this.scanSelected} onScanDeletion={this.scanDeleted}/>
            <SearchInstrumentForIndicators id = "scan" onInstrumentSelection={this.instrumentSelected} onInstrumentDeletion={this.instrumentDeleted}/>
            <ScanButton req = {this.requestedScan} />
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
                  </TableRow>
                </TableHead>
                <TableBody >
                  {this.state.results.map((row) => (
                    <Row key={row.name} row = {row} />
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

export default ScanPanel;
