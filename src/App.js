import React, { Component } from 'react';
import logo from './logo.png';
import loader from './loader.gif';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cryptos: [],
      name: '',
      symbol: '',
      price: ''
    };
  }

  componentDidMount() {
    axios
      .get(
        //'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,ETC,LTC,EOS,BNB,XRP,BCH,LINK,OKB&tsyms=USD'
        'https://api.coinmarketcap.com/v1/ticker/?limit=10'
      )
      .then(res => {
        const cryptos = res.data;
        setTimeout(() => {
          this.setState({ cryptos: cryptos });
        }, 1000);
      });
  }

  // Format the currency using a Regular Expression
  // currencyFormat = num => {
  //   return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  // };

  // Format the currency using the ECMAScript Internationalization API
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  createCoin = (name, symbol, price) => {
    const coin = {
      id: name,
      name: name,
      symbol: symbol,
      price_usd: price
    };
    const newState = this.state.cryptos
    newState.push(coin);
    console.log("state:", this.state)
    console.log("newstate:", newState);
    this.setState({ cryptos: newState });
  }

  deleteCoin = coinId => {
    const coins = this.state.cryptos;
    const coinToRemove = coins.find(({ id }) => id === coinId);
    const newCoins = coins.filter(coin => coin !== coinToRemove);
    this.setState({ cryptos: newCoins });
  }

  render() {
    console.log("state:", this.state.cryptos)
    const { name, symbol, price } = this.state;
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
          {this.state.cryptos.length === 0 ? (
            <div className="loading">
              <img src={loader} alt="loader" style={{ width: '30vw' }} />
            </div>
          ) : (
            <div>

                {this.state.cryptos.map(key => (
                  <div id="crypto-container" key={key.symbol}>
                    <div className="left">{key.name} ({key.symbol})</div>
                    <div className="right">{this.formatter.format(key.price_usd)}
                      <button className="btn-trash" onClick={() => this.deleteCoin(key.id)}><i className="fa fa-trash"></i></button>
                      <button className="btn-trash" onClick={() => console.log("edit!")}><i className="fa fa-pencil"></i></button>
                    </div>
                  </div>

                ))}
            </div>
            )}
          <div id="crypto-container">
            <p>Create Your Own Coin!</p>
            <div className="left">
                <input type="text" placeholder="Name" onChange={event => {
                  this.setState({ name: event.target.value });
                }}/>
                <input type="text" placeholder="Symbol" onChange={event => {
                  this.setState({ symbol: event.target.value });
                }}/>
                <input type="text" placeholder="Value" onChange={event => {
                  this.setState({ price: event.target.value });
                }}/>
              <button className="btn-submit" onClick={() => {
                this.createCoin(name, symbol, price);
              }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
