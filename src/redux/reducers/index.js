// reducers.js

import { SET_OPTION_1, SET_OPTION_2, SET_RANGE_VALUE, SET_DATA_LIST,SET_OPTION_DATA } from '../actions';
import data from '../../data/datos.json';

//estado global
const initialState = {
  option1: 'bar',
  option2: 'ventasPorRegion',
  optionData:'ventasPorRegion',
  dataList: JSON.parse(localStorage.getItem('data')) || data,
  rangeValue: [0, 11],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_OPTION_1:
      return {
        ...state,
        option1: action.payload,
      };
    case SET_OPTION_2:
      return {
        ...state,
        option2: action.payload,
      };
    case SET_RANGE_VALUE:
      return {
        ...state,
        rangeValue: action.payload,
      };
    case SET_DATA_LIST:
      localStorage.setItem("data", JSON.stringify(action.payload))
      return {
        ...state,
        dataList: action.payload,
      };
    case SET_OPTION_DATA:
      return {
        ...state,
        optionData: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
