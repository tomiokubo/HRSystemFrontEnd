import * as types from '../types';

const initalState = {
  isLoggedIn: false,
  token: false,
  user: {},
  isLoading: false,
};

export default function (state = initalState, action) {
  switch (action.type) {
    case types.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.clickedButton = !newState.clickedButton;
      return newState;
    }

    default:
      return state;
  }
}
