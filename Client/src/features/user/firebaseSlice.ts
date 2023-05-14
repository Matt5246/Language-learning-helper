// @ts-nocheck
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { auth, googleProvider } from "../../config/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateEmail,
    updatePassword,
    sendPasswordResetEmail,
    signInWithPopup,
    UserCredential,
    User,
  } from "firebase/auth";
import { AppThunk } from "../../app/store";
import { Dispatch } from "redux";

interface FirebaseState {
  currentUser: User | null;
}

const initialState: FirebaseState = {
  currentUser: null,
};

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = firebaseSlice.actions;

export const signup = (email: string, password: string) => {
  return async (dispatch: (arg0: PayloadAction<User | null>) => void) => {
    try {
      const { user }: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signin = (email: string, password: string)  => {
  return async (dispatch: Dispatch<PayloadAction<UserCredential>>)  => {
    try {
      const { user }: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const logout = () => {
  return async (dispatch: (arg0: PayloadAction<User | null>) => void) => {
    try {
      await auth.signOut();
      dispatch(setCurrentUser(null));
    } catch (error) {
      console.log(error);
    }
  };
};

export const resetPassword = (email: string) => {
  return async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMyEmail = (newEmail: string) => {
  return async (dispatch: (arg0: PayloadAction<User | null>) => void, getState: () => { firebase: FirebaseState }) => {
    try {
      const user = getState().firebase.currentUser;
      await updateEmail(user!, newEmail);
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMyPassword = (newPassword: string) => {
  return async (dispatch: (arg0: PayloadAction<User | null>) => void, getState: () => { firebase: FirebaseState }) => {
    try {
      const user = getState().firebase.currentUser;
      await updatePassword(user!, newPassword);
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signInWithGoogle = ()  => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { user }: UserCredential = await signInWithPopup(auth, googleProvider);
      dispatch(setCurrentUser(user as User));
    } catch (error) {
      console.log(error);
    }
  };
};

export default firebaseSlice.reducer;
