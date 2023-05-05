import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    backgroundColor: 'black',
};
  
const backgroundSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        toggleBackgroundColor: (state) => {
        state.backgroundColor = state.backgroundColor === 'white' ? 'black' : 'white';
        },
    },
});
  
export const { toggleBackgroundColor } = backgroundSlice.actions;

export default backgroundSlice.reducer;

