/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Typography, Box } from '@material-ui/core';
import classes from './CompLeaderboard.module.css';

const compLeaderboard = () => {
  const user = [
    {
      id: 1,
      name: 'Max',
      rank: 1,
      score: 22,
    },
    {
      id: 2,
      name: 'Rocky',
      rank: 2,
      score: 14,
    },
    {
      id: 3,
      name: 'Tommy',
      rank: 3,
      score: 2,
    },

  ];
  const table = user.map(el => (
    <tr>
      <td>{el.rank}</td>
      <td>{el.name}</td>
      <td>{el.score}</td>
    </tr>
  ));
  return (
    <div>
      <Box p={4}><Typography variant="h2" align="center">User Ranking</Typography></Box>
      <table className={classes.table}>
        <tr>
          <th>Rank</th>
          <th>User Name</th>
          <th>Score</th>
        </tr>
        {table}
      </table>

    </div>

  );
};

export default compLeaderboard;
