import React from 'react'
import { Typography, Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import classes from './CompLeaderboard.module.css'

const compLeaderboard = ({ leaderboard }) => {
  // const user = [
  //   {
  //     id: 1,
  //     name: 'Max',
  //     rank: 1,
  //     score: 22,
  //   },
  //   {
  //     id: 2,
  //     name: 'Rocky',
  //     rank: 2,
  //     score: 14,
  //   },
  //   {
  //     id: 3,
  //     name: 'Tommy',
  //     rank: 3,
  //     score: 2,
  //   },

  // ];

  const table = leaderboard.map(el => (
    <tr>
      <td key={el._id}>{el.rank}</td>
      <td key={el._id}>{el.name}</td>
      <td key={el._id}>{el.score}</td>
    </tr>
  ))
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

  )
}

compLeaderboard.propTypes = {
  leaderboard: PropTypes.node.isRequired
}

export default compLeaderboard
