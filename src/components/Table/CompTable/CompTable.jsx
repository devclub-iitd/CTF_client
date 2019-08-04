import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(7, 5),
    spacing: 118,
  },
}));


export default function PaperSheet() {
  const classes = useStyles();
  const dudUrl = '/competition/';

  return (
    <div>
      <Paper className={classes.root} square={false}>
        <Typography variant="h3" component="h3" align="center">
          Competitions
        </Typography>
        <br />
        <Typography variant="h4" component="h3" color="primary">
          <Box p={3} bgcolor="background.paper">
            <Link href={dudUrl+"C1"} className={classes.link}>
              Competition 1
            </Link>
          </Box>


        </Typography>
        <Typography variant="h4" component="h3" color="primary">
          <Box p={3} bgcolor="background.paper">
            <Link href={dudUrl+"C2"} className={classes.link}>
              Competition 2
            </Link>
          </Box>

        </Typography>
        <Typography variant="h4" component="h3" color="primary">

          <Box p={3} bgcolor="background.paper">
            <Link href={dudUrl+"C3"} className={classes.link}>
              Competition 3
            </Link>
          </Box>

        </Typography>
      </Paper>
    </div>
  );
}
