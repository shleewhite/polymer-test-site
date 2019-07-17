import {
  CHANGE_SELECTED
} from '../actions/picker.js';

const INITIAL_STATE = {
  value: '',
}

const picker = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SELECTED:
      return {
        ...state,
        value: action.value
      };
    default:
      return state;
  };
};

export default picker;
