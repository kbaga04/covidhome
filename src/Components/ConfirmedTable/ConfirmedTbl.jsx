import React from "react";
import styles from './ConfirmedTbl.module.css'
import { Pie } from 'react-chartjs-2';

export default class ConfirmedTbl extends React.Component {
  state = {
    loading: true,
    person: null,
    country: null,
  }

  async componentDidMount() {
    const url = "https://api.covid19api.com/summary";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data)
    this.setState({ person: data.Global.TotalConfirmed, country: data, loading: false })
  }

  render() {
    if (this.state.loading || !this.state.person) {
      return <div>Loading...</div>
    }

    else {
      var worldConfirmed = this.state.person;
      var countryCases = [];
      var countryNames = ['a', 'a', 'a', 'a', 'a'];
      var countryNums = []
      var sortedCountries = [];

      for (let i = 0; i < 186; i++) {
        countryCases.push(this.state.country.Countries[i]);
        countryNums.push(countryCases[i].TotalConfirmed);
      }

      var sortedCountries = countryNums.sort((a, b) => b - a).slice(0, 5);

      for (let i = 0; i < 186; i++) {
        if (countryCases[i].Country === "United States of America") {
          countryCases[i].Country = "US"
        }
        if (countryCases[i].Country === "Russian Federation") {
          countryCases[i].Country = "Russia"
        }
        let x = 0;
        while (countryCases[i].TotalConfirmed !== sortedCountries[x] && x < 5) {
          x++;
        }

        if (x <= 4) {
          countryNames[x] = countryCases[i].Country;
        }
      }

      console.log(countryCases);
      console.log(sortedCountries);
      console.log(countryNames);

      const pieChart = (
        <Pie
          data={{
            labels: [countryNames[0], countryNames[1], countryNames[2], countryNames[3], countryNames[4], 'Rest of the World'],
            datasets: [{
              data: [(sortedCountries[0] / worldConfirmed) * 100, (sortedCountries[1] / worldConfirmed) * 100, (sortedCountries[2] / worldConfirmed) * 100, (sortedCountries[3] / worldConfirmed) * 100, (sortedCountries[4] / worldConfirmed) * 100, 100 - ((sortedCountries[0] / worldConfirmed) * 100 + (sortedCountries[1] / worldConfirmed) * 100 + (sortedCountries[2] / worldConfirmed) * 100 + (sortedCountries[3] / worldConfirmed) * 100 + (sortedCountries[4] / worldConfirmed) * 100)],
              backgroundColor: ['rgba(220, 20, 60, 0.7)', 'rgba(72, 61, 139, 0.7)', 'rgba(34, 139, 34, 0.7)', 'rgba(255, 215, 0, 0.7)', 'rgba(218, 112, 214, 0.7)', 'rgba(30, 144, 255, 0.7)'],
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      )

      return (
        <div className={styles.stat}>
          <h3 className={styles.hthree}>Most COVID-19 Cases</h3>
          <div className={styles.contain}>
            <table className={styles.tabl}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>COVID-19 Cases</th>
                  <th>% of World Cases</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{countryNames[0]}</td>
                  <td>{sortedCountries[0]}</td>
                  <td>{((sortedCountries[0] / worldConfirmed) * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>{countryNames[1]}</td>
                  <td>{sortedCountries[1]}</td>
                  <td>{((sortedCountries[1] / worldConfirmed) * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>{countryNames[2]}</td>
                  <td>{sortedCountries[2]}</td>
                  <td>{((sortedCountries[2] / worldConfirmed) * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>{countryNames[3]}</td>
                  <td>{sortedCountries[3]}</td>
                  <td>{((sortedCountries[3] / worldConfirmed) * 100).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>{countryNames[4]}</td>
                  <td>{sortedCountries[4]}</td>
                  <td>{((sortedCountries[4] / worldConfirmed) * 100).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className={styles.chart}>
            {pieChart}
          </div>
        </div>
      )
    }
  }
}