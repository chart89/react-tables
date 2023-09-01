import { API_URL } from "../config";

//selectors
export const getLoadSpin = (state) => state.loadSpin;

// actions names
const createActionName = actionName => `app/loadSpin/${actionName}`;
const UPDATE_LOADSPIN = createActionName('UPDATE_LOADSPIN');


// action creators
export const updateLoadSpin = payload => ({ type: UPDATE_LOADSPIN, payload });

export const fetchLoadSpin = () => {
  return (dispatch) => {
    fetch(API_URL + '/loadSpin')
    .then(res => res.json())
    .then(loadSpin => {dispatch(updateLoadSpin(loadSpin))});
  }
};

const loadSpinReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_LOADSPIN:
    return [...action.payload]
    default:
      return statePart;
  };
};
export default loadSpinReducer;