import { API_URL } from "../config";

//selectors
export const getStatusName = (state) => state.status;

// actions names
const createActionName = actionName => `app/status/${actionName}`;
const UPDATE_STATUSNAME = createActionName('UPDATE_STATUSNAME');


// action creators
export const updateStatusName = payload => ({ type: UPDATE_STATUSNAME, payload });

export const fetchstatusName = () => {
  return (dispatch) => {
    fetch(API_URL + '/status')
    .then(res => res.json())
    .then(loadSpin => {dispatch(updateStatusName(loadSpin))});
  }
};

const statusNameReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_STATUSNAME:
    return [...action.payload]
    default:
      return statePart;
  };
};
export default statusNameReducer;