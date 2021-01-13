import React, { Component } from 'react';
import {
    Typography,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Grid,
    Button,
    TextField,
    Fab
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Axios from 'axios';
import NavigationIcon from '@material-ui/icons/Navigation';
import Spinner from '../../../components/UI/Spinner/Spinner';
import * as probelmActions from '../../../store/actions/index';
import classes from './Problems.module.css';
import { SUBDOMAIN } from '../../../utils/api';

class problems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            id: ''
        };
    }

    componentDidMount() {
        const { onInitProblems } = this.props;
        onInitProblems('1');
    }

    status = (_id) => {
        const { profile } = this.props;
        if (profile) {
            if (profile.problems.includes(_id)) {
                return true;
            }
        }
        return false;
    };

    answerInput = (event) => {
        event.preventDefault();
        const answer = event.target.value;
        this.setState({ answer });
    };

    submitAnswerHandler = async (prb) => {
        const { profile, token } = this.props;
        const { answer } = this.state;
        if (token && prb.answer === answer) {
            console.log('Sedning req');
            profile.problems.push(prb._id);
            prb.userSolved += 1;
            const url = `${SUBDOMAIN}api/problem/updated_problem/${prb._id}`;
            const response = await Axios({
                method: 'PUT',
                url,
                data: {
                    problems: profile.problems,
                    userSolved: prb.userSolved
                },
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Correct Answer');
        } else if (!token) {
            alert('Login to answer');
        } else if (prb.answer !== answer) {
            alert('Wrong Answer');
        }
    };

    render() {
        const { problemsList } = this.props;
        let prob = null;
        if (problemsList) {
            prob = problemsList.map((el) => (
                <div style={{ width: '100%' }} key={el.id}>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id={el._id}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Typography>{el.name} </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{el.userSolved} </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>{el.score} </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography>
                                        {this.status(el._id)
                                            ? 'Solved'
                                            : 'Unsolved'}{' '}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {el.details}
                                <div>
                                    <TextField
                                        id={el._id}
                                        label="Answer"
                                        style={{ margin: 8 }}
                                        fullWidth
                                        margin="large"
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        onChange={this.answerInput}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() =>
                                            this.submitAnswerHandler(el)
                                        }
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            ));
        }

        let display = <Spinner />;
        if (problemsList) {
            display = (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <div className={classes.tableFieldTitle}>
                                Problems{' '}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.tableFieldTitle}>
                                Users Solved
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.tableFieldTitle}>
                                Score{' '}
                            </div>
                        </Grid>
                        <Grid item xs={3}>
                            <div className={classes.tableFieldTitle}>
                                Status{' '}
                            </div>
                        </Grid>
                    </Grid>
                </div>
            );
        }

        const { profile, token } = this.props;
        let isAdmin = null;
        if (profile) {
            isAdmin = profile.isAdmin;
        }

        return (
            <div className={classes.mainCont}>
                <div className={classes.innerCont}>
                    <div className={classes.pageTitle}>Problems</div>
                    <div className={classes.miniLine} />
                    <div className={classes.tableCont}>
                        {display}
                        <div className={classes.tableProbs}>{prob}</div>
                    </div>
                    {isAdmin && token ? (
                        <div className={classes.btnCont}>
                            <Link to="/add/problem">
                                <Fab
                                    variant="extended"
                                    color="primary"
                                    aria-label="Add"
                                >
                                    <NavigationIcon
                                        className={classes.extendedIcon}
                                    />
                                    Add Problem
                                </Fab>
                            </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
}

problems.propTypes = {
    onInitProblems: PropTypes.node.isRequired,
    problemsList: PropTypes.node.isRequired
};

const mapStateToProps = (state) => ({
    problemsList: state.problems,
    token: state.token,
    profile: state.profile
});
const mapDispatchToProps = (dispatch) => ({
    onInitProblems: (problemType) =>
        dispatch(probelmActions.initProbelms(problemType))
});

export default connect(mapStateToProps, mapDispatchToProps)(problems);
