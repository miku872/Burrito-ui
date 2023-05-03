import { Component } from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import UpdateData from './components/update_data_button';
import ScanPanel from './components/scans_panel';
import BackTestPanel from './components/backtest_panel';
import TechnicalsPanel from './components/technicals_panel';
import ComparisonPanel from './components/comparison_panel';
import Header from './components/header';
import DeployStrategyPanel from './components/deploy_strategy_panel';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {apiProvider : null}
    this.setAPIProvider = this.setAPIProvider.bind(this);
  }


  async setAPIProvider (apiProvider) {
    console.log("main app");
    await this.setState({apiProvider})
    console.log(apiProvider);
  }

  render() {
    return (
      <div className = "root">
        <Header setAPIProvider={this.setAPIProvider}/>
        <div className = "content">
          <UpdateData  apiProvider={this.state.apiProvider}/>
          <ScanPanel apiProvider={this.state.apiProvider}/>
          <TechnicalsPanel apiProvider={this.state.apiProvider}/>
          <BackTestPanel apiProvider={this.state.apiProvider}/>
          <ComparisonPanel apiProvider={this.state.apiProvider}/>
          <DeployStrategyPanel apiProvider={this.state.apiProvider}/>
        </div>
      </div>
    );
  };
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
