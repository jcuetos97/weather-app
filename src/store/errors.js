import { createSlice } from '@reduxjs/toolkit';

const initialErrorState = {
  errors: {},
};
const errorSlice = createSlice({
  name: 'errors',
  initialState: initialErrorState,
  reducers: {
    getErrors: (state, action) => {
      switch (action.type) {
        case 'GET_ERRORS':
          return {
            ...state,
            errors: action.payload,
          };
        default:
          return state;
      }
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;
