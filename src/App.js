import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/Logo/logo'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation />
        <Logo />
      </div>
    );
  }
}

export default App;
