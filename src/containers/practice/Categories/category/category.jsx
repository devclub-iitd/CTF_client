import React, { Component } from "react";
import {
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Grid,
  Container,
  TextField,
  Button,
  Box,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Axios from "axios";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import * as probelmActions from "../../../../store/actions/index";

class categories extends Component {
  componentDidMount() {
    const { oncategoryFetchProblems, history } = this.props;
    const categoryNames = {
      1: "Binary Exploitation",
      2: "Reverse Engineering",
      3: "Web Exploitation",
      4: "Cryptography",
      5: "Forensics",
      hidden: "Hidden Problems",
    };
    oncategoryFetchProblems(
      categoryNames[history.location.pathname.substring(21)]
    );
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
      console.log("Sedning req");
      profile.problems.push(prb._id);
      prb.userSolved += 1;
      const url = `http://localhost:3000/api/problem/updated_problem/${prb._id}`;
      const response = await Axios({
        method: "PUT",
        url,
        data: {
          problems: profile.problems,
          userSolved: prb.userSolved,
        },
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Correct Answer");
    } else if (!token) {
      alert("Login to answer");
    } else if (prb.answer !== answer) {
      alert("Wrong Answer");
    }
  };

  render() {
    const { problemsList } = this.props;
    let prob = null;
    if (problemsList) {
      prob = Object.values(problemsList).map((el) => (
        <div style={{ width: "100%" }} key={el.id}>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
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
                    {" "}
                    {this.status(el._id) ? "Solved" : "Unsolved"}{" "}
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
                      shrink: true,
                    }}
                    onChange={this.answerInput}
                  />
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => this.submitAnswerHandler(el)}
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
          <br />
          <Grid container spacing={3}>
            <Grid item xs={3}>
              <Typography variant="h4">Problems </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4">Users Solved </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4">Score </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="h4">Status </Typography>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div>
        <Box p={6}>
          <Container maxWidth="md">
            <Box p={4}>
              <Typography variant="h1" align="center">
                Category Problems
              </Typography>
            </Box>
            <Box p={3}>{display}</Box>

            {prob}
          </Container>
        </Box>
      </div>
    );
  }
}

categories.propTypes = {
  oncategoryFetchProblems: PropTypes.node.isRequired,
  problemsList: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  problemsList: state.categoryProblems,
  token: state.token,
  profile: state.profile,
});
const mapDispatchToProps = (dispatch) => ({
  oncategoryFetchProblems: (category) =>
    dispatch(probelmActions.categoryFetchProblems(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(categories);
