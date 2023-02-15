import React from "react";
import styles from './RecoveredTable.module.css'
import { Pie } from 'react-chartjs-2';

export default class RecoveredTable extends React.Component {
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
        this.setState({ person: data.Global.TotalRecovered, country: data, loading: false })
    }

    render() {
        if (this.state.loading || !this.state.person) {
            return <div> </div>
        }

        else {
            var worldRecovered = this.state.person;
            var countryRecover = [];
            var countryNames = ['a', 'a', 'a', 'a', 'a'];
            var countryNums = []
            var sortedCountries = [];

            for (let i = 0; i < 186; i++) {
                countryRecover.push(this.state.country.Countries[i]);
                countryNums.push(countryRecover[i].TotalRecovered);
            }

            var sortedCountries = countryNums.sort((a, b) => b - a).slice(0, 5);

            for (let i = 0; i < 186; i++) {
                if (countryRecover[i].Country === "United States of America") {
                    countryRecover[i].Country = "US"
                }
                if (countryRecover[i].Country === "Russian Federation") {
                    countryRecover[i].Country = "Russia"
                }
                let x = 0;
                while (countryRecover[i].TotalRecovered !== sortedCountries[x] && x < 5) {
                    x++;
                }

                if (x <= 4) {
                    countryNames[x] = countryRecover[i].Country;
                }
            }

            console.log(countryRecover);
            console.log(sortedCountries);
            console.log(countryNames);

            const pieChart = (
                <Pie
                    data={{
                        labels: [countryNames[0], countryNames[1], countryNames[2], countryNames[3], countryNames[4], 'Rest of the World'],
                        datasets: [{
                            data: [(sortedCountries[0] / worldRecovered) * 100, (sortedCountries[1] / worldRecovered) * 100, (sortedCountries[2] / worldRecovered) * 100, (sortedCountries[3] / worldRecovered) * 100, (sortedCountries[4] / worldRecovered) * 100, 100 - ((sortedCountries[0] / worldRecovered) * 100 + (sortedCountries[1] / worldRecovered) * 100 + (sortedCountries[2] / worldRecovered) * 100 + (sortedCountries[3] / worldRecovered) * 100 + (sortedCountries[4] / worldRecovered) * 100)],
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
                    <h3 className={styles.hthree}>Most COVID-19 Recoveries</h3>
                    <div className={styles.contain}>
                        <table className={styles.tabl}>
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>COVID-19 Recovered</th>
                                    <th>% of World Recoveries</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{countryNames[0]}</td>
                                    <td>{sortedCountries[0]}</td>
                                    <td>{((sortedCountries[0] / worldRecovered) * 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>{countryNames[1]}</td>
                                    <td>{sortedCountries[1]}</td>
                                    <td>{((sortedCountries[1] / worldRecovered) * 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>{countryNames[2]}</td>
                                    <td>{sortedCountries[2]}</td>
                                    <td>{((sortedCountries[2] / worldRecovered) * 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>{countryNames[3]}</td>
                                    <td>{sortedCountries[3]}</td>
                                    <td>{((sortedCountries[3] / worldRecovered) * 100).toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td>{countryNames[4]}</td>
                                    <td>{sortedCountries[4]}</td>
                                    <td>{((sortedCountries[4] / worldRecovered) * 100).toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className={styles.charts}>
                        {pieChart}
                    </div>
                </div>
            )
        }
    }
}