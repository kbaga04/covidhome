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
          <div className={styles.logoSite}>
                <h2 className={styles.lead}>
                    COVID TRACKER
                </h2>
                <h5>Reliable tracker for COVID-19 Cases, Recoveries, and Deaths</h5>
          </div>
          <div className={styles.cardContainer}>
               <Cards data={data} />
          </div>
          <CountryPicker handleCountryChange={this.handleCountryChange} />
          <Chart data={data} country={country} />
          <ConfirmedTbl />
          <DeathsTable />
        </div>
      </>
    );
  }
}

export default App;
