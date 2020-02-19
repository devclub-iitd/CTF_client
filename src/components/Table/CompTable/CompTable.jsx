import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import classesExt from './CompTable.module.css';

const useStyles = makeStyles(theme => ({
  root: {
    padding: '40px',
    backgroundColor: 'rgba(245,245,245,0.6)',
    position: 'relative',
    top: '-150px'
  },
}));


export default function PaperSheet() {
  const classes = useStyles();
  const dudUrl = '/competition/';

  return (
    <div>
      <Paper className={classes.root} elevation={5}>
        <div className={classesExt.cardTitle}>
          Competitions
        </div>
        <div className={classesExt.miniLineCenter} />
        <div className={classesExt.competitionList}>
          <Link href={dudUrl+"C1"} style={{ textDecoration: 'none' }}>
            <div className={classesExt.competitionLink}>Competition 1</div>
          </Link>
          <Link href={dudUrl+"C2"} style={{ textDecoration: 'none' }}>
            <div className={classesExt.competitionLink}>Competition 2</div>
          </Link>
          <Link href={dudUrl+"C3"} style={{ textDecoration: 'none' }}>
            <div className={classesExt.competitionLink}>Competition 3</div>
          </Link>
        </div>
      </Paper>
    </div>
  );
}
