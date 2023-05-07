import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Subtitle {
    id?: string;
    title: string;
    content: string;
    date?: string;
}
  
export interface SubtitlesState {
  subtitles: Subtitle[];
  selectedSubtitles: string | null;
}

const initialState: SubtitlesState = {
  subtitles: [
  ],
  selectedSubtitles: null,
};
  


const subtitles = createSlice({
  name: "subtitles",
  initialState,
  reducers: {
    subtitlesAdded: {
      reducer(state, action: PayloadAction<Subtitle[]>) {
        action.payload.forEach(subtitle => {
          state.subtitles.push(subtitle);
        });
      },
      prepare(subtitles: Subtitle[]) {
        const preparedSubtitles = subtitles.map(subtitle => {
          if (!subtitle.id) {
            subtitle.id = nanoid();
          }
          if (!subtitle.date) {
            subtitle.date = new Date().toISOString();
          }
          return subtitle;
        });
        return {
          payload: preparedSubtitles
        };
      }
      
    },
    selectSubtitles(state, action: PayloadAction<string>) {
      state.selectedSubtitles = action.payload;
    },
    subtitlesLoaded(state, action: PayloadAction<Subtitle[]>) {
      state.subtitles = action.payload;
    },
  },
  
});
  
export const selectAllSubtitles = (state: { subtitles: SubtitlesState }) => state.subtitles.subtitles;

export const selectSubtitlesContent = (state: { subtitles: SubtitlesState }) =>
  state.subtitles.subtitles.map((subtitle) => subtitle.content);
export const selectSelectedSubtitles = (state: { subtitles: SubtitlesState }) =>
state.subtitles.selectedSubtitles;

export const selectedSubtitlesContent = (state: { subtitles: SubtitlesState }) =>
state.subtitles.subtitles.find(
  (subtitle) => subtitle.id === state.subtitles.selectedSubtitles
)?.content;

export const { subtitlesAdded, selectSubtitles, subtitlesLoaded} = subtitles.actions

export default subtitles.reducer