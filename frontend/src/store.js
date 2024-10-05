import { createStore } from 'redux';

// Un ejemplo de reductor básico
const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
