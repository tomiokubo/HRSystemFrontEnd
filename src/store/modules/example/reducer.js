import * as types from '../types';

const initalState = {
  clickedButton: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case types.BUTTON_CLICKED_SUCCESS: {
      const newState = { ...state };
      newState.clickedButton = !newState.clickedButton;
      return newState;
    }
    case types.BUTTON_CLICKED_FAILURE: {
      console.log('Error :(');
      return state;
    }
    case types.BUTTON_CLICKED_REQUEST: {
      console.log('Request in progress');
      return state;
    }
    default:
      return state;
  }
}
