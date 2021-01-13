import Axios from 'axios';
import * as actionType from './actionsTypes';
import { SUBDOMAIN } from '../../utils/api';

export const fetchProblems = (problems) => ({
    type: actionType.SET_PROBLEMS,
    problems
});

export const initProbelms = (problemType) => (dispatch) => {
    const url = `${SUBDOMAIN}api/problem/all_paroblems/${problemType}`;
    Axios.get(url).then((response) => {
        dispatch(fetchProblems(response.data.data));
    });
};

export const categoryFetchProblems = (category) => ({
    type: actionType.CAT_SET_PROBLEMS,
    category
});

export const addProblem = (problem) => ({
    type: actionType.ADD_PROBLEM,
    problem
});

export const onitProblem = (problem, token) => async (dispatch) => {
    const url = `${SUBDOMAIN}api/problem/`;
    const response = await Axios({
        method: 'POST',
        url,
        data: problem,
        headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(addProblem(response.data.data));
};
