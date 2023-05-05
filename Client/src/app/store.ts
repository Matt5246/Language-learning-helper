import { configureStore } from "@reduxjs/toolkit";
import subtitlesReducer from "../features/subtitles/subtitlesSlice";
import backgroundReducer from "../features/background/backgroundSlice";

export const store = configureStore({
    reducer: {
        subtitles: subtitlesReducer,
        background: backgroundReducer,
    }
})