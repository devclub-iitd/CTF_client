import Axios from 'axios';
import * as actionType from './actionsTypes';

export const fetchProblems = problems => ({
  type: actionType.SET_PROBLEMS,
  problems,
});

export const initProbelms = () => (dispatch) => {
  Axios.get('https://ctf-apis.firebaseio.com/problems.json')
    .then((response) => {
      dispatch(fetchProblems(response.data));
    });
};

export const categoryFetchProblems = category => ({
  type: actionType.CAT_SET_PROBLEMS,
  category,
});
