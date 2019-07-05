import Axios from 'axios';
import * as actionType from './actionsTypes';

export const fetchCompetitions = competitions => ({
  type: actionType.SET_COMPETITIONS,
  competitions,
});

export const initCompetitions = () => (dispatch) => {
  Axios.get('https://ctf-apis.firebaseio.com/competitionList.json')
    .then((response) => {
      dispatch(fetchCompetitions(response.data));
    });
};

export const fetchCompetition = competition => ({
  type: actionType.SET_COMPETITION,
  competition,
});

export const initCompetition = id => (dispatch) => {
  const link = `https://ctf-apis.firebaseio.com/competitions/${id}.json`;
  Axios.get(link)
    .then((response) => {
      dispatch(fetchCompetition(response.data));
    });
};
