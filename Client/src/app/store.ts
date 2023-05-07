import { configureStore } from "@reduxjs/toolkit";
import subtitlesReducer from "../features/subtitles/subtitlesSlice";
import backgroundReducer from "../features/background/backgroundSlice";
import userReducer from "../features/user/userSlice";
import { ThunkAction } from 'redux-thunk';
import { Action } from '@reduxjs/toolkit';
import signupReducer from "../features/user/signupSlice";

export interface RootState {
    user: {
        email: string;
        password: string;
    };
    signup: {
        loading: boolean;
        error: string | null;
    };
    subtitles: {
        subtitles: {
            id: string;
            title: string;
            content: string;
            date: string;
        }[];
        selectedSubtitles: string | null;
    };
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const store = configureStore({
    reducer: {
        subtitles: subtitlesReducer,
        background: backgroundReducer,
        user: userReducer,
        signup: signupReducer,
    }
})