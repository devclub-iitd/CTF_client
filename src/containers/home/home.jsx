import React from 'react';
import {
  Container, Grid, Typography, Fab,
} from '@material-ui/core';
import NavigationIcon from '@material-ui/icons/Navigation';
import classes from './home.module.css';
import CompTable from '../../components/Table/CompTable/CompTable';
import UserTable from '../../components/Table/UserTable/UserTable';


const home = () => (
  <div>
    <Container>
      <br />
      <Typography variant="h1" align="center">Most Wanted</Typography>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h5">
                    Cyber security is a high priority of companies,
                    small and big, as cyber attacks have been on the rise
                    in recent years.
                    In response to these
                    attacks, security professionals and college students have been
                    through rigorous
                    training as how hackers are able
                    to get into the companies and how to defend against
                    them. One way of cyber security training is
                    through a cyber security capture the flag (CTF) event.
                    A cyber security CTF is a competition between
                    security professionals and/or students learning about
                    cyber security. This competition is used as a
                    learning tool for everyone that is interested in cyber
                    security and it can help sharpen the tools
                    they have learned during their training.
          </Typography>
          <br />
          <Typography variant="h4">
                        If you are new to CTF, we
                        recommend you going through our walkthrough portal given here.
          </Typography>
          <br />
          <br />


        </Grid>
        <Grid item xs={4}>
          <CompTable />
        </Grid>

      </Grid>
      <div className={classes.center}>
        <Fab variant="extended" color="primary" aria-label="Add">
          <NavigationIcon className={classes.extendedIcon} />
                            Walkthrough
        </Fab>
      </div>
      <h1 className={classes.center}>User Rank</h1>
      <div className={classes.center}>
        <UserTable />
      </div>

    </Container>

  </div>
);

export default home;
