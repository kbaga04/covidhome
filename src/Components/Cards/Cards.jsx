import React from 'react';
import { Card, CardContent, Typography, Grid, StylesProvider } from '@material-ui/core';
import CountUp from 'react-countup';
import cx from 'classnames';
import { fetchData } from '../../api';

import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, recovered, deaths } }) => {
    // if (!confirmed) {
    //     return 'Loading...'
    // }
    // else {
    return (
        <>
            <div className={styles.logoSite}>
                <h2 className={styles.lead}>
                    COVID TRACKER
                </h2>
                <h5 className={styles.seclead}>Reliable tracker for COVID-19 Cases, Recoveries, and Deaths</h5>
            </div>
            <div className={StylesProvider.container}>
                <Typography gutterBottom variant="h4" component="h2" className={styles.global}>Global</Typography>
                <Grid container spacing={3} justify="center">
                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.infected)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Infected</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={28756489} duration={2.5} separator="," />
                            </Typography>
                            <Typography variant="body2">Number of active cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.recovered)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={0} duration={2.5} separator="," />
                            </Typography>
                            <Typography variant="body2">Number of recoveries of COVID-19</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles.deaths)}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={515151} duration={2.5} separator="," />
                            </Typography>
                            <Typography variant="body2">Number of deaths as a result of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        </>
    )
    // }
}

export default Cards;