import React, { useEffect, useState } from "react";
import { Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import Axios from "axios";
import classes from "./CompLeaderboard.module.css";

import Spinner from "../../UI/Spinner/Spinner";

const CompLeaderboard = ({ userId, leaderboard }) => {
  let table = <Spinner />;
  let userRank = <Spinner />;
  if (leaderboard) {
    for (let i = 0; i < leaderboard.length; i++) {
      if (leaderboard[i].userId === userId) {
        userRank = (
          <div>
            <h2>Rank : {i + 1}</h2>
            <h2>Score: {leaderboard[i].score}</h2>
          </div>
        );
      }
    }
    table = leaderboard.map((el, rank) => (
      <tr>
        <td key={rank}>{rank + 1}</td>
        <td key={el.handle + rank.toString()}>{el.handle}</td>
        <td key={rank + 1000 * el.score}>{el.score}</td>
      </tr>
    ));
  }

  return (
    <div style={{ marginTop: "30px" }}>
      {userRank}
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

CompLeaderboard.propTypes = {
  eventId: PropTypes.node.isRequired,
};

export default CompLeaderboard;
