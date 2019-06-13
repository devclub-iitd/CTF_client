import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import classes from './competition.module.css';
import CompLeaderboard from '../../../components/Table/CompLeaderboard/CompLeaderboard';

function competition(props) {
  const { comp } = props;
  return (
    <div>
      <div className={classes.title}>
        <Typography variant="h2" align="center">
          {comp.name}
        </Typography>
      </div>
      <div className={classes.para}>
        <Typography variant="h5">
          {comp.details}
        </Typography>
      </div>


      <Typography variant="h4">Rules and Regulations : </Typography>
      <div className={classes.para}>
        <Typography variant="h5">
                    The rules are as follow, Blah Blah Blah Blah and so on.
        </Typography>
      </div>
      <Typography variant="h3">Challenges </Typography>
      <div>
        <CompLeaderboard />
      </div>
    </div>

  );
}

competition.propTypes = {
  comp: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default competition;
