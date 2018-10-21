import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = {
    inputText: '',
    isLoading: false,
    errorMessage: null,
    response: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if(!this.state.inputText) { return; }
    console.log('handleSubmit');
    this.setState({isLoading: true, response: null, errorMessage: null});
    axios.post(
      'https://f2i2maamrj.execute-api.us-east-1.amazonaws.com/default/ReactTestS3DeployEndpoint',
      {
        name: this.state.inputText
      },
      {
        headers: {'Content-Type': 'application/json'}
      }
    )
      .then((response) => {
        this.setState({isLoading: false, response: response.data.message});
        // console.log('-->', response);
      })
      .catch((error) => {
        this.setState({isLoading: false, errorMessage: error.message});
        // console.log('err:', error.message);
      });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <p>
            Edit <code>src/App.js</code> and save to reload.
          </p> */}
          <form onSubmit={this.handleSubmit} style={{zIndex: '1'}}>
            <input type="text" className="name" placeholder="Enter name" onChange={(event) => this.setState({inputText: event.target.value}) } value={this.state.inputText} />
            {this.state.isLoading ? 'Loading...' : <input type="submit" value="Submit" />}
            <div><i style={{color: "red", fontSize: "12px"}}>{this.state.errorMessage}</i></div>
            <hr />
            Message:
            <div className="msg">{this.state.response}</div>
          </form>

        </header>
      </div>
    );
  }
}

export default App;
