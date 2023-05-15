import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { auth } from "../../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

interface SigninState {
  loading: boolean;
  error: string | null;
}

interface SigninForm {
  email: string;
  password: string;
}

const signinSlice = createSlice({
  name: "signin",
  initialState: {
    loading: false,
    error: null,
  } as SigninState,
  reducers: {
    submitStart(state: SigninState) {
      state.loading = true;
      state.error = null;
    },
    submitSuccess(state: SigninState) {
      state.loading = false;
      state.error = null;
    },
    submitFailure(state: SigninState, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { submitStart, submitSuccess, submitFailure } =
  signinSlice.actions;

export const signinState = (state: { signin: SigninState }) => state.signin;

export const signinRedux =
  (formData: SigninForm): AppThunk =>
  async dispatch => {
    try {
      dispatch(submitStart());
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(submitSuccess());
      return true;
    } catch (error: any) {
      dispatch(submitFailure(error.message));
    }
  };

export default signinSlice.reducer;
