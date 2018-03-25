import {
    addUser,
} from '../constants/ActionTypes';

const initialState = {
  user: {},
};

const login = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case addUser:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default login;