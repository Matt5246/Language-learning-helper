import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Subtitle {
    id: string;
    title: string;
    content: string;
    date: string;
  }
  
interface SubtitlesState {
  subtitles: Subtitle[];
  selectedSubtitles: string | null;
}

const initialState: SubtitlesState = {
  subtitles: [
    {
      id: "1",
      title: "Subtitle 1",
      content: "Subtitle \n1 \ncontent \nasdfasdfas",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Subtitle 2",
      content: "Subtitle \n2 \ncontent \nasdfasdfas",
      date: new Date().toISOString(),
    },
  ],
  selectedSubtitles: null,
};
  
  const subtitles = createSlice({
    name: "subtitles",
    initialState,
    reducers: {
      subtitlesAdded: {
        reducer(state, action: PayloadAction<Subtitle>) {
          state.subtitles.push(action.payload);
        },
        prepare(title: string, content: string) {
          return {
            payload: {
              id: nanoid(),
              title,
              content,
              date: new Date().toISOString(),
            },
          };
        },
      },
      selectSubtitles(state, action: PayloadAction<string>) {
        state.selectedSubtitles = action.payload;
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
    


export const { subtitlesAdded, selectSubtitles} = subtitles.actions

export default subtitles.reducer