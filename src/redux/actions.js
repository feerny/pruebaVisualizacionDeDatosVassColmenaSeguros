// actions.js

export const SET_DATA_LIST = 'SET_DATA_LIST';

export const setDataList = (dataList) => {
  return {
    type: SET_DATA_LIST,
    payload: dataList,
  };
};

// Resto de tus acciones existentes...

export const SET_OPTION_1 = 'SET_OPTION_1';
export const SET_OPTION_2 = 'SET_OPTION_2';
export const SET_RANGE_VALUE = 'SET_RANGE_VALUE';

export const setOption1 = (option) => {
  return {
    type: SET_OPTION_1,
    payload: option,
  };
};

export const setOption2 = (option) => {
  return {
    type: SET_OPTION_2,
    payload: option,
  };
};

export const setRangeValue = (rangeValue) => {
  return {
    type: SET_RANGE_VALUE,
    payload: rangeValue,
  };
};
