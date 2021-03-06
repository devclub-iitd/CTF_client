import Axios from 'axios';
import { SUBDOMAIN } from '../../utils/api';
import * as actionType from './actionsTypes';

export const fetchCompetitions = (competitions) => ({
    type: actionType.SET_COMPETITIONS,
    competitions
});

export const fetchProfile = (profile) => ({
    type: actionType.SET_PROFILE,
    profile
});

export const initCompetitions = () => (dispatch) => {
    const url = `${SUBDOMAIN}api/event`;
    Axios.get(url).then((response) => {
        dispatch(fetchCompetitions(response.data.data.reverse()));
    });
};

export const fetchCompetition = (competition) => ({
    type: actionType.SET_COMPETITION,
    competition
});

export const initCompetition = (eventId, token, level) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/event/${eventId}`;
    const response = await Axios({
        method: 'GET',
        url,
        params: {
            level,
            eventId
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    await dispatch(fetchCompetition(response.data));
};

export const fetchCompetitionLevelProblems = (challenges) => ({
    type: actionType.SET_COMPETITIONS_LEVEL_PROBLEMS,
    challenges
});

export const fetchLeaderboard = (leaderboard) => ({
    type: actionType.SET_LEADERBOARD,
    leaderboard
});

export const initLeaderboard = (eventId) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/event/leaderboard/${eventId}`;
    const response = await Axios.get(url);
    console.log(response.data);
    await dispatch(fetchLeaderboard(response.data));
};

export const fetchLeaderboardStatus = (leaderboardStatus) => ({
    type: actionType.SET_LEADERBOARD_STATUS,
    leaderboardStatus
});

export const initLeaderboardStatus = (
    eventId,
    leaderboardStatus,
    token
) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/event/leaderboard/${eventId}`;
    console.log(leaderboardStatus);
    const response = await Axios({
        method: 'PUT',
        url,
        data: {
            leaderboardStatus
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    await dispatch(fetchLeaderboardStatus(response.data.showLeaderboard));
};

export const initCompetitionLevelProblems = (
    eventId,
    token,
    level,
    participantId
) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/event/${eventId}/level-probelms`;
    const response = await Axios({
        method: 'GET',
        url,
        params: {
            eventId,
            level,
            participantId
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    await dispatch(fetchCompetitionLevelProblems(response.data.data));
};

// Adding an Event or Competition

export const addEvent = (competition) => ({
    type: actionType.ADD_EVENT,
    competition
});

export const onitEvent = (event, token) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/event/`;
    const levelScore = JSON.stringify(Array.from(event.levelScore.entries()));
    const response = await Axios({
        method: 'POST',
        url,
        data: {
            ...event,
            levelScore
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(addEvent(response.data.data));
};

export const regEvent = (token, userId, profile, event) => async (dispatch) => {
    let username = null;
    if (profile) {
        username = profile.username;
    }
    let url = `${SUBDOMAIN}api/participant/`;
    const participant = await Axios({
        method: 'POST',
        url,
        data: {
            eventId: event._id,
            eventName: event.name,
            userId,
            handle: username
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!participant.data.data) {
        console.log('Already Registered!!');
        return;
    }
    const participantId = participant.data.data._id;
    url = `${SUBDOMAIN}api/event/${event._id}`;
    event.participants.push(participantId);
    event.leaderboard.push(participantId);
    const eventResponse = await Axios({
        method: 'PUT',
        url,
        data: {
            participants: event.participants,
            leaderboard: event.leaderboard
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    url = `${SUBDOMAIN}api/user/${userId}`;
    const userParticipant = [...profile.participant];
    const userEvent = [...profile.events];
    userEvent.push(event._id);
    userParticipant.push(participantId);
    const userResponse = await Axios({
        method: 'PUT',
        url,
        data: {
            participant: userParticipant,
            events: userEvent
        },
        headers: { Authorization: `Bearer ${token}` }
    });
    const updatedProfile = {
        ...profile,
        participant: userParticipant,
        events: userEvent
    };
    dispatch(fetchProfile(updatedProfile));
    // alert('Registered Successfully!!!')
};
