import { configureStore } from "@reduxjs/toolkit";
import subtitlesReducer from "../features/subtitles/subtitlesSlice";

export const store = configureStore({
    reducer: {
        subtitles: subtitlesReducer,
    }
})