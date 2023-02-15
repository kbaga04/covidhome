import React from "react";
import styles from './DeathsTable.module.css'
import { Pie } from 'react-chartjs-2';

export default class DeathsTable extends React.Component {
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
        this.setState({ person: data.Global.TotalDeaths, country: data, loading: false })
    }

    render() {
        if (this.state.loading || !this.state.person) {
            return <div>Loading...</div>
        }

        else {
            var worldConfirmed = this.state.person;
            var countryDeaths = [];
            var countryNames = ['a', 'a', 'a', 'a', 'a'];
            var countryNums = []
            var sortedCountries = [];

            console.log(this.state.country.length)
            for (let i = 0; i < 186; i++) {
                countryDeaths.push(this.state.country.Countries[i]);
                countryNums.push(countryDeaths[i].TotalDeaths);
            }

            sortedCountries = countryNums.sort((a, b) => b - a).slice(0, 5);

            for (let i = 0; i < 186; i++) {
                if (countryDeaths[i].Country === "United States of America") {
                    countryDeaths[i].Country = "US"
                    console.log("US FOUND")
                }
                if (countryDeaths[i].Country === "Russian Federation") {
                    countryDeaths[i].Country = "Russia"
                    console.log("RUSSIA FOUND")
                }
                let x = 0;
                while (countryDeaths[i].TotalDeaths !== sortedCountries[x] && x < 5) {
                    x++;
                }

                if (x <= 4) {
                    countryNames[x] = countryDeaths[i].Country;
                }
            }

            console.log(countryDeaths);
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
                    <h3 className={styles.hthree}>Most COVID-19 Deaths</h3>
                    <div className={styles.contain}>
                        <table className={styles.tbl}>
                            <thead>
                                <tr>
                                    <th>Country</th>
                                    <th>COVID-19 Deaths</th>
                                    <th>% of World Deaths</th>
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

                    <div className={styles.chartss}>
                        {pieChart}
                    </div>
                </div>
            )
        }
    }
}