import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  email: string;
  phone: string;
}
const initialState: UserState = {
  email: "",
  phone: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    },
  },
});

export const selectUser = (state: { user: UserState }) => state.user;
export const { setFormData } = userSlice.actions;
export default userSlice.reducer;
