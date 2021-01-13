import Axios from 'axios';
import * as actionType from './actionsTypes';
import { SUBDOMAIN } from '../../utils/api';

export const fetchProfile = (profile) => ({
    type: actionType.SET_PROFILE,
    profile
});

export const initProfile = (userId, token) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/user/${userId}`;
    const response = await Axios({
        method: 'GET',
        url,
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(fetchProfile(response.data.data));
};
