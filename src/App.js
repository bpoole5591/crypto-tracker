import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = { cryptos: [] };
  }

  componentDidMount() {
    axios
      .get(
        'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,LTC,EOS,BNB,XRP,BCH,LINK,OKB&tsyms=USD'
      )
      .then(res => {
        const cryptos = res.data;
        this.setState({ cryptos: cryptos });
        console.log(this.state.cryptos);
      });
  }

  render() {
    const coinNamer = key => {
      let name = 'whatever';
      if (key === 'BTC') {
        name = 'Bitcoin';
      } else if (key === 'ETH') {
        name = 'Ethereum';
      } else if (key === 'ETC') {
        name = 'Ethereum Classic';
      } else if (key === 'LTC') {
        name = 'Litecoin';
      } else if (key === 'EOS') {
        name = 'EOS';
      } else if (key === 'BNB') {
        name = 'Binance Coin';
      } else if (key === 'XRP') {
        name = 'XRP';
      } else if (key === 'BCH') {
        name = 'Bitcoin Cash';
      } else if (key === 'LINK') {
        name = 'Chainlink';
      } else if (key === 'OKB') {
        name = 'Okex';
      }
      return name;
    };
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Cryptocurrency Tracker</h1>
        </header>
        <div className="tracker">
          <div id="crypto-container">
            <span className="left" id="title">
              Name (Symbol)
            </span>
            <span className="right" id="title">
              USD Value
            </span>
          </div>
          {Object.keys(this.state.cryptos).map(key => (
            <div id="crypto-container" key={key}>
              <span className="left">
                {coinNamer(key)} ({key})
              </span>
              <span className="right">
                ${this.state.cryptos[key].USD}
                {/*<NumberFormat
                    value={this.state.cryptos[key].USD}
                    displayType={'text'}
                    decimalPrecision={2}
                    thousandSeparator={true}
                    prefix={'$'}
                  />*/}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
