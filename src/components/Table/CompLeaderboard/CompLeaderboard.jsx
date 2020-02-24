import React, { useEffect, useState } from 'react'
import { Typography, Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import classes from './CompLeaderboard.module.css'
import Axios from 'axios'

import Spinner from '../../UI/Spinner/Spinner'

const CompLeaderboard = ({ eventId }) => {
  const [leaderboard, setLeaderboard] = useState(null)

  useEffect(() => {
    const url = 'http://localhost:3000/api/event/leaderboard/' + eventId
    const fetchLeaderboard = async () => {
      const response = await Axios.get(url)
      setLeaderboard(response.data)
    }
    fetchLeaderboard()
  }, [])

  let table = <Spinner></Spinner>
  if (leaderboard) {
    table = leaderboard.map((el, rank) => (
      <tr>
        <td key={el._id}>{rank + 1}</td>
        <td key={el._id}>{el.username}</td>
        <td key={el._id}>{el.score}</td>
      </tr>
    ))
  }

  return (
    <div style={{ marginTop: '30px' }}>
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

CompLeaderboard.propTypes = {
  eventId: PropTypes.node.isRequired
}

export default CompLeaderboard
