import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, Container, Box, Paper, Button } from "@material-ui/core";
import { connect } from "react-redux";
import Timer from "../../../components/UI/Timer/timer";
import classes from "./competition.module.css";
import CompLeaderboard from "../../../components/Table/CompLeaderboard/CompLeaderboard";
import CompProblems from "../../../components/Problem/CompProblems/CompProblems";
import * as CompetitionActions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Snackbar from "../../../components/UI/snackbar/snackbar";

class competition extends Component {
  componentDidMount() {
    const {
      onInitCompetition,
      location,
      token,
      onInitLeaderboard,
    } = this.props;
    const { _id } = location.state;
    onInitCompetition(_id, token, 1);
    onInitLeaderboard(_id);
  }

  constructor(props) {
    super(props);
    this.state = {
      level: 1,
      eventId: null,
      leaderboardShow: true,
      open: false,
      message: "",
      dummy: true,
    };
    this.openSnack = this.openSnack.bind(this);
    this.closeSnack = this.closeSnack.bind(this);
  }

  openSnack(mess) {
    this.setState({
      open: true,
      message: mess,
    });
  }

  closeSnack() {
    this.setState({
      open: false,
    });
  }

  updateUI = () => {
    const { level } = this.state;
    const {
      onInitCompetition,
      location,
      token,
      onInitProfile,
      onInitLeaderboard,
      userId,
    } = this.props;
    const { _id } = location.state;
    onInitCompetition(_id, token, level);
    onInitProfile(userId, token);
    onInitLeaderboard(_id);
  };

  nextButtonHandler = (participant) => {
    const {
      token,
      compDetails,
      location,
      onInitCompetitionLevelProblems,
    } = this.props;
    const { level } = this.state;
    const { _id } = location.state;
    if (level === compDetails.levels) {
      this.openSnack("This is the Final level!!");
    }
    if (participant.level > level) {
      const updatedLevel = level + 1;
      onInitCompetitionLevelProblems(_id, token, updatedLevel, participant._id);
      this.setState({ level: updatedLevel });
    } else {
      this.openSnack("Level not Unlocked yet!!");
    }
  };

  prevButtonHandler = () => {
    const {
      profile,
      location,
      token,
      onInitCompetitionLevelProblems,
    } = this.props;
    const { level } = this.state;
    const { _id } = location.state;
    let participant = null;
    if (level > 1) {
      const updatedLevel = level - 1;
      if (profile) {
        participant = profile.participant[profile.participant.length - 1];
      }
      onInitCompetitionLevelProblems(_id, token, updatedLevel, participant._id);
      this.setState({ level: updatedLevel });
    } else {
      this.openSnack("This is the first level");
    }
  };

  showLeaderboardHandler = (eventId, leaderboardStatus, token) => {
    const { onInitLeaderboardStatus, onInitLeaderboard } = this.props;
    onInitLeaderboardStatus(eventId, leaderboardStatus, token);

    const { dummy } = this.state;
    setTimeout(() => {
      // this.forceUpdate()
      onInitLeaderboard(eventId);
      this.setState({ dummy: !dummy });
    }, 2000);
  };

  render() {
    const {
      compDetails,
      token,
      profile,
      leaderboard,
      leaderboardStatus,
    } = this.props;
    const { open, message } = this.state;
    const { level } = this.state;
    let participant = null;
    let problemsSolved = null;
    let userId = null;
    if (compDetails && profile) {
      userId = profile._id;
      participant = compDetails.participants.filter(
        (el) => el.userId === userId
      );
      if (!participant) {
        this.forceUpdate();
      }
      participant = participant[0];
      problemsSolved = participant.problemsSolved;
      problemsSolved = problemsSolved.map((prb) => {
        const prbId = Object.keys(prb)[1];
        return prbId;
      });
    }
    let data = <Spinner />;
    let leaderboardShow = null;
    if (leaderboard.length !== 0 && leaderboardStatus) {
      leaderboardShow = (
        <CompLeaderboard
          userId={userId}
          leaderboard={leaderboard}
          key="leaderboard"
        />
      );
    }
    if (compDetails && profile) {
      data = (
        <div>
          <div className={classes.title}>{compDetails.name}</div>
          <div style={{ textAlign: "center" }}>
            <br />
            {new Date(compDetails.endTime) > new Date() ? (
              <Timer dateTo={compDetails.endTime} />
            ) : (
              <h2>Competition Over</h2>
            )}
          </div>
          <div className={classes.miniLineCol} />
          <div className={classes.details}>{compDetails.details}</div>

          <div className={classes.ruleCont}>
            <div className={classes.subTitle}>Rules and Regulations:</div>
            <div className={classes.miniLine} />
            <div className={classes.ruleDetails}>Rule Details</div>
          </div>
          <div className={classes.challengesCont}>
            <div className={classes.subTitle}>Challenges:</div>
            <div className={classes.miniLine} />
            <Paper>
              <div>
                <Typography>Level {level}</Typography>
                <Box p={3}>
                  <CompProblems
                    updateUI={this.updateUI}
                    startTime={compDetails.startTime}
                    endTime={compDetails.endTime}
                    problemsSolved={problemsSolved}
                    participant={participant}
                    eventScore={compDetails.levelScore}
                    token={token}
                    challenges={compDetails.challenges}
                  />
                </Box>
              </div>
              <Button onClick={() => this.prevButtonHandler(participant)}>
                Previous
              </Button>
              <Button onClick={() => this.nextButtonHandler(participant)}>
                Next
              </Button>
            </Paper>
          </div>
          <div className={classes.rankingCont}>
            <div className={classes.subTitle}>User Ranking:</div>
            <div className={classes.miniLine} />
            {leaderboardShow}
            <Button
              onClick={() =>
                this.showLeaderboardHandler(compDetails._id, true, token)
              }
            >
              Show
            </Button>
            <Button
              onClick={() =>
                this.showLeaderboardHandler(compDetails._id, false, token)
              }
            >
              Hide
            </Button>
          </div>
        </div>
      );
    }
    return (
      <Container>
        <div className={classes.mainCont}>{data}</div>
        <Snackbar open={open} message={message} handleClose={this.closeSnack} />
      </Container>
    );
  }
}

competition.propTypes = {
  onInitCompetition: PropTypes.node.isRequired,
  compDetails: PropTypes.node.isRequired,
  history: PropTypes.node.isRequired,
  location: PropTypes.node.isRequired,
  token: PropTypes.node.isRequired,
  profile: PropTypes.node.isRequired,
};

const mapStateToProps = (state) => ({
  compDetails: state.competition,
  token: state.token,
  profile: state.profile,
  leaderboard: state.leaderboard,
  userId: state.userId,
  leaderboardStatus: state.leaderboardStatus,
});
const mapDispatchToProps = (dispatch) => ({
  onInitProfile: (userId, token) =>
    dispatch(CompetitionActions.initProfile(userId, token)),
  onInitCompetition: (id, token, level) =>
    dispatch(CompetitionActions.initCompetition(id, token, level)),
  onInitLeaderboard: (eventId) =>
    dispatch(CompetitionActions.initLeaderboard(eventId)),
  onInitLeaderboardStatus: (eventId, leaderboardStatus) =>
    dispatch(
      CompetitionActions.initLeaderboardStatus(eventId, leaderboardStatus)
    ),
  onInitCompetitionLevelProblems: (eventId, token, level, participantId) =>
    dispatch(
      CompetitionActions.initCompetitionLevelProblems(
        eventId,
        token,
        level,
        participantId
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(competition);
