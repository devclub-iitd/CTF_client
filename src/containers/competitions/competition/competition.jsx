import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import classes from './competition.module.css';
import CompLeaderboard from '../../../components/Table/CompLeaderboard/CompLeaderboard';


class competition extends React.PureComponent {
    static propTypes = {
      comp: PropTypes.string.isRequired,
    }

    render() {
      const { comp } = this.props;
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
            <CompLeaderboard leaderboard={comp.leaderboard} key={comp.id} />
          </div>
        </div>

      );
    }
}


export default competition;
