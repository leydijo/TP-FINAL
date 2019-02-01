import React, { Component } from 'react';


class Header extends Component {
  constructor(prosp){
    super(prosp)
    this.state = {
      home : 0
    }
  }
 
    render() {
      return (
          <header className="color-header">
            <input type="text" placeholder="Nunca dejes de buscar"></input>
          </header>
       
        
      );
    }
  }
  
  export default Header;
  