import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface SignupState {
  loading: boolean;
  error: string | null;
}

interface SignupForm {
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
}

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    loading: false,
    error: null,
  } as SignupState,
  reducers: {
    submitStart(state: SignupState) {
      state.loading = true;
      state.error = null;
    },
    submitSuccess(state: SignupState) {
      state.loading = false;
      state.error = null;
    },
    submitFailure(state: SignupState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { submitStart, submitSuccess, submitFailure } =
  signupSlice.actions;

export const signupState = (state: { signup: SignupState }) => state.signup;

export const signupRedux =
  (formData: SignupForm): AppThunk =>
  async dispatch => {
    try {
      dispatch(submitStart());
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      dispatch(submitSuccess());
      return true;
    } catch (error: any) {
      dispatch(submitFailure(error.message));
    }
  };

export default signupSlice.reducer;
