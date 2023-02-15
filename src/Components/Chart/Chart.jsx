import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';

import { fetchDailyData } from '../../api';

import styles from './Chart.module.css';

const Chart = ({ data: { Confirmed, Recovered, Deaths }, country }) => {
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    const fetchMyAPI = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    };

    fetchMyAPI();
  }, []);

  console.log(Chart);

  const barChart = (
    Confirmed ? (
      <Bar
        data={{
          labels: ['Infected', 'Recovered', 'Deaths'],
          datasets: [
            {
              label: 'People',
              backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 0, 0.5)', 'rgba(255, 0, 0, 0.5)'],
              data: [Confirmed.value, Recovered.value, Deaths.value,],
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: { display: false },
          title: { display: true, text: `Current situation in ${country}` },
          animation: { duration: 1000, easing: 'linear' },
        }}
      />
    ) : null
  );

  const lineChart = (
    dailyData[0] ? (
      <Line
        data={{
          labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: dailyData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: '#3333ff',
            fill: true,
          }, 
         {
          data: dailyData.map((data) => data.recovered),
          label: 'Recovered',
          borderColor: 'green',
          backgroundColor: 'rgba(0, 255, 0, 0.5)',
          fill: true,
         },
          {
            data: dailyData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            fill: true,
          },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          title: { display: true, text: `Current situation in the World` },
          animation: { duration: 4000, easing: 'linear' },
        }}
      />
    ) : null
  );

  return (
    <div className={styles.container}>
      {country ? barChart : lineChart}
    </div>
  );
};
export default Chart;