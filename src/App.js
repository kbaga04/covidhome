import React from 'react';
import styles from './App.module.css';
import { Navbar, Cards, ConfirmedTbl, RecoveredTable, DeathsTable, Chart, CountryPicker } from './Components';
import GlobalStyle from '../src/Components/styles/Global';
import { fetchData } from "./api/";

class App extends React.Component {
  state = {
    navbarOpen: false,
    data: {},
    country: "",
  };

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data });
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  };

  render() {
    const { data, country } = this.state;

    return (
      <>
        <Navbar
          navbarState={this.state.navbarOpen}
          handleNavbar={this.handleNavbar}
        />
        <GlobalStyle />
        <div className={styles.totalContain}>
          <Cards data={data} />
        </div>
      </>
    );
  }
}

export default App;
