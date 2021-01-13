import axios from 'axios';
import * as actionTypes from './actionsTypes';
import { SUBDOMAIN } from '../../utils/api';

export const authStart = () => ({
    type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId
});

export const authFail = (error) => ({
    type: actionTypes.AUTH_FAIL,
    error
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeOut = (expirationTime) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, expirationTime * 10000);
};

export const fetchProfile = (profile) => ({
    type: actionTypes.SET_PROFILE,
    profile
});

export const initProfile = (userId, token) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/user/${userId}`;
    const response = await axios({
        method: 'GET',
        url,
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(fetchProfile(response.data.data));
};

export const auth = (authData, isLogin) => (dispatch) => {
    dispatch(authStart());
    let url = `${SUBDOMAIN}api/user/signup`;
    if (isLogin) {
        url = `${SUBDOMAIN}api/user/login`;
    }
    axios
        .post(url, authData)
        .then((response) => {
            if (response.data.status === 200) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.userId);
                const expirationDate = new Date(
                    new Date().getTime() + response.data.expiresIn * 1000
                );
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(
                    authSuccess(response.data.token, response.data.userId)
                );
                dispatch(
                    initProfile(response.data.userId, response.data.token)
                );
                dispatch(checkAuthTimeOut(response.data.expiresIn));
                alert(response.data.message);
                return;
            }
            dispatch(authFail(response.data.message));
            alert(response.data.message);
        })
        .catch((err) => {
            dispatch(authFail(err));
        });
};

export const authCheckState = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
        dispatch(logout());
    } else {
        const expirationDate = new Date(localStorage.getItem('expirationDate'));
        if (expirationDate > new Date()) {
            const userId = localStorage.getItem('userId');
            dispatch(authSuccess(token, userId));
            dispatch(initProfile(userId, token));
            dispatch(
                checkAuthTimeOut(
                    (expirationDate.getTime() - new Date().getTime()) / 1000
                )
            );
        } else {
            dispatch(logout());
        }
    }
};
