import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import classesExt from './CompTable.module.css';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '40px',
        backgroundColor: 'rgba(245,245,245,0.6)',
        position: 'relative'
        // top: '-150px'
    }
}));

export default function PaperSheet({ eventList }) {
    const classes = useStyles();
    const dudUrl = '/event/';
    let table = <Typography>No competitions to show</Typography>;
    if (eventList) {
        table = eventList.map((event) => (
            <div>
                <Link
                    key={`link${event._id}`}
                    to="/event/"
                    style={{ textDecoration: 'none' }}
                >
                    <div className={classesExt.competitionLink}>
                        {event.name}
                    </div>
                </Link>
            </div>
        ));
    }
    return (
        <div>
            <Paper className={classes.root} elevation={5}>
                <div className={classesExt.cardTitle}>Competitions</div>
                <div className={classesExt.miniLineCenter} />
                <div className={classesExt.competitionList}>{table}</div>
            </Paper>
        </div>
    );
}
