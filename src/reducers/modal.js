import {
  setCurrentModal,
} from '../constants/ActionTypes';

const initialState = {
  currentModal: '',
  props: {},
};

const modal = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case setCurrentModal: {
      return {
        ...state,
        currentModal: payload,
      }
    }
    default:
      return state;
  }
};

export default modal;
