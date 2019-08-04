import Axios from 'axios';
import * as actionType from './actionsTypes';

export const fetchProfile = profile => ({
  type: actionType.SET_PROFILE,
  profile,
});

export const initProfile = () => (dispatch) => {
  Axios.get('https://ctf-apis.firebaseio.com/profile.json')
    .then((response) => {
      dispatch(fetchProfile(response.data));
    });
};
