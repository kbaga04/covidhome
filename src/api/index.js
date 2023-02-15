import axios from 'axios';
import Data from './data.json';
import Ctry from './country.json';

const url = 'https://api.covid19api.com';


// export const fetchData = fetch('data.json')
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     console.log("This is the Data");
//     // Do something with the data
//   })
//   .catch(error => {
//     console.error(error);
//   });

export const fetchData = async (country) => {
  try {
    // const response = await fetch('data.json');
    // const json = await response.json();
    // if (json[country]) {
    //   console.log(json[country]);
    //   return json[country];
    // } else {
    //   throw `No data found for ${country}`;
    // }
    // const { Data } = await axios.get('./data.json');
    const coninfo = Ctry.country.TotalConfirmed;
    const recinfo = Ctry.country.TotalRecovered;
    const deatinfo = Ctry.country.TotalDeaths;
    return {coninfo, recinfo, deatinfo };
  } catch (error) {
    return error;
  }
};

// export const fetchData = (country) => $.getJSON("test.json", function(json) {
//   try {
//     return json[country];
//     console.log(json);
//   } catch (error) {
//     return error;
//   }
// });

// async (country) => {
//   let changeableUrl = url;

//   if (country) {
//     changeableUrl = `${url}/country/${country}`;
//   }

//   try {
//     const { data: { Confirmed, Recovered, Deaths, Date } } = await axios.get(changeableUrl);

//     return { Confirmed, Recovered, Deaths, Date };
//   } catch (error) {
//     return error;
//   }
// };

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Fetches Daily Data for Global Cases
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json');
  
      return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    // const { data: { countries } } = await axios.get(`data.json`);

    return Data.map((country) => country.Country);
  } catch (error) {
    return error;
  }
};