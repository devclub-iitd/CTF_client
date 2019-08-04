import * as actionTypes from '../actions/actionsTypes';

const initialState = {
  problems: null,
  competitions: null,
  competition: null,
  categoryProblems: null,
  profile: null,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PROBLEMS:
      return {
        ...state,
        problems: action.problems,
      };
    case actionTypes.SET_COMPETITIONS:
      return {
        ...state,
        competitions: action.competitions,
      };
    case actionTypes.SET_COMPETITION:
      return {
        ...state,
        competition: action.competition,
      };
    case actionTypes.CAT_SET_PROBLEMS: {
      const problemArray = { ...state.problems };
      const newarray = Object.values(problemArray).filter(
        problemItem => problemItem.category === action.category,
      );
      return {
        ...state,
        categoryProblems: newarray,
      };
    }
    case actionTypes.SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    default:
      return state;
  }
};

export default reducer;
