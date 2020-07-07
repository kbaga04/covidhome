import React from 'react';
import './App.css';
import { Navbar } from './Components';
import GlobalStyle from '../src/Components/styles/Global';

class App extends React.Component {
  state = {
    navbarOpen: false,
  };

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  render() {
    return (
      <>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
        />
        <GlobalStyle />
      </>
    );
  }
}

export default App;
