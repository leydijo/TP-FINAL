import React, { Component } from 'react';
// import Customer from './components/Customers';
import Header from './components/Header';
import LogoAda from './components/LogoAda';

import './Styles.css';



class App extends Component {
  
  render() {
    return (
      <div className="App">
        {/* <Customer /> */}
        <Header />
        <LogoAda />
    
        
      </div>
    );
  }
}

export default App;
