/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import UserTable from '../../../components/Table/UserTable/UserTable';

class leaderboard extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <Typography variant="h3" align="center">
                    Leaderboard
        </Typography>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <UserTable width="100%" />
        </div>
      </div>
    );
  }
}

export default leaderboard;
