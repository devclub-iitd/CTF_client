import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

function createData(rank, name, score) {
  return { rank, name, score };
}

const rows = [
  createData(1, 'Max', 667),
  createData(2, 'Scooby', 660),
  createData(3, 'Planck', 632),
  createData(4, 'Tommy', 611),
  createData(5, 'Rocky', 566),
];


function CustomizedTables({ width }) {
  let wid = '30%';
  if (width) {
    wid = width;
  }
  const useStyles = makeStyles(theme => ({
    root: {
      width: wid,
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 250,
    },
  }));

  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Rank</StyledTableCell>
            <StyledTableCell align="right">Username</StyledTableCell>
            <StyledTableCell align="right">Score</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.rank}>
              <StyledTableCell component="th" scope="row">
                {row.rank}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.score}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
CustomizedTables.propTypes = {
  width: PropTypes.node.isRequired,
};

export default CustomizedTables;
